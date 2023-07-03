'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { BarLoader } from 'react-spinners';
import Alert from './Alert';
import { useAppDispatch } from '@/redux/hooks';
import { signIn } from '@/redux/userSlice';

export default function Signup() {
  const initState = {
    username: '',
    password: '',
  };

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [data, setData] = useState(initState);
  const [message, setMessage] = useState('');
  const [isMutating, setIsMutating] = useState(false);
  const [isError, setIsError] = useState(false);

  async function signupHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsMutating(true);

    const res = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();

    if (res.status !== 201) {
      setIsError(true);
      setMessage(response.message);
      setIsMutating(false);

      return;
    }

    dispatch(signIn({ user: { id: response.data.id, username: response.data.username } }));

    setData(initState);

    router.push('/movies');
  }

  function closeHandler() {
    setIsError(false);
    setMessage('');
  }

  if (isMutating) {
    return (
      <div className="mx-auto">
        <BarLoader color="#E50914" />;
      </div>
    );
  }

  return (
    <div>
      <form autoComplete="off" onSubmit={signupHandler} className="flex gap-x-3 [&>*]:rounded-[0.250rem]">
        <input
          type="text"
          placeholder="Username"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          className="border-1 border border-white bg-black/75 px-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className="border-1 border border-white bg-black/75 px-2"
        />
        <button type="submit" className="bg-netflix px-3 py-1 font-semibold">
          Get Started
        </button>
      </form>
      {isError && (
        <div className="mx-auto max-w-xs">
          <Alert message={message} close={closeHandler} />
        </div>
      )}
    </div>
  );
}
