import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const stories = await prisma.story.findMany({
    include: { user: true },
  })
  return Response.json(stories)
}