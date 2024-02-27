import { Button, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ManagmentUsers = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView>
      <Button
        onPress={() => navigation.navigate("Crear usuario")}
        title="Crear usuario"
      />
      <Button
        onPress={() => navigation.navigate("Ver Usuarios")}
        title="Ver Usuarios"
      />
    </SafeAreaView>
  );
};

export default ManagmentUsers;
