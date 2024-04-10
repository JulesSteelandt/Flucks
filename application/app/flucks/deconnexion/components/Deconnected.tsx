'use client';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import delCookieLogin from '@/app/flucks/deconnexion/actions/delCookieLogin';

export default function Deconnected() {
  const router = useRouter();

  useEffect(() => {
    delCookieLogin();
    router.refresh();
    router.push('/flucks');
  }, []);

  return <div />;
}
