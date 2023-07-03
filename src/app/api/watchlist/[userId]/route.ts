import { PrismaClient } from '@prisma/client';

type Props = {
  params: {
    userId: string;
  };
};

const prisma = new PrismaClient();

export async function GET(req: Request, { params: { userId } }: Props) {
  const watchlist: Watchlist[] = await prisma.watchlist.findMany({
    where: {
      user_id: userId,
    },
  });

  return new Response(JSON.stringify([...watchlist]), { status: 200 });
}

export async function POST(req: Request, { params: { userId } }: Props) {
  await prisma.watchlist.delete({
    where: {
      id: Number(userId),
    },
  });

  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
