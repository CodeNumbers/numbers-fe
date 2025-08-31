import { Button } from '@/components/ui/button';
import { useDeleteMusical } from '@/hooks/queries/musical/useDeleteMusical';
import { TrashIcon } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  musicalId: string;
}

export default function DeleteMusical({ musicalId }: Props) {
  const { mutate: deleteMusical } = useDeleteMusical();

  const handleDelete = () => {
    deleteMusical(musicalId, {
      onSuccess: () => {
        toast.success('뮤지컬 정보가 삭제되었습니다.');
      },
      onError: () => {
        toast.error('오류가 발생했습니다.');
      },
    });
  };

  return (
    <Button size="icon" variant="ghost" onClick={handleDelete} className="h-6 w-6">
      <TrashIcon size={16} />
    </Button>
  );
}
