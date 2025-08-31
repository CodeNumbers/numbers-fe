import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ImagePreview from '@/components/ui/ImagePreview';
import { PlusIcon, XIcon } from 'lucide-react';
import type { PostMusicalListRequestBody } from '@/hooks/queries/musical/usePostMusicalList';
import type { GetMusicalDetailResponseData } from '@/hooks/queries/musical/useGetMusicalDetail';
import { useState, useRef, useEffect } from 'react';

interface Props {
  defaultValues?: GetMusicalDetailResponseData;
  trigger?: React.ReactNode;
  onSubmit: (data: PostMusicalListRequestBody, options: { onSuccess: () => void }) => void;
}

type NumberItem = PostMusicalListRequestBody['numbers'][0];

export default function MusicalUpsertModal({ trigger, defaultValues, onSubmit }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<PostMusicalListRequestBody>({ defaultValues });

  const watchedNumbers = watch('numbers') || [];

  // numbers 필드가 undefined인 경우를 대비해 초기값 설정
  useEffect(() => {
    if (!watch('numbers')) {
      setValue('numbers', []);
    }
  }, [watch, setValue]);
  const [acts, setActs] = useState<number[]>([]);

  // 넘버 관리 기능
  const manageNumbers = {
    // 새로운 넘버 객체 생성
    create: (act: number, order: number): NumberItem => ({
      act,
      order,
      title: '',
      videoUrl: 'https://www.youtube.com/embed/',
      actors: [''],
    }),

    // 특정 막에 넘버 추가
    add: (act: number) => {
      const currentNumbers = watchedNumbers?.filter((n) => n.act === act);
      const newOrder = currentNumbers.length + 1;
      setValue('numbers', [...watchedNumbers, manageNumbers.create(act, newOrder)]);
    },

    // 새로운 막 추가
    addNewAct: () => {
      const nextActNumber = acts.length > 0 ? Math.max(...acts) + 1 : 1;
      setActs([...acts, nextActNumber]);
      manageNumbers.add(nextActNumber);
    },

    // 특정 넘버 삭제
    remove: (index: number) => {
      setValue(
        'numbers',
        watchedNumbers.filter((_, i) => i !== index)
      );
    },

    // 특정 막과 그에 속한 모든 넘버 삭제
    removeAct: (actToRemove: number) => {
      setValue(
        'numbers',
        watchedNumbers.filter((number) => number.act !== actToRemove)
      );
      setActs(acts.filter((act) => act !== actToRemove));
    },
  };

  // 배우 관리 기능
  const manageActors = {
    // 특정 넘버에 배우 추가
    add: (numberIndex: number) => {
      const updatedNumbers = [...watchedNumbers];
      // actors 배열이 없는 경우 초기화
      if (!updatedNumbers[numberIndex].actors) {
        updatedNumbers[numberIndex].actors = [];
      }
      updatedNumbers[numberIndex].actors.push('');
      setValue('numbers', updatedNumbers);
    },

    // 특정 넘버의 특정 배우 삭제
    remove: (numberIndex: number, actorIndex: number) => {
      const updatedNumbers = [...watchedNumbers];
      // actors 배열이 존재하는지 확인
      if (updatedNumbers[numberIndex]?.actors) {
        updatedNumbers[numberIndex].actors = updatedNumbers[numberIndex].actors.filter((_, i) => i !== actorIndex);
        setValue('numbers', updatedNumbers);
      }
    },
  };

  // 막별로 넘버 정리
  const numbersByAct = acts.reduce<Record<number, NumberItem[]>>((acc, act) => {
    acc[act] = watchedNumbers.filter((n) => n.act === act);
    return acc;
  }, {});

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form
        id="musical-form"
        onSubmit={handleSubmit((data) => {
          // poster 필드 처리 - 서버 에러 방지
          // 사용자가 말한 "posters는 보내지말아봐"에 따라 poster 필드는 무시
          // 실제 API 요청 시 usePostMusicalList에서 필요한 필드만 추출하여 전송

          // 필드 유효성 검증
          if (!data.title || !data.synopsis) {
            return;
          }

          // numbers 배열 검증 및 정리
          if (data.numbers && data.numbers.length > 0) {
            // 빈 actors 배열 필터링
            data.numbers = data.numbers.map((number) => ({
              ...number,
              actors: number.actors ? number.actors.filter((actor) => actor.trim() !== '') : [],
            }));
          }

          console.log('제출할 데이터:', data);
          onSubmit(data, {
            onSuccess: () => {
              setIsOpen(false);
            },
          });
        })}
      >
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="flex flex-col max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>뮤지컬 {defaultValues ? '수정' : '등록'}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 overflow-y-auto">
            <div className="flex flex-col gap-2 pt-2">
              <p className="text-sm font-medium">포스터 이미지</p>
              <ImagePreview
                ref={fileInputRef}
                previewUrl={defaultValues ? defaultValues.imageUrl : undefined}
                onFileChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // 미리보기용 URL 생성 및 적용
                    URL.createObjectURL(file);

                    // 실제 API 요청 시 poster 필드는 사용하지 않음
                  }
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">뮤지컬 정보</p>
              <Input
                error={errors.title?.message}
                placeholder="뮤지컬 이름을 입력해주세요."
                {...register('title', { validate: (value) => value.length > 0 || '뮤지컬 이름을 입력해주세요.' })}
              />
              <Textarea placeholder="뮤지컬 정보를 입력해주세요." {...register('synopsis')} className="h-45 resize-none" />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">넘버 정보</p>
                <Button type="button" variant="outline" onClick={manageNumbers.addNewAct} className="text-xs py-1 px-2 h-auto">
                  새 막 추가
                </Button>
              </div>

              {acts.map((act) => (
                <div key={act} className="relative border border-blue-800/30 rounded-md p-4 bg-blue-900/10 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">
                      {act}막
                      <input type="hidden" value={act} {...register(`numbers.${act}.act`)} />
                    </div>
                    <Button size="icon" type="button" variant="ghost" onClick={() => manageNumbers.removeAct(act)} className="h-6 w-6">
                      <XIcon size={14} />
                    </Button>
                  </div>

                  {numbersByAct[act]?.map((number, index) => {
                    const numberIndex = watchedNumbers.indexOf(number);
                    return (
                      <div key={index} className="border border-blue-700/30 rounded-md p-3 bg-blue-800/10 flex flex-col gap-2">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-medium">Number {index + 1}</p>
                          <Button
                            size="icon"
                            type="button"
                            variant="ghost"
                            onClick={() => manageNumbers.remove(numberIndex)}
                            className="h-6 w-6"
                          >
                            <XIcon size={14} />
                          </Button>
                        </div>

                        <div className="flex flex-col gap-2">
                          <p className="text-xs text-gray-400">순서</p>
                          <Input placeholder="순서를 입력해주세요." {...register(`numbers.${numberIndex}.order`)} />
                        </div>

                        <div className="flex flex-col gap-2">
                          <p className="text-xs text-gray-400">제목</p>
                          <Input placeholder="제목을 입력해주세요." {...register(`numbers.${numberIndex}.title`)} />
                        </div>

                        <div className="flex flex-col gap-2">
                          <p className="text-xs text-gray-400">유튜브 링크</p>
                          <Input placeholder="유튜브 링크를 입력해주세요." {...register(`numbers.${numberIndex}.videoUrl`)} />
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <p className="text-xs text-gray-400">배우</p>
                            {number.actors.map((_, actorIndex) => (
                              <div key={actorIndex} className="flex items-center gap-2">
                                <Input
                                  placeholder="배우 이름을 입력해주세요."
                                  {...register(`numbers.${numberIndex}.actors.${actorIndex}`)}
                                />
                                {number.actors.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                    onClick={() => manageActors.remove(numberIndex, actorIndex)}
                                  >
                                    <XIcon />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                          <Button
                            type="button"
                            className="text-white bg-blue-700/40 hover:bg-blue-700/60 border-blue-500 w-full"
                            onClick={() => manageActors.add(numberIndex)}
                          >
                            <PlusIcon />
                          </Button>
                        </div>
                      </div>
                    );
                  })}

                  <Button
                    type="button"
                    className="text-white bg-gray-700/40 hover:bg-gray-700/60 border-gray-600 w-full"
                    onClick={() => manageNumbers.add(act)}
                  >
                    <PlusIcon size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" form="musical-form">
              {defaultValues ? '수정' : '등록'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
