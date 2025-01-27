import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

import AppLayout from "./pages/AppLayout";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<p>cites</p>} />
            <Route path="cities" element={<p>Cities</p>} />
            <Route path="countries" element={<p>Countries</p>} />
            <Route path="Form" element={<p>Form</p>} />
          </Route>
          <Route path="pricing" element={<Pricing />} />
          <Route path="product" element={<Product />} />
          <Route path="login" element={<Login />} />
          <Route
            path="*"
            element={<p style={{ color: "black" }}>404 not found :</p>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
