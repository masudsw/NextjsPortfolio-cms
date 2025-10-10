// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'accessToken'; 
console.log(AUTH_COOKIE_NAME)
const protectedRoutes = [
    '/dashboard',
    '/dashboard/blog',
    '/dashboard/projects',  
];

export function middleware(request: NextRequest) {    
    const hasAuthCookie = request.cookies.has(AUTH_COOKIE_NAME);
    const isProtectedRoute = protectedRoutes.some(route => 
        request.nextUrl.pathname.startsWith(route)
    );
 
    if (isProtectedRoute && !hasAuthCookie) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
};