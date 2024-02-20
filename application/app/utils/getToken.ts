'use strict';

import {cookies} from 'next/headers'; // Assurez-vous que cette importation est correcte
import {jwtDecode} from 'jwt-decode';

export const getCookieToken = () => {
  const cookiesHeader = cookies();
  const hasCookie = cookiesHeader.has('token');
  if (hasCookie) {
    return cookiesHeader.get('token')?.value;
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
