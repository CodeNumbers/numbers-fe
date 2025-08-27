import { useCallback, useEffect, useState } from 'react';
import type { GetPosterListResponseData } from '@/hooks/queries/poster/useGetPosterList';
import { CAROUSEL_CENTER_INDEX } from '../constants';

interface Props {
  itemList: GetPosterListResponseData[];
  selectedItem?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const useCarousel = ({ itemList, selectedItem, autoPlay = false, autoPlayInterval = 3000 }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemListLength = itemList.length;

  // 이전 슬라이드로 이동하면서 새 인덱스를 반환
  const prev = useCallback(() => {
    const newIndex = (currentIndex - 1 + itemListLength) % itemListLength;
    setCurrentIndex(newIndex);
    return newIndex;
  }, [currentIndex, itemListLength]);

  // 다음 슬라이드로 이동하면서 새 인덱스를 반환
  const next = useCallback(() => {
    const newIndex = (currentIndex + 1) % itemListLength;
    setCurrentIndex(newIndex);
    return newIndex;
  }, [currentIndex, itemListLength]);

  // 자동 재생
  useEffect(() => {
    if (!autoPlay || itemListLength === 0) return;

    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, next, itemListLength]);

  // 선택된 아이템 인덱스 설정
  useEffect(() => {
    if (!selectedItem) return;

    const itemIndex = itemList.findIndex((item) => item.musicalId === selectedItem);
    if (itemIndex !== -1) {
      setCurrentIndex(itemIndex - CAROUSEL_CENTER_INDEX);
    }
  }, [selectedItem, itemList, itemListLength]);

  return { currentIndex, prev, next };
};
