import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';
import { useGetMusicalDetail, type MusicalNumber } from '@/hooks/queries/musical/useGetMusicalDetail';
import { useParams } from 'react-router-dom';

const groupNumberListByAct = (numbers: MusicalNumber[]) =>
  numbers.reduce((acc: Record<number, MusicalNumber[]>, cur) => {
    (acc[cur.act] ??= []).push(cur);
    return acc;
  }, {});

export default function MusicalDetailPage() {
  // 뮤지컬 상세 조회
  const { musicalId } = useParams();
  const { data: musicalDetailResponse } = useGetMusicalDetail(musicalId || '');
  const musicalDetail = musicalDetailResponse?.data;

  // 뮤지컬 상세 막, 넘버 그룹화
  const numberListByAct = musicalDetail?.numbers ? groupNumberListByAct(musicalDetail.numbers) : {};
  const isNumberListEmpty = Object.keys(numberListByAct).length === 0;

  return (
    <div className="flex h-full flex-1 flex-col max-w-[1200px] mx-auto text-white/80">
      {/* 뮤지컬 포스터 & 상세 정보 */}
      <div className="flex gap-8 items-start w-full mt-10">
        <div className="flex-shrink-0 bg-black rounded-lg">
          <img src={musicalDetail?.imageUrl} alt={musicalDetail?.title} className="w-[200px] h-[300px] object-cover" />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-semibold">{musicalDetail?.title}</h1>
          <h2 className="text-lg">{musicalDetail?.synopsis}</h2>
        </div>
      </div>

      {/* 뮤지컬 노래(넘버) 목록 */}
      {isNumberListEmpty && (
        <div className="flex flex-1 justify-center items-center">
          <p className="text-center text-lg">등록된 넘버가 없습니다.</p>
        </div>
      )}

      {!isNumberListEmpty && (
        <div className="flex flex-col gap-4 mt-10">
          {Object.entries(numberListByAct)?.map(([act, numbers]) => (
            <div key={act}>
              <h3 className="text-xl font-bold mb-4">{act}막</h3>
              <Accordion type="single" collapsible>
                {numbers.map((number) => (
                  <AccordionItem key={number.order} value={number.order.toString()} className="px-4 rounded-sm">
                    {/* 넘버 제목 */}
                    <AccordionTrigger className="text-md font-semibold">
                      {number.order}. {number.title}
                    </AccordionTrigger>

                    {/* 배우 목록 & 유튜브 링크 */}
                    <AccordionContent className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        {number.actors.map((actor, actorIndex) => {
                          const isLastActor = actorIndex === number.actors.length - 1;
                          return (
                            <div key={actor} className="flex items-center">
                              <span>{actor}</span>
                              {!isLastActor && <span className="ml-2 w-[1.5px] h-[10px] bg-white/50" />}
                            </div>
                          );
                        })}
                      </div>
                      <iframe
                        className="w-full aspect-video"
                        src={number.videoUrl}
                        title={number.title}
                        referrerPolicy="strict-origin-when-cross-origin"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
