import { next } from '@vercel/functions';

/* Password gate for the whole site -- this tracker has real spend/bookings
   numbers, so it shouldn't be open to anyone with the link. Set SITE_PASSWORD
   as an environment variable in the Vercel project (Production), not here. */
export const config = {
  matcher: '/((?!favicon.ico).*)',
};

export default function middleware(request) {
  const expected = process.env.SITE_PASSWORD;
  const auth = request.headers.get('authorization');

  if (expected && auth && auth.startsWith('Basic ')) {
    const decoded = atob(auth.slice('Basic '.length));
    const sep = decoded.indexOf(':');
    const suppliedPassword = sep >= 0 ? decoded.slice(sep + 1) : decoded;
    if (suppliedPassword === expected) {
      return next();
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Akka Q3 Tracker"' },
  });
}
