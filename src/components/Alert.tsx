import { AiOutlineCloseCircle } from 'react-icons/ai';

type Props = {
  message: string;
  close: () => void;
};

export default function Alert({ message, close }: Props) {
  return (
    <div className="my-3 flex items-center justify-between rounded-[0.250rem] bg-netflix px-3 py-1 text-sm">
      <p>{message}</p>
      <button onClick={close}>
        <AiOutlineCloseCircle className="cursor text-xl" />
      </button>
    </div>
  );
}
