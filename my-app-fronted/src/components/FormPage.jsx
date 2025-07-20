import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormPage.css";

const FormPage = ({ theme, setTheme, products, setProducts }) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    releaseDate: "",
    available: false,
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const form = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    if (value !== null) {
      form.append(key, value);
    }
  });

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: "POST",
      body: form,
    });

    if (!response.ok) {
      throw new Error("Failed to add product");
    }

    const savedProduct = await response.json();

    setProducts((prev) => [...prev, savedProduct]);
    setFormData({
      name: "",
      brand: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      releaseDate: "",
      available: false,
      image: null,
    });
    navigate("/display");

  } catch (error) {
    console.error("Error submitting product:", error);
    alert("Something went wrong. Please try again.");
  }
};


  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className={`form-page ${theme}`}>
      <div className="theme-toggle">
        <button onClick={toggleTheme}>
          {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
        </button>
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Add Product</h2>
        <div className="form-row">
          <input type="text" name="name" value={formData.name} placeholder="Name" onChange={handleChange} required />
          <input type="text" name="brand" value={formData.brand} placeholder="Brand" onChange={handleChange} required />
        </div>
        <textarea name="description" value={formData.description} placeholder="Add product description" onChange={handleChange} />
        <div className="form-row">
          <input type="text" name="price" value={formData.price} placeholder="Eg: $1000" onChange={handleChange} required />
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select category</option>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
            <option value="Tablet">Tablet</option>
          </select>
        </div>
        <div className="form-row">
          <input type="text" name="stock" value={formData.stock} placeholder="Stock Remaining" onChange={handleChange} />
          <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleChange} />
        </div>
        <div className="form-row file-row">
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
          
        </div>
        <div className="form-row">
          <label>
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />
            Available
          </label>
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default FormPage;
