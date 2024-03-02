import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import JWT from "expo-jwt";
import { AuthProps } from "../../utils/interfaces/AuthProps";
import { TOKEN_KEY } from "../../utils/constants/Keys";
import { instance } from "../../utils/constants/AxiosIntance";

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
  // Cargar el token almacenado al montar el componente
  const loadToken = async () => {
    const [access, refresh] = await Promise.all([
      SecureStore.getItemAsync("access"),
      SecureStore.getItemAsync("refresh"),
    ]);
    console.log("access stored:", access);
    console.log("refresh stored", refresh);
    try {
      if (access && refresh) {
        const shouldRefresh = shouldRefreshToken(access);
        if (shouldRefresh) {
          await refreshAccessToken(refresh);

          const [newAccess, newRefresh] = await Promise.all([
            SecureStore.getItemAsync("access"),
            SecureStore.getItemAsync("refresh"),
          ]);

          if (newAccess && newRefresh) {
            instance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newAccess}`;
            setAuthState({
              accessToken: newAccess,
              refreshToken: newRefresh,
              authenticated: true,
            });
          }
        } else {
          instance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${access}`;
          setAuthState({
            accessToken: access,
            refreshToken: refresh,
            authenticated: true,
          });
        }
      }
    } catch (error) {
      alert("Sesion Expirada");
      logout();
    }
  };

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const access = await SecureStore.getItemAsync("access");
      if (access) {
        const shouldRefresh = shouldRefreshToken(access);
        if (shouldRefresh) {
          await loadToken();
        }
      }
    };
    const intervalId = setInterval(() => {
      checkTokenExpiration();
    }, 60000); // Verificar cada minuto

    return () => clearInterval(intervalId);
  }, [setAuthState]);

  useEffect(() => {
    const loadInitialToken = async () => {
      await loadToken(); // Cargar los tokens al inicio
    };
    loadInitialToken();
  }, [setAuthState]);

  const register = async (
    dni: string,
    name: string,
    last_name: string,
    email: string,
    password: string
  ) => {
    try {
      // Realizar la solicitud HTTP utilizando axios
      const response = await instance.post("accounts/register/", {
        dni,
        name,
        last_name,
        email,
        password,
      });

      // Devolver los datos de la respuesta si la solicitud es exitosa
      return response.data;
    } catch (error) {
      if (error.response) {
        return { error: error.response.data };
      } else if (error.request) {
        return { error: "No se recibió respuesta del servidor." };
      } else {
        return { error: error.message };
      }
    }
  };

  const login = async (dni: string, password: string) => {
    try {
      const response = await instance.post("accounts/login/", {
        dni,
        password,
      });
      const access = response.data.access;
      const refresh = response.data.refresh;
      handleAuthentication(access, refresh);
    } catch (error) {
      alert(error.response.data.detail);
      logout();
    }
  };

  const handleAuthentication = async (access: string, refresh: string) => {
    setAuthState({
      accessToken: access,
      refreshToken: refresh,
      authenticated: true,
    });
    await SecureStore.setItemAsync("access", access);
    await SecureStore.setItemAsync("refresh", refresh);
    axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    await loadToken();
  };

  // Almacenar el token de acceso de forma segura

  const shouldRefreshToken = (token: string) => {
    const decodedToken = JWT.decode(token, TOKEN_KEY, { timeSkew: 30 });
    if (typeof decodedToken.exp === "number") {
      const expiration = new Date(decodedToken.exp * 1000);
      const now = new Date().getTime();
      const timeRemaining = expiration.getTime() - now;
      return timeRemaining < 1000 * 60 * 1;
    }
    return false;
  };

  const refreshAccessToken = async (refreshToken: string | null) => {
    try {
      const response = await instance.post("accounts/refresh/", {
        refresh: refreshToken,
      });
      await Promise.all([
        SecureStore.deleteItemAsync("access"),
        SecureStore.setItemAsync("access", response.data.access),
      ]);
    } catch (error) {
      logout();
      console.log("error al refrescar el token:", error);
      //error al refrescar el token: [Error: Invalid value provided to SecureStore. Values must be strings; consider JSON-encoding your values if they are serializable.]
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    // Eliminar el token almacenado de forma segura
    await SecureStore.deleteItemAsync("access");
    await SecureStore.deleteItemAsync("refresh");
    // Actualizar los encabezados HTTP
    instance.defaults.headers.common["Authorization"] = "";
    // Restablecer el estado de autenticación
    setAuthState({
      accessToken: null,
      refreshToken: null,
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
