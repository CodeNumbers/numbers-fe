import { useRef } from 'react';

interface Props {
  WHEEL_TIMEOUT?: number;
  onWheel: (deltaY: number) => void;
}

export function useWheel({ WHEEL_TIMEOUT = 200, onWheel }: Props) {
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (wheelTimeout.current) return;

    e.preventDefault();
    onWheel(e.deltaY);

    wheelTimeout.current = setTimeout(() => (wheelTimeout.current = null), WHEEL_TIMEOUT);
  };

  return { wheelTimeout, handleWheel };
}
