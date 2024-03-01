import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserScreen } from "../screens/UserScreen";
import AdminScreen from "../screens/admin/AdminScreen";
import JWT from "expo-jwt";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { JWTBody } from "expo-jwt/dist/types/jwt";
import { Button } from "react-native";
import UserPanel from "./UserPanel";
import CreateUser from "../screens/admin/CreateUser";
import { TOKEN_KEY } from "../../utils/constants/Keys";
import ListUsers from "../screens/admin/ListUsers";
import DetailUser from "../screens/admin/DetailUser";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { authState, onLogout } = useAuth();
  const token = authState?.accessToken;
  const [decodedToken, setDecodedToken] = useState<JWTBody>();

  useEffect(() => {
    const decodeToken = () => {
      if (token) {
        const decodedToken = JWT.decode(token, TOKEN_KEY, { timeSkew: 30 });
        setDecodedToken(decodedToken);
      }
    };
    decodeToken();
  }, [token]);

  const isAdmin = decodedToken?.is_staff;
  const user_name = decodedToken?.user_name;
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#3182CE",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {isAdmin ? (
        <>
          <Stack.Screen
            name={user_name}
            component={AdminScreen}
            options={{
              headerRight: () => (
                <Button
                  onPress={onLogout}
                  title="Cerrar Sesión"
                  color="#1D4C79"
                />
              ),
              headerLeft: () => (
                <Feather
                  name="user"
                  size={24}
                  color="#FFFFFF"
                  style={tw`mr-2`}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Panel de usuarios"
            component={UserPanel}
            options={{
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="Crear usuario"
            component={CreateUser}
            options={{
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="Ver Usuarios"
            component={ListUsers}
            options={{
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="Detalles del usuario"
            component={DetailUser}
            options={{
              headerTitleAlign: "center",
            }}
            initialParams={{ id: null }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Usuario"
          component={UserScreen}
          options={{
            headerRight: () => (
              <Button
                onPress={onLogout}
                title="Cerrar Sesión"
                color="#1D4C79"
              />
            ),
          }}
        />
      )}
    </Stack.Navigator>
  );
};
