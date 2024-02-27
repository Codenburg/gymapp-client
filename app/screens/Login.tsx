import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import tw from "twrnc";

const Login = () => {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = useAuth();

  const login = async () => {
    await onLogin!(dni, password);
  };

  return (
    <View
      style={tw`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8`}
    >
      <View style={tw`sm:mx-auto sm:w-full sm:max-w-sm`}>
        <Text
          style={tw`mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900`}
        >
          Iniciar Sesion
        </Text>
        <View style={tw`mt-10 sm:mx-auto sm:w-full sm:max-w-sm`}>
          <TextInput
            style={tw`border border-opacity-75 rounded-md mb-2 p-1.5 py-1.5 text-sm font-medium text-gray-900`}
            placeholder="DNI"
            onChangeText={(number: string) => setDni(number)}
            value={dni}
            keyboardType="numeric"
          />
          <TextInput
            style={tw`border border-opacity-75 rounded-md mb-2 p-1.5 py-1.5 text-sm font-medium text-gray-900`}
            placeholder="Contraseña"
            onChangeText={(pass: string) => setPassword(pass)}
            secureTextEntry={true}
          />
          <Button onPress={login} title="Ingresar" />
        </View>
      </View>
    </View>
  );
};

export default Login;
