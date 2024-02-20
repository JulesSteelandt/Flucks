import {getCookieToken} from '@/app/utils/getToken';

export default function isUserLog() {
  return getCookieToken() !== null && getCookieToken() !== undefined;
}
