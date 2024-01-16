import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

//Interfaz de autententicacion
interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (dni: string, password: string) => Promise<any>;
  onLogin?: (dni: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}
//Clave para almacenar y recuperar el access_token en SecureStore
const TOKEN_KEY = "access";
export const API_URL = "http://localhost:8000/";

//Contexto con la interfaz definida
const AuthContext = createContext<AuthProps>({});

//Hook que utiliza useContext para acceder al contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};
//Componente proveedor de contexto que envuelve la aplicación y proporciona funciones de autenticación y estado
export const AuthProvider = ({ children }: any) => {
  //Estado para almacenar el token y el estado de autenticación
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });
  // Efecto para cargar el token almacenado al montar el componente
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
      // Establecer el estado de autenticación y configurar el encabezado de autorización de Axios
      setAuthState({
        token: response.data.access,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer${response.data.access}`;
      // Almacenar el token de acceso de forma segura
      await SecureStore.setItemAsync(TOKEN_KEY, response.data.access);
      return response;
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
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
      token: null,
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
