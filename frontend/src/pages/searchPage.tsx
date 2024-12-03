import { DefaultComponentProps } from '@mui/material/OverridableComponent';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../api/productApi';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const collections = ['All', 'Bags', 'Shirts', 'Hoodies', 'Stickers']; // Ejemplo de colecciones

const SearchPage: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('All');
  const navigate = useNavigate(); 

  useEffect(() => {
    const loadProducts = async () => {
      const params = {
        search,
        sort,
        collection: selectedCollection === 'All' ? '' : selectedCollection,
      };
      const data = await fetchProducts(params);
      setProducts(data);
    };
    loadProducts();
  }, [search, sort, selectedCollection]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh', bgcolor: '#121212' }}>
      {/* Barra lateral (Colecciones) */}
      <Box sx={{ width: '20%', bgcolor: '#1e1e1e', padding: 2, color: 'white' }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Collections
        </Typography>
        <List>
          {collections.map((collection) => (
            
        <div
          onClick={() => setSelectedCollection(collection)}
          style={{
          padding: '10px',
          cursor: 'pointer',
          backgroundColor: selectedCollection === collection ? '#333' : 'transparent',
          color: 'white',
          }}
         >
          {collection}
        </div>


          ))}
        </List>
      </Box>

      {/* Área principal */}
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        {/* Barra de búsqueda y opciones */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 3,
          }}
        >
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ bgcolor: 'white', borderRadius: 1, width: '50%' }}
          />
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            displayEmpty
            size="small"
            sx={{ bgcolor: 'white', borderRadius: 1 }}
          >
            <MenuItem value="">Sort by</MenuItem>
            <MenuItem value="asc">Price: Low to High</MenuItem>
            <MenuItem value="desc">Price: High to Low</MenuItem>
          </Select>
        </Box>

        {/* Resultados */}
        <Grid container spacing={2}>
          {products.map((product: any) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ bgcolor: '#1e1e1e', color: 'white', borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image || 'https://picsum.photos/150'} // Placeholder para las imágenes
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" sx={{ marginBottom: 1 }}>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    fullWidth
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SearchPage;
