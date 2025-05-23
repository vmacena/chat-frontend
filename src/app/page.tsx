'use client';
import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('@/app/pages/home/page'), { ssr: false });

export default function Home() {
  return <HomePage />;
}
