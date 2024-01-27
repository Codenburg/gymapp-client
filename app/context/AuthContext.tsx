import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import JWT from "expo-jwt";

//Interfaz de autententicacion
interface AuthProps {
  authState?: {
    accessToken: string | null;
    refreshToken: string | null;
    authenticated: boolean | null;
  };
  onRegister?: (dni: string, password: string) => Promise<any>;
  onLogin?: (dni: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}
//Clave para almacenar y recuperar el access_token en SecureStore
export const TOKEN_KEY =
  "SPwNgifVA2i3Ju3QHS7cwQxJgKhUSXsewD7VF4XgnRzrwFkKYpnYqQU2QNYQXitz4y7DjKCZESvV";
export const API_URL = "http://localhost:8000/";

//Contexto con la interfaz definida
const AuthContext = createContext<AuthProps>({});

//Hook que utiliza useContext para acceder al contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};
//Componente proveedor de contexto que envuelve la aplicación y proporciona funciones de autenticación y estado
export const AuthProvider = ({ children }: any) => {
  //Estado para almacenar los tokens y el estado de autenticación
  const [authState, setAuthState] = useState<{
    accessToken: string | null;
    refreshToken: string | null;
    authenticated: boolean | null;
  }>({
    accessToken: null,
    refreshToken: null,
    authenticated: null,
  });
  // Efecto para cargar el token almacenado al montar el componente
  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    };
    loadToken();
  }, []);

  // Función para realizar el registro de usuario
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
  // Función para realizar el inicio de sesión
  const login = async (dni: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}accounts/login/`, {
        dni,
        password,
      });
      const access = response.data.access;
      const refresh = response.data.refresh;
      console.log("access:", access);
      console.log("refresh:", refresh);
      handleAuthentication(access, refresh);
    } catch (error) {
      logout();
    }
  };

  const handleAuthentication = async (
    accessToken: string,
    refrehToken: string
  ) => {
    setAuthState({
      accessToken: accessToken,
      refreshToken: refrehToken,
      authenticated: true,
    });

    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    if (authState.accessToken) {
      const shouldRefresh = shouldRefreshToken(authState.accessToken);
      if (shouldRefresh) {
        await refreshAccessToken(refrehToken);
      }
    }

    // Almacenar el token de acceso de forma segura
    await SecureStore.setItemAsync(TOKEN_KEY, accessToken);
    await SecureStore.setItemAsync(TOKEN_KEY, refrehToken);
  };

  const shouldRefreshToken = (token: string) => {
    const decodedToken = JWT.decode(token, TOKEN_KEY, { timeSkew: 30 });
    const expiration = new Date(decodedToken.exp * 1000);
    const now = new Date();
    const fiveMin = 1000 * 60 * 5;
    return expiration.getTime() - now.getTime() < fiveMin;
  };

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      const refreshResponse = await axios.post(`${API_URL}accounts/refresh/`, {
        refreshToken,
      });
      const newAccess = refreshResponse.data.access;
      const newRefresh = refreshResponse.data.refresh;

      setAuthState({
        accessToken: newAccess,
        refreshToken: newRefresh,
        authenticated: true,
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
    } catch (error) {
      logout();
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    // Eliminar el token almacenado de forma segura
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    // Actualizar los encabezados HTTP
    axios.defaults.headers.common["Authorization"] = "";
    // Restablecer el estado de autenticación
    setAuthState({
      accessToken: null,
      refreshToken:null,
      authenticated: false,
    });
  };

  // Valor del contexto con funciones de autenticación y estado actual
  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };
  // Proporcionar el valor del contexto a través del proveedor de contexto
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
