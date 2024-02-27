import React, { useState } from "react";
import { Button, SafeAreaView, Text, TextInput, View } from "react-native";
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
      const result = await onRegister!(
        dni,
        userName,
        lastName,
        email,
        password
      );
      if (result && result.error) {
        return alert("Datos incorrectos");
      } else if (result) {
        alert("Usuario creado con exito!");
        navigation.navigate("Panel de usuarios");
      }
    } catch (error) {
      alert("Error de red. Por favor, inténtalo de nuevo más tarde.");
    }
  };
  const inputStyle = tw`border border-opacity-75 rounded-md mb-2 p-1.5 py-1.5 text-sm font-medium text-gray-900`;
  return (
    <SafeAreaView
      style={tw`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8`}
    >
      <View style={tw`sm:mx-auto sm:w-full sm:max-w-sm`}>
        <Text
          style={tw`mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900`}
        >
          Crear usuario
        </Text>
        <View style={tw`mt-10 sm:mx-auto sm:w-full sm:max-w-sm`}>
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

          <Button onPress={register} title="Crear" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateUser;
