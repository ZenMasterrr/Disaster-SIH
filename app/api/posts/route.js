import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const posts = await prisma.post.findMany({
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  })
  return Response.json(posts)
}