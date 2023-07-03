import { PrismaClient } from '@prisma/client';

const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return new Response(JSON.stringify({ message: 'Username and Password are Required' }), { status: 400 });
  }

  const foundUser: User | null = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!foundUser) return new Response(null, { status: 404 });

  const isPasswordMatch = await bcrypt.compare(password, foundUser.password);

  if (!isPasswordMatch) return new Response(JSON.stringify({ message: 'Wrong Password' }), { status: 401 });

  return new Response(
    JSON.stringify({
      message: 'Sign In Successfully',
      data: {
        id: foundUser.id,
        username: foundUser.username,
      },
    })
  );
}
