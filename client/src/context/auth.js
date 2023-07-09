import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import Notification from "../components/Notification";

const initialState = {
  user: null,
  token: null,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
    initialState.token = localStorage.getItem("jwtToken");
  }
}

const AuthContext = createContext({
  user: null,
  token: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        token: action.payload.token,
      };
    case "LOGOUT":
      toast.success(<Notification text={"logged Out"} />);
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return {
        ...state,
        user: null,
        token: null,
      };
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }
  function logout() {
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        login,
        logout,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
