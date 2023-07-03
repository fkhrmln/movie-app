import Link from 'next/link';

export default function Unauthorized() {
  return (
    <div className="grid h-screen place-content-center gap-y-3 text-center">
      <h1 className="text-3xl">401 Unauthorized</h1>
      <p className="text-xl">Please Login First</p>
      <Link href={'/'} className="text-netflix">
        Click Here
      </Link>
    </div>
  );
}
