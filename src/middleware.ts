import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const private_routes = ["/accounts", "/cart"];
const public_routes = ["/login", "/signup"];

// Create the next-intl middleware
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
	// First, handle internationalization
	const response = intlMiddleware(request);

	// Get the access token from the cookie
	const accessToken = request.cookies.get("access_token")?.value;

	// Get the pathname without locale prefix
	const pathname = request.nextUrl.pathname;
	const pathnameWithoutLocale = pathname.replace(/^\/(en|bn)/, "") || "/";

	// Check if the current route is a private route
	const isPrivateRoute = private_routes.some((route) => pathnameWithoutLocale.startsWith(route));

	// Redirect to login page if the user is not authenticated and trying to access private routes
	if (isPrivateRoute && !accessToken) {
		// Preserve the locale when redirecting to login
		const locale = pathname.match(/^\/(en|bn)/)?.[1] || "en"; // Default to 'en' if no locale found
		const loginUrl = new URL(`/${locale}/login`, request.url);
		return NextResponse.redirect(loginUrl);
	}

	// Check if the current route is a public route
	const isPublicRoute = public_routes.some((route) => pathnameWithoutLocale.startsWith(route));

	// Redirect to home page if the user is authenticated and trying to access public routes
	if (isPublicRoute && accessToken) {
		// Preserve the locale when redirecting to home
		const locale = pathname.match(/^\/(en|bn)/)?.[1] || "en"; // Default to 'en' if no locale found
		const homeUrl = new URL(`/${locale}`, request.url);
		return NextResponse.redirect(homeUrl);
	}

	// Return the internationalization response if no redirect is needed
	return response;
}

export const config = {
	// Match all pathnames except for
	// - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
	// - … the ones containing a dot (e.g. `favicon.ico`)
	matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
