import { Button, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { Feather } from "@expo/vector-icons";

const UserPanel = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex-1 justify-center items-center`}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Crear usuario")}
          style={tw`flex-row shadow bg-blue-500 py-2 px-4 rounded items-center mb-2`}
        >
          <Feather name="user-plus" size={24} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white text-lg`}>Crear usuario</Text>
        </TouchableOpacity>
        <View style={tw`h-px bg-gray-300 w-full`} />
        <TouchableOpacity
          onPress={() => navigation.navigate("Ver Usuarios")}
          style={tw`flex-row shadow bg-blue-500 py-2 px-4 rounded items-center mt-2`}
        >
          <Feather name="users" size={24} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white text-lg`}>Ver Usuarios</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserPanel;
