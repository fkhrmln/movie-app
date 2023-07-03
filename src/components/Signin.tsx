'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { BarLoader } from 'react-spinners';
import Alert from './Alert';
import { signIn } from '@/redux/userSlice';
import { useAppDispatch } from '@/redux/hooks';

export default function Signin() {
  const initState = {
    username: '',
    password: '',
  };

  const router = useRouter();
  const [data, setData] = useState(initState);
  const [message, setMessage] = useState('');
  const [isMutating, setIsMutating] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();

  async function signinHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsMutating(true);

    const res = await fetch('http://localhost:3000/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();

    if (res.status !== 200) {
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
    <div className="max-w-lg bg-black/75 px-10 py-5">
      {isError && <Alert message={message} close={closeHandler} />}
      <h3 className="mb-5 text-center text-2xl font-semibold">Sign In</h3>
      <form autoComplete="off" onSubmit={signinHandler} className="flex flex-col gap-y-3">
        <div className="mb-5 flex flex-col gap-y-2 [&>*]:rounded-[0.250rem]">
          <input
            type="text"
            placeholder="Username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            className="bg-gray-800 px-3 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="bg-gray-800 px-3 py-2"
          />
        </div>
        <button type="submit" className="rounded-[0.250rem] bg-netflix px-3 py-2 font-semibold text-white">
          Submit
        </button>
      </form>
    </div>
  );
}
