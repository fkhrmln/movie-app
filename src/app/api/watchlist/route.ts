import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const watchlist: Watchlist = await req.json();

  const foundWatchlist = await prisma.watchlist.findFirst({
    where: {
      movie_id: watchlist.movie_id,
      user_id: watchlist.user_id,
    },
  });

  if (foundWatchlist)
    return new Response(JSON.stringify({ message: `${foundWatchlist.title} Already on Watchlist` }), { status: 409 });

  const newWatchlist = await prisma.watchlist.create({
    data: {
      ...watchlist,
    },
  });

  return new Response(JSON.stringify({ message: `${newWatchlist.title} Added to Watchlist` }), { status: 201 });
}
