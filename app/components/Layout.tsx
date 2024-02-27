import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";
import Login from "../screens/Login";
import { ScreenRedirection } from "../components/ScreenRedirection";

const Stack = createNativeStackNavigator();

export const Layout = () => {
  const { authState, onLogout } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <Stack.Screen
            name="Gymapp"
            component={ScreenRedirection}
            options={{
              headerShown: false,
              headerRight: () => <Button onPress={onLogout} title="Sign Out" />,
            }}
          ></Stack.Screen>
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          ></Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
