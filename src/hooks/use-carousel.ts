import { useEffect, useState } from "react";

export const useCarousel = (images: readonly string[], interval: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const getPositionIndex = (index: number) => {
    return (index - currentIndex + images.length) % images.length;
  };

  return { currentIndex, getPositionIndex };
};
