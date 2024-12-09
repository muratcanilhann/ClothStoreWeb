import { useState, createContext, useEffect, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(sessionStorage.getItem('user'));
    const savedToken = sessionStorage.getItem('token');

    if (savedUser && savedToken) {
      setUser(savedUser);
      setToken(savedToken);
      setLoggedIn(true);
    }
  }, []);

  const login = (data, token) => {
    sessionStorage.setItem('user', JSON.stringify(data.user));
    sessionStorage.setItem('token', token);
    setUser(data.user);
    setToken(token);
    setLoggedIn(true);
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    setUser(null);
    setToken(null);
    setLoggedIn(false);
  };

  const values = {
    loggedIn,
    user,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export {
  AuthProvider,
  useAuth,
};
