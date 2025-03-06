import { useState } from 'react';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { FaStar } from 'react-icons/fa';

interface IRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
}
export function RatingComponent(props: IRatingProps) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <FaStar
            key={index}
            onClick={() =>
              !props.readonly && props.onRatingChange?.(ratingValue)
            }
            onMouseEnter={() => !props.readonly && setHover(ratingValue)}
            onMouseLeave={() => !props.readonly && setHover(null)}
            color={
              ratingValue <= (hover || props.rating) ? '#ffc107' : '#e4e5e9'
            }
            size={15}
          />
        );
      })}
    </div>
  );
}
