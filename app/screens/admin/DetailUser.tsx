import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { User } from "../../../utils/interfaces/User";
import { instance } from "../../../utils/constants/AxiosIntance";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";
import DeleteUser from "../../components/DeleteUser";
import EditUSer from "../../components/EditUserForm";

const DetailUser = ({ navigation, route }: { navigation: any; route: any }) => {
  const [user, setUser] = useState<User>();
  const [isEditing, setIsEditing] = useState(false);
  const { id } = route.params;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await instance.get(`accounts/edit/${id}`);
      setUser(response.data);
    };
    fetchUser();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // Validar campos (ejemplo: nombre no puede estar vacío)
      if (!user) {
        alert("El nombre no puede estar vacío");
        return;
      }
      // Crear objeto con campos actualizados
      const updatedFields = {
        name: user.name,
        last_name: user.last_name,
        dni: user.dni,
        email: user.email,
      };

      // Enviar solicitud PUT solo con campos actualizados
      await instance.put(`accounts/edit/${id}/`, updatedFields);

      // Finalizar edición y mostrar mensaje de éxito
      setIsEditing(false);
      alert("Usuario editado con éxito!");
    } catch (error) {
      // Manejar error de manera adecuada
      alert("Hubo un error al editar el usuario");
      console.log("Error al editar usuario:", error);
    }
  };

  if (!user) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <Text style={tw`text-lg`}>Cargando...</Text>
      </View>
    );
  }
  return (
    <View style={tw`bg-white rounded-lg shadow-md p-4`}>
      {isEditing ? (
        <EditUSer user={user} setUser={setUser} handleSave={handleSave} />
      ) : (
        <>
          <Text style={tw`text-lg font-bold mb-2`}>
            {user.name} {user.last_name}
          </Text>
          <Text style={tw`text-gray-600 mb-2`}>DNI: {user.dni}</Text>
          <Text style={tw`text-gray-600 mb-2`}>Email: {user.email}</Text>
          <View style={tw`flex-row`}>
            <TouchableOpacity
              style={tw`bg-blue-500 rounded-md px-3 py-1 mr-2`}
              onPress={handleEdit}
            >
              <Feather name="edit" size={24} color="white" />
            </TouchableOpacity>
            <DeleteUser id={id} navigation={navigation} />
          </View>
        </>
      )}
    </View>
  );
};
export default DetailUser;
