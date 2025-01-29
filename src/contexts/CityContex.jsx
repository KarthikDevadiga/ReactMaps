// 1 create  context using createContext
// 2 provide context value
// 3 use context using custome hook

import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
const CitiesProvider = createContext();

function CityContext({ children }) {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      const res = await fetch("http://localhost:8000/cities");
      const data = await res.json();
      setCities(data);
    }
    fetchCities();
  }, []);

  async function fetchCity(id) {
    const res = await fetch(`http://localhost:8000/cities/${id}`);
    const data = await res.json();
    setCurrentCity(data);
  }

  return (
    <CitiesProvider.Provider value={{ cities, fetchCity, currentCity }}>
      {children}
    </CitiesProvider.Provider>
  );
}

function useCities() {
  const citiesValue = useContext(CitiesProvider);
  return citiesValue;
}

CityContext.propTypes = {
  children: PropTypes.element.isRequired,
};

export { CityContext, useCities };
