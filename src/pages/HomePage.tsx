import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react';
import { useCarousel } from '@/hooks/use-carousel';
import { useGetMusicalList, type GetMusicalListResponseData } from '@/hooks/queries/musical/useGetMusicalList';
import { Button } from '@/components/ui/Button';
import ShootingStars from '@/components/ShootingStars';
import { useWheel } from '@/hooks/use-wheel';

const AUTO_PLAY_INTERVAL = 3000;
const INITIAL_ITEMS_COUNT = 5;

const getVisibleCarouselItems = (list: GetMusicalListResponseData[], centerId: string | null) => {
  const totalItems = list.length;

  // 중심 아이템 인덱스 찾기
  const centerIndex = list.findIndex(({ id }) => id === centerId);
  const actualCenterIndex = centerIndex === -1 ? 0 : centerIndex;

  // 중심을 기준으로 좌우 2개씩 가져오기 (총 5개)
  const visibleItems = Array.from({ length: INITIAL_ITEMS_COUNT }, (_, i) => {
    const offset = i - Math.floor(INITIAL_ITEMS_COUNT / 2);
    const index = (actualCenterIndex + offset + totalItems) % totalItems;
    return list[index];
  });

  return visibleItems;
};

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const selectedItem = searchParams.get('item');

  const { data: musicalListResponse } = useGetMusicalList(
    {},
    {
      initialData: {
        success: true,
        data: [
          {
            id: '1',
            title: '가',
            poster: { imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop' },
          },
          {
            id: '2',
            title: '나',
            poster: { imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop' },
          },
          {
            id: '3',
            title: '다',
            poster: { imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop' },
          },
          {
            id: '4',
            title: '라',
            poster: { imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop' },
          },
          {
            id: '5',
            title: '마',
            poster: { imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop' },
          },
        ],
      },
    }
  );
  const musicalList = getVisibleCarouselItems(musicalListResponse?.data ?? [], selectedItem);

  const { setIsAutoPlay, setCenterIndex, getPositionIndex } = useCarousel(musicalList, AUTO_PLAY_INTERVAL, false);
  const { handleWheel } = useWheel({ onWheel: (deltaY) => handleMove(deltaY > 0 ? 1 : -1) });

  const handleMove = (direction: 1 | -1) => {
    setIsAutoPlay(false);
    setCenterIndex((prev) => (prev + direction + musicalList.length) % musicalList.length);
  };

  return (
    <div className="relative h-full">
      <ShootingStars />

      <div className="relative h-full flex items-center justify-center gap-30">
        {/* Left */}
        <CarouselNavButton direction={-1} Icon={ChevronLeft} onClick={handleMove} />

        {/* Carousel */}
        <div onWheel={handleWheel} className="relative w-[calc(120px+7vw)] h-[calc(170px+7vw)]">
          {musicalList.map((musical, i) => {
            const style = positionStyles[getPositionIndex(i)];
            return (
              <motion.img
                key={musical.id}
                src={musical.poster.imageUrl}
                alt={`${musical.title}-poster`}
                className="absolute left-1/2 -translate-x-1/2 rounded-xl object-cover w-[calc(120px+7vw)] h-[calc(170px+7vw)]"
                initial={{ ...style }}
                animate={{ ...style }}
                transition={{ ease: 'easeInOut' }}
              />
            );
          })}
        </div>

        {/* Right */}
        <CarouselNavButton direction={1} Icon={ChevronRight} onClick={handleMove} />
      </div>
    </div>
  );
}

const positionStyles = [
  {
    x: -250,
    scale: 0.75,
    zIndex: 1,
    filter: 'opacity(0.7) brightness(0.85) saturate(0.85)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.25), 0 4px 8px rgba(0,0,0,0.18)',
  },
  {
    x: -130,
    scale: 0.9,
    zIndex: 2,
    filter: 'opacity(0.9) brightness(0.9) saturate(0.9)',
    boxShadow: '0 16px 32px rgba(0,0,0,0.28), 0 6px 12px rgba(0,0,0,0.2)',
  },
  {
    x: 0,
    scale: 1,
    zIndex: 3,
    filter: 'opacity(1) brightness(1.1) saturate(1.15)',
    boxShadow: '0 24px 48px rgba(0,0,0,0.3), 0 10px 20px rgba(0,0,0,0.25)',
  },
  {
    x: 130,
    scale: 0.9,
    zIndex: 2,
    filter: 'opacity(0.9) brightness(0.9) saturate(0.9)',
    boxShadow: '0 16px 32px rgba(0,0,0,0.28), 0 6px 12px rgba(0,0,0,0.2)',
  },
  {
    x: 250,
    scale: 0.75,
    zIndex: 1,
    filter: 'opacity(0.7) brightness(0.85) saturate(0.85)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.25), 0 4px 8px rgba(0,0,0,0.18)',
  },
];

interface CarouselNavButtonProps {
  direction: 1 | -1;
  Icon: LucideIcon;
  onClick: (dir: 1 | -1) => void;
}

function CarouselNavButton({ direction, Icon, onClick }: CarouselNavButtonProps) {
  return (
    <Button
      variant="ghost"
      onClick={() => onClick(direction)}
      className="bg-white/20 text-white/60 size-9 z-10 rounded-full cursor-pointer"
    >
      <Icon className="size-6" />
    </Button>
  );
}
