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

  if (foundUser) return new Response(JSON.stringify({ message: 'Username Already Exists' }), { status: 409 });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: User = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  return new Response(
    JSON.stringify({
      message: 'Sign Up Successfully',
      data: {
        id: newUser.id,
        username: newUser.username,
      },
    }),
    { status: 201 }
  );
}
