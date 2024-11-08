import React, { useState } from 'react';
import { Product } from '../types/Product';
import { deleteProduct } from '../utils/localStorage';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>(''); // State untuk kata kunci pencarian
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set()); // Track selected products
  const productsPerPage = 8;

  const handleDelete = (id: number) => {
    deleteProduct(id);
    // Refresh the product list after deletion
    window.location.reload();
  };

  // Handle multiple product deletion with confirmation
  const handleMultipleDelete = () => {
    if (window.confirm('Are you sure you want to delete the selected products?')) {
      selectedProducts.forEach((productId) => {
        deleteProduct(productId); // Delete each selected product
      });
      // Refresh the product list after deletion
      window.location.reload();
    }
  };

  // Toggle selection of product
  const toggleSelectProduct = (id: number) => {
    const newSelectedProducts = new Set(selectedProducts);
    if (newSelectedProducts.has(id)) {
      newSelectedProducts.delete(id);
    } else {
      newSelectedProducts.add(id);
    }
    setSelectedProducts(newSelectedProducts);
  };

  // Filter produk berdasarkan semua kata kunci (nama, harga, kategori)
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Menghitung indeks produk yang akan ditampilkan pada halaman aktif
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Menghitung total halaman
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Menangani perubahan halaman
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <h2 className="font-bold py-4">Product List</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full sm:w-1/2"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
          {/* Delete Selected Button */}
          {selectedProducts.size > 0 && (
            <div className="mb-4">
              <button
                onClick={handleMultipleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete Selected
              </button>
            </div>
          )}

          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border border-gray-300 text-center">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        // Select all products
                        setSelectedProducts(new Set(currentProducts.map(product => product.id)));
                      } else {
                        // Deselect all products
                        setSelectedProducts(new Set());
                      }
                    }}
                    checked={selectedProducts.size === currentProducts.length}
                  />
                </th>
                <th className="py-2 px-4 border border-gray-300 text-center">Product Name</th>
                <th className="py-2 px-4 border border-gray-300 text-center">Price</th>
                <th className="py-2 px-4 border border-gray-300 text-center">Category</th>
                <th className="py-2 px-4 border border-gray-300 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border border-gray-300 text-center">
                    <input
                      type="checkbox"
                      checked={selectedProducts.has(product.id)}
                      onChange={() => toggleSelectProduct(product.id)}
                    />
                  </td>
                  <td className="py-2 px-4 border border-gray-300">{product.name}</td>
                  <td className="py-2 px-4 border border-gray-300">{product.price}</td>
                  <td className="py-2 px-4 border border-gray-300">{product.category}</td>
                  <td className="py-2 px-4 border border-gray-300">
                    <button onClick={() => onEdit(product)} className="bg-blue-500 text-white px-5 py-1 rounded hover:bg-blue-600">Edit</button>
                    <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-3 py-1 rounded ml-2 hover:bg-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-l"
            >
              Prev
            </button>
            <span className="px-4 py-2">{currentPage} / {totalPages}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-r"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
