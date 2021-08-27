import React, { useState, createContext, useContext } from "react";

const AuthContext = createContext({ user: null });

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const useAuthContext = useContext(AuthContext);
  return useAuthContext;
};

export default AuthContextProvider;
export { useAuthContext };
