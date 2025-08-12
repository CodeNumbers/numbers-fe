import { useRef } from 'react';

interface Props {
  WHEEL_TIMEOUT?: number;
  onWheel: (scrollDirection: number) => void;
}

export function useWheel({ WHEEL_TIMEOUT = 200, onWheel }: Props) {
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (wheelTimeout.current) return;

    e.preventDefault();
    const scrollDirection = e.deltaY;
    onWheel(scrollDirection);

    wheelTimeout.current = setTimeout(() => (wheelTimeout.current = null), WHEEL_TIMEOUT);
  };

  return { wheelTimeout, handleWheel };
}
