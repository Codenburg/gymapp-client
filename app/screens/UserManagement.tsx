import { Button, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserManagement = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView>
      <Button
        onPress={() => navigation.navigate("Crear usuario")}
        title="Crear usuario"
      />
    </SafeAreaView>
  );
};

export default UserManagement;
