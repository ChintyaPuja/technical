import React, { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import { saveProduct } from '../utils/localStorage';

interface ProductFormProps {
  onFormSubmit: (product: Product) => void;
  existingProduct?: Product;
}

const ProductForm: React.FC<ProductFormProps> = ({ onFormSubmit, existingProduct }) => {
  const [name, setName] = useState<string>(''); // Set default to an empty string
  const [price, setPrice] = useState<string>(''); // Set price as an empty string
  const [category, setCategory] = useState<string>(existingProduct?.category || '');

  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct?.name || '');
      setPrice(existingProduct?.price.toString() || ''); // Ensure price is set as string, empty if none
      setCategory(existingProduct?.category || '');
    }
  }, [existingProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert price back to a number for saving (only if price is not empty)
    const priceValue = price ? parseFloat(price) : 0;

    const newProduct: Product = existingProduct
      ? { id: existingProduct.id, name, price: priceValue, category } // Update existing product
      : { id: Date.now(), name, price: priceValue, category }; // Create new product

    onFormSubmit(newProduct);
    saveProduct(newProduct);

    // Reset form after submit
    setName('');
    setPrice('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div>
        <label>Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder='Enter name of product'
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)} // Price is now a string, updating it as such
          required
          min={1}
          placeholder="Enter price of product"
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          value={category}
          placeholder="Enter category of product"
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-2 rounded">
        {existingProduct ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
};

export default ProductForm;
