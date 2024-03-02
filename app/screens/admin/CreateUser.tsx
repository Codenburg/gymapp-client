import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import tw from "twrnc";

const CreateUser = ({ navigation }: { navigation: any }) => {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { onRegister } = useAuth();

  const register = async () => {
    try {
      const response = await onRegister!(
        dni,
        userName,
        lastName,
        email,
        password
      );
      if (response && response.error) {
        return alert("Datos incorrectos");
      } else if (response) {
        alert("Usuario creado con exito!");
        navigation.navigate("Panel de usuarios");
      }
    } catch (error) {
      alert("Error de red. Por favor, inténtalo de nuevo más tarde.");
    }
  };
  const inputStyle = tw`border border-gray-300 rounded-lg mb-4 px-4 py-3 text-lg text-gray-900`;
  return (
    <SafeAreaView style={tw`flex-1 justify-center px-6 py-12 lg:px-8 bg-white`}>
      <View style={tw`sm:mx-auto sm:w-full sm:max-w-sm`}>
        <Text style={tw`text-3xl font-bold mb-8 text-gray-900 text-center`}>
          Crear usuario
        </Text>
        <TextInput
          style={inputStyle}
          placeholder="DNI"
          value={dni}
          onChangeText={(number: string) => setDni(number)}
          keyboardType="numeric"
        />
        <TextInput
          style={inputStyle}
          placeholder="Nombre"
          value={userName}
          onChangeText={(userName: string) => setUserName(userName)}
        />
        <TextInput
          style={inputStyle}
          placeholder="Apellido"
          value={lastName}
          onChangeText={(lastName: string) => setLastName(lastName)}
        />
        <TextInput
          style={inputStyle}
          placeholder="Email"
          value={email}
          onChangeText={(email: string) => setEmail(email)}
        />
        <TextInput
          style={inputStyle}
          placeholder="Contraseña"
          onChangeText={(pass: string) => setPassword(pass)}
          secureTextEntry={true}
        />

        <TouchableOpacity
          onPress={register}
          style={tw`shadow bg-blue-500 py-2 px-4 rounded items-center mt-2`}
        >
          <Text style={tw`text-center text-white text-lg`}>Crear</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateUser;
