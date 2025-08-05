import { memo } from 'react';

type Props = {
  count?: number;
};

function ShootingStars({ count = 20 }: Props) {
  return (
    <div className="absolute w-[200%] h-[200%] left-[-50%] top-[-50%] rotate-45 pointer-events-none">
      {Array.from({ length: count }, (_, starIndex) => {
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const duration = Math.random() * 2 + 1;
        const delay = Math.random() * 1000;

        return (
          <div
            key={starIndex}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              background: 'linear-gradient(-45deg,rgba(255,255,255,1),rgba(255,255,255,0))',
              animation: `star-tail ${duration}s ease-in-out infinite ${delay}ms, star-shooting ${duration}s ease-in-out infinite ${delay}ms`,
            }}
            className="absolute h-[2px] rounded-full filter-[drop-shadow(0_0_6px_rgba(255,255,255,1))]"
          >
            {[45, -45].map((rotate) => (
              <div
                key={rotate}
                style={{
                  background: 'linear-gradient(-45deg,rgba(255,255,255,0),rgba(255,255,255,1),rgba(255,255,255,0))',
                  transform: `translateX(50%) rotate(${rotate}deg)`,
                  animation: `star-shining ${duration}s ease-in-out infinite ${delay}ms`,
                }}
                className="absolute h-[2px] rounded-full top-1/2 right-0"
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default memo(ShootingStars);
