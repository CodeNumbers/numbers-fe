import { Button } from '@/components/ui/Button';
import MusicalUpsertModal from './MusicalUpsertModal';
import { PencilIcon } from 'lucide-react';
import { usePutMusical, type PutMusicalRequestBody } from '@/hooks/queries/musical/usePutMusical';
import { toast } from 'sonner';
import { useGetMusicalDetail } from '@/hooks/queries/musical/useGetMusicalDetail';

interface Props {
  musicalId: string;
}

export default function UpdateMusical({ musicalId }: Props) {
  // 뮤지컬 상세 조회
  const { data: musicalDetailResponse } = useGetMusicalDetail(musicalId);
  const musicalDetail = musicalDetailResponse?.data;

  // 뮤지컬 수정
  const { mutate: updateMusical } = usePutMusical();

  const handleUpdate = (body: PutMusicalRequestBody) => {
    updateMusical(
      { musicalId, body },
      {
        onSuccess: () => {
          toast.success('뮤지컬 정보가 수정되었습니다.');
        },
        onError: () => {
          toast.error('오류가 발생했습니다.');
        },
      }
    );
  };

  return (
    <MusicalUpsertModal
      trigger={
        <Button size="icon" variant="ghost">
          <PencilIcon size={16} />
        </Button>
      }
      defaultValues={musicalDetail}
      onSubmit={handleUpdate}
    />
  );
}
