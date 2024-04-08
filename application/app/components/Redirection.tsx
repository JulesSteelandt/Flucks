'use client';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function Redirection() {
  const router = useRouter();

  useEffect(() => {
    router.push('/flucks');
  }, []);

  return <div />;
}
