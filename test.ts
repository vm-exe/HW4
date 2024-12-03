const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

(async () => {
  try {
    console.log('Prisma Client Available Models:', Object.keys(prisma));
    const products = await prisma.product.findMany();
    console.log('Fetched Products:', products);
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    await prisma.$disconnect();
  }
})();
