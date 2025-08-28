import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuthData = async () => {
      const storedToken = await AsyncStorage.getItem("authToken");
      const storedUser = await AsyncStorage.getItem("user");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }

      setLoading(false);
    };

    loadAuthData();
  }, []);

  const login = async (token, userData) => {
    setToken(token);
    setUser(userData);

    await AsyncStorage.setItem("user", JSON.stringify(userData));
    await AsyncStorage.setItem("authToken", token);
  };


  const logout = async () => {  
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout}}>
      { children }
    </AuthContext.Provider>
  )

};
