import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import "./DisplayPage.css";

const DisplayPage = ({ products, setProducts, theme }) => {

  // Fetch products from backend on mount (optional enhancement)
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      } else {
        console.error("Failed to delete product.");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleUpdate = async (updatedProduct) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${updatedProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      if (res.ok) {
        const data = await res.json();
        setProducts((prev) =>
          prev.map((p) => (p.id === data.id ? data : p))
        );
      } else {
        console.error("Failed to update product.");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className={`display-page ${theme}`}>
      <h2>Submitted Products</h2>
      <div className="product-list">
        {products.length === 0 ? (
          <p>No products submitted yet.</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              theme={theme}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DisplayPage;
