import { useSearchParams } from 'react-router-dom';
import { useCarousel } from '@/hooks/use-carousel';
import { useWheel } from '@/hooks/use-wheel';
import { useGetPosterList } from '@/hooks/queries/poster/useGetPosterList';
import { useGetMusicalList } from '@/hooks/queries/musical/useGetMusicalList';
import { POSTER_KEYWORD } from '@/hooks/queries/poster/poster.constants';
import { QUERY_PARAMS_RANGE, QUERY_PARAMS_MUSICAL_ID } from '@/components/layout/UserSidebar';
import { CarouselNav } from './components/CarouseNav';
import { CarouselItem } from './components/CarouseItem';
import { cn } from '@/lib/utils';

const AUTO_PLAY_INTERVAL = 3000;
const MAX_DISPLAY_COUNT = 5;
const CENTER_INDEX = Math.floor(MAX_DISPLAY_COUNT / 2);

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const initialRange = searchParams.get(QUERY_PARAMS_RANGE) ?? undefined;
  const musicalIdParam = Number(searchParams.get(QUERY_PARAMS_MUSICAL_ID));

  // 선택된 뮤지컬 목록 조회
  const { data: musicalListResponse } = useGetMusicalList({ initialRange }, { enabled: !!initialRange });
  const musicalList = (musicalListResponse?.data ?? []).map(({ id, poster }) => ({ id, imageUrl: poster.imageUrl }));

  // 포스터 목록 조회
  const { data: posterListResponse } = useGetPosterList({ keyword: POSTER_KEYWORD.RANDOM }, { enabled: true });
  const posterList = posterListResponse?.data ?? [];

  // 표시할 포스터 데이터 통합
  const displayList = initialRange ? musicalList : posterList;
  const displayListLength = displayList.length;
  const initialIndex = musicalIdParam > 0 ? displayList.findIndex(({ id }) => id === musicalIdParam) : CENTER_INDEX;

  const { currentIndex, setCurrentIndex } = useCarousel(
    displayList,
    initialIndex >= 0 ? initialIndex : CENTER_INDEX,
    AUTO_PLAY_INTERVAL
  );

  // 캐러셀 이동 핸들러
  const handleMove = (dir: 1 | -1) => setCurrentIndex((prev) => (prev + dir + displayListLength) % displayListLength);

  // 휠 이벤트 핸들러
  const { handleWheel } = useWheel({ onWheel: (scrollDirection) => handleMove(scrollDirection > 0 ? 1 : -1) });

  return (
    <div
      onWheel={handleWheel}
      className={cn(
        'w-[calc(120px+7vw)] h-[calc(170px+7vw)]',
        'm-auto h-full flex items-center justify-center relative'
      )}
    >
      <CarouselNav onMove={handleMove} />

      {displayList.map((poster, posterIndex) => {
        const relativePosition = (posterIndex - currentIndex + displayListLength) % displayListLength;

        const positionIndex =
          displayListLength < MAX_DISPLAY_COUNT
            ? (relativePosition + CENTER_INDEX) % MAX_DISPLAY_COUNT
            : relativePosition % MAX_DISPLAY_COUNT;

        return <CarouselItem key={poster.id} poster={poster} positionIndex={positionIndex} />;
      })}
    </div>
  );
}
