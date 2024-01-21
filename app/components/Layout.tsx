import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "../context/AuthContext";
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
            name="Gym app"
            component={ScreenRedirection}
            options={{
              headerRight: () => <Button onPress={onLogout} title="Sign Out" />,
            }}
          ></Stack.Screen>
        ) : (
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
