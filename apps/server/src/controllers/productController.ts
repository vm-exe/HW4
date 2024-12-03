import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';




const prisma = new PrismaClient();
// Get products
export const getAllProducts = async (req: Request, res: Response) => {
  const { search, id } = req.query; // Obtén los parámetros "search" y "id"

  try {
    // Si se proporciona un ID, devuelve un producto específico
    if (id) {
      const product = await prisma.product.findUnique({
        where: { id: Number(id) },
        include: {
          variants: true, // Incluye variantes del producto
          collections: true, // Incluye colecciones relacionadas
        },
      });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      return res.json(product); // Devuelve el producto específico
    }

    // Si no se proporciona un ID, busca todos los productos
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: search as string || '', // Busca productos cuyo nombre contenga el texto (vacío si no se envía "search")
          mode: 'insensitive', // Ignora mayúsculas y minúsculas
        },
      },
      include: {
        variants: true,
        collections: true,
      },
    });

    res.json(products); // Devuelve los productos filtrados
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'An error occurred' });
  } finally {
    await prisma.$disconnect();
  }
};





// Create products
export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price } = req.body;
  try {
   
    console.log('Prisma Client:', prisma);
    console.log('Prisma Product Model:', prisma.product);

    const product = await prisma.product.create({
      data: { name, description, price },
    });
    res.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Error creating product' });
  }
};

// update
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    
    console.log('Prisma Client:', prisma);
    console.log('Prisma Product Model:', prisma.product);

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, description, price },
    });
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Error updating product' });
  }
};

// delete
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
   
    console.log('Prisma Client:', prisma);
    console.log('Prisma Product Model:', prisma.product);

    await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
};
