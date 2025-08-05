import { useEffect, useState } from 'react';

export const useCarousel = <T>(imageList: T[], interval: number, autoPlay: boolean = false) => {
  const [centerIndex, setCenterIndex] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(autoPlay);

  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      const nextIndex = (centerIndex + 1) % imageList.length;
      setCenterIndex(nextIndex);
    }, interval);

    return () => clearInterval(timer);
  }, [isAutoPlay, centerIndex, imageList.length, interval]);

  const getPositionIndex = (imageIndex: number): number => {
    return (imageIndex - centerIndex + imageList.length) % imageList.length;
  };

  return {
    getPositionIndex,
    setCenterIndex,
    setIsAutoPlay,
  };
};
