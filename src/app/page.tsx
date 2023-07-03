'use client';

import Signin from '@/components/Signin';
import Signup from '@/components/Signup';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [isLoginActive, setIsLoginActive] = useState(false);

  return (
    <div className="grid h-screen place-content-center bg-rick-and-morty-darker bg-cover">
      <div className="fixed left-0 right-0 top-0 mx-40 flex items-center justify-between">
        <Image src={'/netflix.png'} alt="Netflix Logo" width={200} height={150} />
        <button
          className="rounded-[0.250rem] bg-netflix px-3 py-1 font-semibold"
          onClick={() => setIsLoginActive(!isLoginActive)}
        >
          {isLoginActive ? 'Sign Up' : 'Sign In'}
        </button>
      </div>
      {isLoginActive ? (
        <Signin />
      ) : (
        <div className="flex flex-col gap-y-3 text-center">
          <h1 className="text-4xl">Unlimited Movie</h1>
          <h3 className="text-xl">Watch Anywhere Cancel Anytime</h3>
          <p className="text-lg">Ready to watch ? Enter your username to create account</p>
          <Signup />
        </div>
      )}
    </div>
  );
}
