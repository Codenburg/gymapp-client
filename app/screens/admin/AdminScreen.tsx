import React from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";

const AdminScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={tw`flex-1 justify-center items-center bg-white`}>
      <Feather name="shield" size={100} color="#3182CF" style={tw`mb-8`} />
      <Text style={tw`text-4xl font-bold mb-6 text-blue-600`}>
        Administrador
      </Text>
      <View style={tw`w-11/12`}>
        <Text style={tw`font-bold text-lg mb-4 text-gray-800`}>Navegación</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Panel de usuarios")}
          style={tw`flex-row shadow bg-blue-500 py-2 px-4 rounded items-center mt-2`}
        >
          <Feather name="settings" size={24} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white text-lg`}>Gestionar Usuarios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdminScreen;
