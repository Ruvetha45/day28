import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CartProvider from './Context/CartContext'; 
import Navbar from './Components/Navbar';
import ProductList from './Components/ProductList';
import CartPage from './Components/CartPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </CartProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;