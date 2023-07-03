import Navbar from '@/components/Navbar';
import RequireAuth from '@/components/RequireAuth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Movies',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <RequireAuth>{children}</RequireAuth>
    </>
  );
}
