import { POSTER_SEARCH_KEYWORD, useGetPosterList } from '@/hooks/queries/poster/useGetPosterList';
import { useSidebarStore } from '@/store/useSidebarStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CAROUSEL_AUTOPLAY_INTERVAL, CAROUSEL_CENTER_INDEX, CAROUSEL_ITEM_COUNT } from './constants';
import { PosterItem } from './components/PosterItem';
import { useCarousel } from './hooks/useCarousel';

export default function MusicalPage() {
  // 사이드바 선택 상태
  const { selectedMenuLabel, selectedMenuItem } = useSidebarStore();
  const isMenuItemSelected = !!selectedMenuItem;

  // 포스터 목록 조회 (선택 메뉴 없으면 랜덤)
  const { data: posterListResponse } = useGetPosterList({
    limit: CAROUSEL_ITEM_COUNT,
    initialRange: selectedMenuLabel,
    ...(isMenuItemSelected ? { mode: POSTER_SEARCH_KEYWORD.VIEWS } : { mode: POSTER_SEARCH_KEYWORD.RANDOM }),
  });
  const posterList = posterListResponse?.data ?? [];
  const posterListLength = posterList?.length ?? 0;
  const isPosterListEmpty = posterListLength === 0;

  // 슬라이드 인덱스 및 좌우 이동 함수
  const { currentIndex, next, prev } = useCarousel({
    itemList: posterList,
    selectedItem: selectedMenuItem,
    autoPlay: !isMenuItemSelected,
    autoPlayInterval: CAROUSEL_AUTOPLAY_INTERVAL,
  });

  return (
    <div className="flex items-center justify-center h-full">
      {/* 좌우 이동 버튼 */}
      {!isPosterListEmpty && (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-[5] flex items-center justify-between w-[180px] sm:w-[220px] md:w-[280px] lg:w-[380px] xl:w-[500px] pointer-events-none">
          <Button variant="ghost" className="bg-white/20 text-white/60 size-9 rounded-full z-[5] pointer-events-auto" onClick={prev}>
            <ChevronLeft className="size-6" />
          </Button>
          <Button variant="ghost" className="bg-white/20 text-white/60 size-9 rounded-full z-[5] pointer-events-auto" onClick={next}>
            <ChevronRight className="size-6" />
          </Button>
        </div>
      )}

      {/* 포스터 목록 */}
      {posterList?.map((poster, posterIndex) => {
        const positionRelative = (posterIndex - currentIndex + posterListLength) % posterListLength;
        const positionIndex =
          posterListLength < CAROUSEL_ITEM_COUNT
            ? (positionRelative + CAROUSEL_CENTER_INDEX) % CAROUSEL_ITEM_COUNT
            : positionRelative % CAROUSEL_ITEM_COUNT;

        return <PosterItem key={poster.musicalId} poster={poster} positionIndex={positionIndex} />;
      })}
    </div>
  );
}
