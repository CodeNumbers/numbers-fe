import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  onMove: (dir: 1 | -1) => void;
}

export function CarouselNav({ onMove }: Props) {
  return (
    <div className="flex gap-84 left-1/2 -translate-x-1/2 absolute top-1/2 -translate-y-1/2 z-[5]">
      <Button
        variant="ghost"
        onClick={() => onMove(-1)}
        className="bg-white/20 text-white/60 size-9 rounded-full cursor-pointer z-[5] "
      >
        <ChevronLeft className="size-6" />
      </Button>

      <Button
        variant="ghost"
        onClick={() => onMove(1)}
        className="bg-white/20 text-white/60 size-9 rounded-full cursor-pointer z-[5] "
      >
        <ChevronRight className="size-6" />
      </Button>
    </div>
  );
}
