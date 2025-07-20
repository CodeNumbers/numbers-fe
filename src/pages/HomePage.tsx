import { useCarousel } from "../hooks/use-carousel";

const CAROUSEL_CONFIG = {
  images: [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
  ],
  positions: [
    { x: -200, scale: 0.75, zIndex: 1 },
    { x: -100, scale: 0.9, zIndex: 2 },
    { x: 0, scale: 1, zIndex: 3 },
    { x: 100, scale: 0.9, zIndex: 2 },
    { x: 200, scale: 0.75, zIndex: 1 },
  ],
  autoPlayInterval: 3000,
  imageSize: { width: 250, height: 250 },
} as const;

export default function HomePage() {
  const { getPositionIndex } = useCarousel(
    CAROUSEL_CONFIG.images,
    CAROUSEL_CONFIG.autoPlayInterval,
  );

  return (
    <div className="bg-white relative flex justify-center items-center h-full">
      {CAROUSEL_CONFIG.images.map((src, index) => {
        const positionIndex = getPositionIndex(index);
        const position = CAROUSEL_CONFIG.positions[positionIndex];
        const isCenter = position.scale === 1;
        const isMiddle = position.scale === 0.9;

        return (
          <img
            key={index}
            src={src}
            alt={`carousel-item-${index}`}
            className="rounded-xl shadow-lg absolute top-1/2 left-1/2 object-cover"
            style={{
              width: "calc(120px + 7vw)",
              height: "calc(170px + 7vw)",
              transform: `translateX(calc(-50% + ${position.x}px)) translateY(-50%) scale(${position.scale})`,
              transition: "transform 0.6s ease",
              zIndex: position.zIndex,
              filter: isCenter
                ? "opacity(1) brightness(1.1) saturate(1.15)"
                : isMiddle
                  ? "opacity(0.9) brightness(0.9) saturate(0.9)"
                  : "opacity(0.7) brightness(0.85) saturate(0.85)",
              boxShadow: isCenter
                ? "0 24px 48px rgba(0,0,0,0.3), 0 10px 20px rgba(0,0,0,0.25)"
                : isMiddle
                  ? "0 16px 32px rgba(0,0,0,0.28), 0 6px 12px rgba(0,0,0,0.2)"
                  : "0 10px 20px rgba(0,0,0,0.25), 0 4px 8px rgba(0,0,0,0.18)",
            }}
          />
        );
      })}
    </div>
  );
}
