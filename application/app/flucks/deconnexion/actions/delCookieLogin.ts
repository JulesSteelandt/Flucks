'use server';
import {cookies} from 'next/headers';

const delCookieLogin = async () => {
  cookies().delete('token');
};

export default delCookieLogin;
