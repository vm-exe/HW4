import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SearchPage from './pages/searchPage';
import ProductDetailPage from './pages/productDetail';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
    </Routes>
  );
};

export default App;
