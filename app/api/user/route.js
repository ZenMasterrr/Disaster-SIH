import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const user = await prisma.user.findFirst()
  return Response.json(user)
}