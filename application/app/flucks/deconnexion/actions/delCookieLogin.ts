'use server';
import {cookies} from 'next/headers';

// eslint-disable-next-line require-await
const delCookieLogin = async () => {
  cookies().delete('token');
};

export default delCookieLogin;
