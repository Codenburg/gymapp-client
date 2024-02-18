//Interfaz de autententicacion
export interface AuthProps {
    authState?: {
      accessToken: string | null;
      refreshToken: string | null;
      authenticated: boolean | null;
    };
    onRegister?: (
      dni: string,
      name: string,
      last_name: string,
      email: string,
      password: string
    ) => Promise<any>;
    onLogin?: (dni: string, password: string) => Promise<any>;
    onLogout?: () => void;
  }