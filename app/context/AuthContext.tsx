import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (dni: string, password: string) => Promise<any>;
  onLogin?: (dni: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "access";
export const API_URL = "http://localhost:8000/";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({ children }: any) => {
  //state
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log("stored:", token);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    };
    loadToken();
  }, []);

  const register = async (dni: string, password: string) => {
    try {
      return await axios.post(`${API_URL}accounts/register`, {
        dni,
        password,
      });
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const login = async (dni: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}accounts/login/`, {
        dni,
        password,
      });
      //console.log('response:',response)
      setAuthState({
        token: response.data.access,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer${response.data.access}`;
      await SecureStore.setItemAsync(TOKEN_KEY, response.data.access);
      return response;
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };
  const logout = async () => {
    //Delete token
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    //Update HTTP Headers
    axios.defaults.headers.common["Authorization"] = "";
    //Reset auth state
    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
