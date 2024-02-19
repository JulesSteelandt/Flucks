'use server';

import {cookies} from 'next/headers';
import {jwtDecode} from 'jwt-decode';

export const getCookieToken = () => {
  const hasCookie = cookies().has('token');
  if (hasCookie) {
    return cookies().get('token');
  }
  return null;
};

export const getDecodedToken = () => {
  const token = getCookieToken();
  if (token !== null) {
    return jwtDecode(token);
  }
  return null;
};
