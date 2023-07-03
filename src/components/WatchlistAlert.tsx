import { AiOutlineCloseCircle } from 'react-icons/ai';

type Props = {
  message: string;
  isSuccess: boolean;
  close: () => void;
};

export default function WatchlistAlert({ message, isSuccess, close }: Props) {
  return (
    <div className={`${isSuccess ? 'bg-green-500' : 'bg-netflix'} flex max-w-sm gap-x-2 rounded-[0.250rem] px-2 py-1`}>
      <p>{message}</p>
      <button onClick={close}>
        <AiOutlineCloseCircle className="cursor text-xl" />
      </button>
    </div>
  );
}
