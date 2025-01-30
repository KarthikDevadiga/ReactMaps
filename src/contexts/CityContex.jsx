// 1 create  context using createContext
// 2 provide context value
// 3 use context using custome hook

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import PropTypes from "prop-types";
const CitiesProvider = createContext();

const intialState = { cities: [], currentCity: {} };

function reducer(state, action) {
  switch (action.type) {
    case "cities/loading":
      return { ...state, cities: action.payload };

    case "city/loaded":
      return {
        ...state,
        currentCity: action.payload,
      };

    case "city/create":
      return {
        ...state,
        cities: [...state.cities, action.payload],
      };

    case "city/delete":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    default:
      throw new Error("Sometjing went wrong");
  }
}

function CityContext({ children }) {
  // const [cities, setCities] = useState([]);
  // const [currentCity, setCurrentCity] = useState({});

  const [{ cities, currentCity }, dispatch] = useReducer(reducer, intialState);

  useEffect(function () {
    async function fetchCities() {
      const res = await fetch("http://localhost:8000/cities");
      const data = await res.json();

      // loading cities
      dispatch({ type: "cities/loading", payload: data });
    }
    fetchCities();
  }, []);

  async function fetchCity(id) {
    const res = await fetch(`http://localhost:8000/cities/${id}`);
    const data = await res.json();
    dispatch({ type: "city/loaded", payload: data });
  }

  async function postCity(newCity) {
    const res = await fetch(`http://localhost:8000/cities`, {
      method: "POST",
      body: JSON.stringify(newCity),
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "city/create", payload: newCity });
  }

  async function deleteCity(id) {
    const res = await fetch(`http://localhost:8000/cities/${id}`, {
      method: "DELETE",
    });
    dispatch({ type: "city/delete", payload: id });
  }

  return (
    <CitiesProvider.Provider
      value={{ cities, fetchCity, currentCity, postCity, deleteCity }}
    >
      {children}
    </CitiesProvider.Provider>
  );
}

function useCities() {
  const citiesValue = useContext(CitiesProvider);
  if (!citiesValue) {
    throw new Error("useCities must be used within a CityContext.Provider");
  }
  return citiesValue;
}

CityContext.propTypes = {
  children: PropTypes.element.isRequired,
};

export { CityContext, useCities };
