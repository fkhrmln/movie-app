// import { NextResponse } from 'next/server';

// const allowedOrigins =
//   process.env.NODE_ENV === 'production' ? ['https://mysite.com'] : ['http://localhost:3000', 'http://127.0.0.1:3000'];

export default function Middleware(req: Request) {
  // const origin = req.headers.get('origin');
  // if (origin && !allowedOrigins.includes(origin)) return new Response(null, { status: 400 });
  // return NextResponse.next();
}

// export const config = {
//   matcher: '/api/:path*',
// };
