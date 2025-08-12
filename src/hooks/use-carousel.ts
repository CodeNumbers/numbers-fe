import { useEffect, useState } from 'react';

export const useCarousel = <T>(
  imageList: T[],
  initialIndex: number = 0,
  interval: number,
  autoPlay: boolean = false
) => {
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(autoPlay);
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % imageList.length;
      setCurrentIndex(nextIndex);
    }, interval);

    return () => clearInterval(timer);
  }, [isAutoPlay, currentIndex, imageList.length, interval]);

  return {
    setIsAutoPlay,
    currentIndex,
    setCurrentIndex,
  };
};
