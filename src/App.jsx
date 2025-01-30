import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Form from "./coponents/Form";
import SpinnerFullPage from "./coponents/SpinnerFullPage";
import ProtectedRoute from "./coponents/ProtectedRoute";

import CityList from "./coponents/cityList";
import CountryList from "./coponents/CountryList";
import City from "./coponents/City";
import { CityContext } from "./contexts/CityContex";

import { AuthProvider } from "./contexts/AuthContext";

const HomePage = lazy(() => import("./pages/HomePage"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <>
      <CityContext>
        <AuthProvider>
          <BrowserRouter future={{ v7_relativeSplatPath: true }}>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
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
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </CityContext>
    </>
  );
}

export default App;
