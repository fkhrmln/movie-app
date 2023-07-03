import { BarLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className="grid h-screen place-content-center">
      <BarLoader color="#E50914" />
    </div>
  );
}
