import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const intialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "user/login":
      return {
        ...state,
        user: action.payLoad,
        isAuthenticated: true,
      };
    case "user/logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("What's wrong now !!?");
  }
}

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    intialState
  );

  function login(userCred) {
    if (
      userCred.email === FAKE_USER.email &&
      userCred.password === FAKE_USER.password
    ) {
      const user = {
        name: "jack",
        email: userCred.email,
        password: userCred.password,
        avatar: "https://i.pravatar.cc/100?u=zz",
      };
      dispatch({ type: "user/login", payLoad: user });
      console.log("user logied in");
    }
  }

  function logOut() {
    dispatch({ type: "user/logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const authContext = useContext(AuthContext);
  if (authContext === null) return;
  return authContext;
}

export { AuthProvider, useAuth };
