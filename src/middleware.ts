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
    const currentPath = request.nextUrl.pathname;   
    const hasAuthCookie = request.cookies.has(AUTH_COOKIE_NAME);
    const isProtectedRoute = protectedRoutes.some(route => 
        request.nextUrl.pathname.startsWith(route)
    );
    console.log('--- MIDDLEWARE CHECK ---');
    console.log(`Path: ${currentPath}`);
    console.log(`Protected: ${isProtectedRoute}`);
    console.log(`Cookie Present: ${hasAuthCookie}`);
    console.log(`Full Cookie Map:`, request.cookies.getAll()); // 💡 Show all cookies for inspection
 
    // if (isProtectedRoute && !hasAuthCookie) {
    //     const loginUrl = new URL('/login', request.url);
    //     loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    //     return NextResponse.redirect(loginUrl);
    // }

    // if (isProtectedRoute && hasAuthCookie) {
    //     console.log(`ACCESS GRANTED: User accessing protected route ${currentPath}`);
    // }
    // return NextResponse.next();
}

// export const config = {
//     matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
// };