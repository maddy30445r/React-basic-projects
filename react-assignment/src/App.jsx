import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./Products";
import Missing from "./Missing";
import Navbar from "./Navbar";
import Footer from "./Footer";

function App() {
  return (
    <>
  
    <Navbar></Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="products"></Navigate>}></Route>
          <Route path="products" element={<Product></Product>} />
          <Route path="*" element={<Missing></Missing>} />
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </>
    
  );
}

export default App;
