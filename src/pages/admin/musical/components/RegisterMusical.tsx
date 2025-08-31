import { usePostMusicalList, type PostMusicalListRequestBody } from '@/hooks/queries/musical/usePostMusicalList';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import MusicalUpsertModal from './MusicalUpsertModal';

type ErrorWithResponse = {
  response?: { data?: { message?: string } };
};

export default function RegisterMusical() {
  const { mutate: registerMusical } = usePostMusicalList();

  const handleRegister = (data: PostMusicalListRequestBody) => {
    console.log(data);
    registerMusical(data, {
      onSuccess: () => {
        toast.success('뮤지컬 정보가 등록되었습니다.');
      },
      onError: (error) => {
        // TODO: 오류 메시지 형식
        toast.error((error as ErrorWithResponse)?.response?.data?.message || '오류가 발생했습니다.');
      },
    });
  };

  return <MusicalUpsertModal trigger={<Button>뮤지컬 등록</Button>} onSubmit={handleRegister} />;
}
