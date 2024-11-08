import { useState, useEffect } from 'react';
import { Product } from '../types/Product';

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Load products from localStorage when the component mounts
  useEffect(() => {
    const savedProducts = loadProductsFromLocalStorage();
    setProducts(savedProducts);
  }, []);

  const saveProductsToLocalStorage = (products: Product[]) => {
    localStorage.setItem('products', JSON.stringify(products));
  };

  const loadProductsFromLocalStorage = (): Product[] => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  };

  const addProduct = (product: Product) => {
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    saveProductsToLocalStorage(updatedProducts);
  };

  const updateProduct = (updatedProduct: Product) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    saveProductsToLocalStorage(updatedProducts);
  };

  const deleteProduct = (productId: number) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
    saveProductsToLocalStorage(updatedProducts);
  };

  return [products, addProduct, updateProduct, deleteProduct] as const;
};

export default useProducts;
