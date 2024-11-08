import React, { useState, useEffect } from 'react';
import { Product } from './types/Product';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import { saveProduct } from './utils/localStorage';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

  // Load products from localStorage when the component mounts
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(savedProducts);
  }, []);

  const handleFormSubmit = (product: Product) => {
    saveProduct(product); // Update the product in localStorage
    // Reload the products from localStorage after saving
    const updatedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(updatedProducts);
    setEditingProduct(undefined); // Reset the form
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };
  return (
    <>
      <div className="bg-[#fbfbf9] min-h-screen font-sans">
        <div className="text-center my-8">
          <h1 className="text-2xl font-bold text-[#0048ff]">Product Management App</h1>
        </div>
        <div className="container mx-auto px-5 py-5 text-black">
          <ProductForm onFormSubmit={handleFormSubmit} existingProduct={editingProduct} />
          <ProductList products={products} onEdit={handleEditProduct} />
        </div>
      </div>
    </>
  );
};

export default App;
