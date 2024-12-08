import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
	const url = new URL(req.url);
	const token = !!req.cookies.get('token')?.value;

	// Redirect from the root URL based on login status
	if (url.pathname === '/') {
		if (token) {
			// Redirect to dashboard if logged in
			return NextResponse.redirect(new URL('/dashboard', req.url));
		} else {
			// Redirect to login if not logged in
			return NextResponse.redirect(new URL('/login', req.url));
		}
	}
	// If the user is not logged in and trying to access a protected page (like dashboard)
	if (
		!token &&
		(url.pathname.includes('/dashboard') ||
			url.pathname.includes('/profile'))
	) {
		return NextResponse.redirect(new URL('/login', req.url));
	}

	// If the user is logged in and trying to access the login page, redirect to dashboard
	if (token && url.pathname.includes('/login')) {
		return NextResponse.redirect(new URL('/dashboard', req.url));
	}

	return NextResponse.next();
}

// // Apply middleware only to protected routes and the root page
// export const config = {
//   matcher: ['/', '/dashboard', '/profile', '/login'],
// };
