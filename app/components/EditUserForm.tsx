import { Text, TextInput, TouchableOpacity } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { User } from "../../utils/interfaces/User";
import tw from "twrnc";

interface UserFormProps {
  user: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  handleSave: () => void;
}
const EditUSer = ({ user, setUser, handleSave }: UserFormProps) => {
  const textStyle = tw`text-lg text-gray-600 mb-2 border-b-2 border-gray-300`;
  const headerTextStyle = tw`text-lg font-bold mb-2 border-b-2 border-gray-300`;
  return (
    <>
      <TextInput
        style={headerTextStyle}
        placeholder="Nombre"
        value={user.name}
        onChangeText={(text) => setUser({ ...user, name: text })}
      />
      <TextInput
        style={headerTextStyle}
        placeholder="Apellido"
        value={user.last_name}
        onChangeText={(text) => setUser({ ...user, last_name: text })}
      />
      <TextInput
        style={textStyle}
        placeholder="DNI"
        value={user.dni ? user.dni.toString() : ""}
        onChangeText={(text) => setUser({ ...user, dni: parseInt(text) })}
        keyboardType="numeric"
      />
      <TextInput
        style={textStyle}
        placeholder="Email"
        value={user.email}
        onChangeText={(text) => setUser({ ...user, email: text })}
        keyboardType="email-address"
      />
      <TouchableOpacity
        style={tw`bg-green-500 rounded-md px-4 py-2 mr-2`}
        onPress={handleSave}
      >
        <Text style={tw`text-white font-bold`}>Guardar cambios</Text>
      </TouchableOpacity>
    </>
  );
};

export default EditUSer;
