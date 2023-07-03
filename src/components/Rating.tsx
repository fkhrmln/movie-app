import { FaRegStar, FaStar } from 'react-icons/fa';

export default function Rating({ rating }: { rating: number }) {
  const totalStars = 5;
  const rate = rating / 2;

  return (
    <div className="flex items-center gap-x-2">
      {[...new Array(totalStars)].map((star, index) => {
        return index + 1 < Math.ceil(rate) ? (
          <FaStar className="mb-[0.150rem] text-amber-400" />
        ) : (
          <FaRegStar className="mb-[0.150rem] text-amber-400" />
        );
      })}
      <p>{rating.toFixed(1)} / 10</p>
    </div>
  );
}
