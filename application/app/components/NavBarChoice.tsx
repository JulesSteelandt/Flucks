'use client';
import React, {useEffect, useState} from 'react';
import isUserLog from '@/app/utils/isUserLog';
import NavBarConnected from '@/app/components/NavigationBarConnected';
import NavBar from '@/app/components/NavigationBar';

export default function NavBarChoice() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const log = isUserLog();

  useEffect(() => {
    setIsAuthenticated(log);
  }, [log]);

  return <div>{isAuthenticated ? <NavBarConnected /> : <NavBar />}</div>;
}
