'use client';

import { useAppSelector } from '@/redux/hooks';
import Unauthorized from './Unauthorized';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const currentUser = useAppSelector((state) => state.user?.username);

  if (!currentUser) return <Unauthorized />;

  return children;
}
