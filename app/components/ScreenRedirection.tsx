import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserScreen } from "../screens/UserScreen";
import AdminScreen from "../screens/AdminScreen";
import JWT from "expo-jwt";
import { TOKEN_KEY, useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { JWTBody } from "expo-jwt/dist/types/jwt";
const Stack = createNativeStackNavigator();

export const ScreenRedirection = () => {
  const { authState } = useAuth();
  const token = authState?.token;
  const [decodedToken,setDecodedToken] = useState<JWTBody>()

  useEffect(() => {
    const decodeToken = () => {
      if (token) {
        const decodedToken =JWT.decode(token, TOKEN_KEY, { timeSkew: 30 })
        setDecodedToken(decodedToken)
      }
    };
    decodeToken();
  }, [token]);

  const isAdmin = decodedToken?.is_staff
  return (
    <Stack.Navigator>
      {isAdmin ? (
        <Stack.Screen name="Admin" component={AdminScreen}></Stack.Screen>
      ) : (
        <Stack.Screen name="User" component={UserScreen}></Stack.Screen>
      )}
    </Stack.Navigator>
  );
};
