import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async () => {
  try {
    
    console.log('Connected to the database');
    console.log('Available models in Prisma Client:', Object.keys(prisma));
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
})();


export default prisma;
