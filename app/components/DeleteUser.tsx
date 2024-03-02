import { View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { instance } from "../../utils/constants/AxiosIntance";
import tw from "twrnc";
const DeleteUser = ({ id, navigation }: { id: any; navigation: any }) => {
  const handleUserDelete = async () => {
    try {
      await instance.delete(`accounts/delete/${id}/`);
      alert("Usuario eliminado con éxito");
      navigation.navigate("Panel de usuarios");
    } catch (error) {
      alert("Hubo un error al eliminar el usuario");
      console.error("Error al eliminar usuario:", error);
    }
  };
  return (
    <View>
      <TouchableOpacity
        style={tw`bg-red-500 rounded-md px-3 py-1`}
        onPress={() => {
          Alert.alert(
            "Confirmación",
            "¿Estás seguro de que quieres eliminar este usuario?",
            [
              {
                text: "Cancelar",
                style: "cancel",
              },
              { text: "Eliminar", onPress: handleUserDelete },
            ]
          );
        }}
      >
        <Feather name="trash-2" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default DeleteUser;
