import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(req: NextRequest) {
	if (!req.cookies.has('refresh_token')) {
		return NextResponse.redirect(new URL('/', req.url))
	}
}
 
export const config = {
	matcher: ['/profile', '/cart', '/favorites', '/orders']
}