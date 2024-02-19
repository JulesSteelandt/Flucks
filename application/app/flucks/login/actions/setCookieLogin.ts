'use server';
import {cookies} from 'next/headers';

const setCookieLogin = async (token: string) => {
  console.log(token);
  cookies().set('token', token);
};

export default setCookieLogin;
