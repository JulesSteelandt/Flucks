import {NextRequest, NextResponse} from 'next/server';
import isUserLog from '@/app/utils/isUserLog';

export function middleware(request: NextRequest) {
  if (!isUserLog()) {
    return NextResponse.redirect(new URL('/flucks/login', request.url));
  }
}

export const config = {
  matcher: ['/flucks/stream/create', '/flucks/my_videos'],
};
