import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import FormPage from "./components/FormPage";
import DisplayPage from "./components/DisplayPage";

function App() {
  const [theme, setTheme] = useState("dark");
  const [products, setProducts] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <FormPage
              theme={theme}
              setTheme={setTheme}
              setProducts={setProducts}
              products={products}
            />
          }
        />
        <Route
          path="/display"
          element={
            <DisplayPage
              theme={theme}
              products={products}
              setProducts={setProducts}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
