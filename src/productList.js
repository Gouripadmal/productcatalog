
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "https://worksheet-catalogue.mashupstack.com/products";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const getProducts = async () => {
    try {
      const response = await axios.get(API);
      setProducts(response.data);
    } catch (error) {
      console.log("Error fetching products", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${API}/${id}`);
        getProducts();
      } catch (error) {
        console.log("Error deleting product", error);
      }
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search product by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Link to="/add">
        <button>Add Product</button>
      </Link>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>₹{product.price}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td>
                <Link to={`/edit/${product.id}`}>
                  <button>Edit</button>
                </Link>

                <button onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredProducts.length === 0 && <p>No products found.</p>}
    </div>
  );
}

export default ProductList;
