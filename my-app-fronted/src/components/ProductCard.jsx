import React, { useState } from "react";
import "./ProductCard.css";

const ProductCard = ({ product, onDelete, onUpdate, theme }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(updatedProduct);
    setIsEditing(false);
  };

  return (
    <div className={`product-card ${theme}`}>
      <img
        src={product.image || "https://via.placeholder.com/280x180"}
        alt={product.name}
        className="product-image"
      />

      {isEditing ? (
        <>
          <input type="text" name="name" value={updatedProduct.name} onChange={handleChange} />
          <input type="text" name="brand" value={updatedProduct.brand} onChange={handleChange} />
          <textarea name="description" value={updatedProduct.description} onChange={handleChange} />
          <input type="text" name="category" value={updatedProduct.category} onChange={handleChange} />
          <input type="number" name="price" value={updatedProduct.price} onChange={handleChange} />
        </>
      ) : (
        <>
          <h3>{product.name}</h3>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
        </>
      )}

      <div className="btn-group">
        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Update</button>
            <button onClick={() => onDelete(product.id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
