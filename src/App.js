
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./productList";
import ProductForm from "./productForm";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h1>Electronics Product Catalog</h1>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<ProductForm />} />
          <Route path="/edit/:id" element={<ProductForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
