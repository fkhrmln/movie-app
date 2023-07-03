'use client';

import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import { signOut } from '@/redux/userSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const currentUser = useAppSelector((state) => state.user?.username);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  function signOutHandler() {
    router.push('/');

    dispatch(signOut());
  }

  return (
    <div className="fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-black/75 px-5">
      <Link href={'/movies'}>
        <Image src={'/netflix.png'} alt="Netflix Logo" width={125} height={75} />
      </Link>
      <div
        className={`${!currentUser && 'hidden'} relative flex cursor-pointer items-center gap-x-3 text-white`}
        onClick={() => setIsDropdownActive(!isDropdownActive)}
      >
        <h3 className="font-semibold">{currentUser}</h3>
        <FaUserCircle className="text-3xl" />
        <div
          className={`${
            !isDropdownActive && 'hidden'
          } absolute right-0 top-10 flex w-full flex-col divide-y-2 rounded-md bg-white px-3 py-1 text-center text-sm text-black [&>*]:py-1`}
        >
          <Link href={'/movies/search'}>Search</Link>
          <Link href={'/movies/watchlist'}>Watchlist</Link>
          <button onClick={signOutHandler}>Sign Out</button>
        </div>
      </div>
    </div>
  );
}
