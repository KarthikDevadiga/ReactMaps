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
import { CityContext } from "./contexts/CityContex";

function App() {
  return (
    <>
      <CityContext>
        <BrowserRouter future={{ v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="app" element={<AppLayout />}>
              <Route index element={<Navigate replace to={"cities"} />} />
              <Route path="cities" element={<CityList c />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
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
      </CityContext>
    </>
  );
}

export default App;
