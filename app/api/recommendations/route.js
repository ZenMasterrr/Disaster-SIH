import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const suggestions = await prisma.user.findMany({
      take: 5,
      select: {
        id: true,
        name: true,
        username: true,
        avatar: true,
      },
      orderBy: {
        // This is a placeholder. You might want to order by
        // a more relevant field or use a more complex query
        // to get actual suggestions.
        id: 'desc',
      },
    })
    return Response.json(suggestions)
  } catch (error) {
    console.error('Failed to fetch suggestions:', error)
    return Response.json({ error: 'Failed to fetch suggestions' }, { status: 500 })
  }
}