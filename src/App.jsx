import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Form from "./coponents/Form";
import AppLayout from "./pages/AppLayout";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import CityList from "./coponents/cityList";
import CountryList from "./coponents/CountryList";
import City from "./coponents/City";

function App() {
  const [cities, setCities] = useState([]);

  useEffect(function () {
    async function fetchCities() {
      const res = await fetch("http://localhost:8000/cities");
      const data = await res.json();
      setCities(data);
    }
    fetchCities();
  }, []);

  return (
    <>
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="app" element={<AppLayout cities={cities} />}>
            <Route index element={<Navigate replace to={"cities"} />} />
            <Route path="cities" element={<CityList cities={cities} />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList cities={cities} />} />
            <Route path="form" element={<Form />} />
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
