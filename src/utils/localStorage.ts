import { Product } from '../types/Product';

export const saveProduct = (product: Product) => {
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    
    // Jika produk sudah ada (berdasarkan ID), maka ganti produk yang ada
    const index = products.findIndex((p: Product) => p.id === product.id);
    if (index !== -1) {
      products[index] = product; // Update produk yang ada
    } else {
      products.push(product); // Jika tidak ada, tambahkan produk baru
    }
  
    localStorage.setItem('products', JSON.stringify(products));
  };  

export const deleteProduct = (id: number) => {
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  const filteredProducts = products.filter((product: Product) => product.id !== id);
  localStorage.setItem('products', JSON.stringify(filteredProducts));
};
