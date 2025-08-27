import type { GetPosterListResponseData } from '@/hooks/queries/poster/useGetPosterList';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Props {
  poster: GetPosterListResponseData;
  positionIndex: number;
}

export function PosterItem({ poster, positionIndex }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/musical/${poster.musicalId}`);
  };

  return (
    <motion.img
      key={poster.musicalId}
      onClick={handleClick}
      src={poster.imageUrl}
      alt={`${poster.musicalId} poster`}
      className="cursor-pointer absolute object-cover left-1/2 -translate-x-1/2 rounded-xl w-[calc(120px+7vw)] h-[calc(170px+7vw)] bg-black"
      initial={{ ...positionStyles[positionIndex] }}
      animate={{ ...positionStyles[positionIndex] }}
    />
  );
}

const positionStyles = [
  {
    x: -250,
    scale: 0.75,
    zIndex: 1,
    filter: 'opacity(0.7) brightness(0.85) saturate(0.85)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.25), 0 4px 8px rgba(0,0,0,0.18)',
  },
  {
    x: -130,
    scale: 0.9,
    zIndex: 2,
    filter: 'opacity(0.9) brightness(0.9) saturate(0.9)',
    boxShadow: '0 16px 32px rgba(0,0,0,0.28), 0 6px 12px rgba(0,0,0,0.2)',
  },
  {
    x: 0,
    scale: 1,
    zIndex: 3,
    filter: 'opacity(1) brightness(1.1) saturate(1.15)',
    boxShadow: '0 24px 48px rgba(0,0,0,0.3), 0 10px 20px rgba(0,0,0,0.25)',
  },
  {
    x: 130,
    scale: 0.9,
    zIndex: 2,
    filter: 'opacity(0.9) brightness(0.9) saturate(0.9)',
    boxShadow: '0 16px 32px rgba(0,0,0,0.28), 0 6px 12px rgba(0,0,0,0.2)',
  },
  {
    x: 250,
    scale: 0.75,
    zIndex: 1,
    filter: 'opacity(0.7) brightness(0.85) saturate(0.85)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.25), 0 4px 8px rgba(0,0,0,0.18)',
  },
];
