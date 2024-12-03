import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/productApi';
import { Box, Typography, Button, Grid, Chip } from '@mui/material';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(Number(id));
        setProduct(data);
      } catch (error) {
        console.error('Error al cargar los detalles del producto:', error);
      }
    };
    loadProduct();
  }, [id]);

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: 3, bgcolor: '#121212', color: 'white', minHeight: '100vh' }}>
      <Grid container spacing={3}>
        {/* Sección de la imagen */}
        <Grid item xs={12} md={6}>
          <img
            src={product.image || 'https://picsum.photos/150'}
            alt={product.name}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Grid>

        {/* Sección de los detalles */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            {product.name}
          </Typography>
          <Typography variant="h5" color="primary" sx={{ marginBottom: 2 }}>
            ${product.price}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 3 }}>
            {product.description}
          </Typography>

          {/* Variantes (colores) */}
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Color:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, marginBottom: 3 }}>
            {product.variants.map((variant: any) => (
              <Chip
                key={variant.id}
                label={variant.name}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: '#1e1e1e',
                  color: 'white',
                  '&:hover': { backgroundColor: '#333' },
                }}
              />
            ))}
          </Box>

          {/* Botón de agregar al carrito */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => console.log('Producto agregado al carrito')}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetailPage;
