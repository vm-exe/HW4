import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', 
});

export const fetchProducts = async (params: Record<string, any>) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const fetchProductById = async (id: number) => {
  const response = await api.get('/products', { params: { id } }); // Ahora utiliza el query param "id"
  return response.data;
};
