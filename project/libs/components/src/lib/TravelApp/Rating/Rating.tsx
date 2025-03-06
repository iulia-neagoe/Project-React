import { useState } from 'react';
import styles from './Rating.module.css';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { FaStar } from 'react-icons/fa';
import { ModusButton } from '@trimble-oss/modus-react-components';

interface IRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
}
export function RatingComponent(props: IRatingProps) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          // <ModusButton
          //   key={index}
          //   onClick={() => props.onRatingChange?.(ratingValue)}
          //   onMouseEnter={() => setHover(ratingValue)}
          //   onMouseLeave={() => setHover(null)}
          // >
          <FaStar
            color={
              ratingValue <= (hover || props.rating) ? '#ffc107' : '#e4e5e9'
            }
            size={15}
          />
          // </ModusButton>
        );
      })}
    </div>
  );
}
