'use server';
import {cookies} from 'next/headers';

const setCookieLogin = async (token: string) => {
  cookies().set('token', token);
};

export default setCookieLogin;
