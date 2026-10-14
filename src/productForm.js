
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const API = "https://worksheet-catalogue.mashupstack.com/products";

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    quantity: ""
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`${API}/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.log("Error fetching product", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: product.name,
      price: Number(product.price),
      category: product.category,
      quantity: Number(product.quantity)
    };

    try {
      if (id) {
        await axios.put(`${API}/${id}`, data);
        alert("Product updated successfully");
      } else {
        await axios.post(API, data);
        alert("Product added successfully");
      }

      navigate("/");
    } catch (error) {
      console.log("Error saving product", error);
      alert("Could not save product");
    }
  };

  return (
    <div>
      <h2>{id ? "Edit Product" : "Add Product"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={product.quantity}
          onChange={handleChange}
          min="0"
          step="1"
          required
        />

        <button type="submit">
          {id ? "Update Product" : "Add Product"}
        </button>

        <Link to="/">
          <button type="button">Cancel</button>
        </Link>
      </form>
    </div>
  );
}

export default ProductForm;
