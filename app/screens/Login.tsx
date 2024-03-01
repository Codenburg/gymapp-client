import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
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
    <View style={tw`flex-1 justify-center px-6 py-12 lg:px-8 bg-white`}>
      <View style={tw`sm:mx-auto sm:w-full sm:max-w-sm`}>
        <Text style={tw`text-center text-3xl font-bold text-gray-900 mb-8`}>
          Iniciar Sesión
        </Text>
        <View>
          <TextInput
            style={tw`border border-gray-300 rounded-md mb-4 px-4 py-3 text-lg text-gray-900`}
            placeholder="DNI"
            onChangeText={(number: string) => setDni(number)}
            value={dni}
            keyboardType="numeric"
          />
          <TextInput
            style={tw`border border-gray-300 rounded-md mb-4 px-4 py-3 text-lg text-gray-900`}
            placeholder="Contraseña"
            onChangeText={(pass: string) => setPassword(pass)}
            secureTextEntry={true}
          />
          <TouchableOpacity
            onPress={login}
            style={tw`shadow bg-blue-500 py-2 px-4 rounded items-center mt-2`}
          >
            <Text style={tw`text-center text-white text-lg`}>Ingresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
