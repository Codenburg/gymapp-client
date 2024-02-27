import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserScreen } from "../screens/UserScreen";
import AdminScreen from "../screens/admin/AdminScreen";
import JWT from "expo-jwt";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { JWTBody } from "expo-jwt/dist/types/jwt";
import { Button } from "react-native";
import ManagmenteUsers from "../screens/admin/ManagmentUsers";
import CreateUser from "../screens/admin/CreateUser";
import { TOKEN_KEY } from "../../utils/constants/Keys";
import ListUsers from "../screens/admin/ListUsers";
const Stack = createNativeStackNavigator();

export const ScreenRedirection = () => {
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
  return (
    <Stack.Navigator>
      {isAdmin ? (
        <>
          <Stack.Screen
            name="Admin"
            component={AdminScreen}
            options={{
              headerRight: () => (
                <Button onPress={onLogout} title="Cerrar Sesion" />
              ),
            }}
          />
          <Stack.Screen name="Panel de usuarios" component={ManagmenteUsers} />
          <Stack.Screen name="Crear usuario" component={CreateUser} />
          <Stack.Screen name="Ver Usuarios" component={ListUsers} />
        </>
      ) : (
        <Stack.Screen
          name="User"
          component={UserScreen}
          options={{
            headerRight: () => (
              <Button onPress={onLogout} title="Cerrar Sesion" />
            ),
          }}
        ></Stack.Screen>
      )}
    </Stack.Navigator>
  );
};
