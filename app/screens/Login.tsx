import { View, Text, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { API_URL, useAuth } from "../context/AuthContext";
import { StyleSheet } from "react-native";
import axios from "axios";

const Login = () => {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, onRegister } = useAuth();

//   useEffect(() => {
//     const testCall = async () => {
//       const result = await axios.post(`${API_URL}accounts/register/`);
//       console.log(result)
//     };
//     testCall();
//   }, []);
  
  const login = async () => {
    const result = await onLogin!(dni, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  const register = async () => {
    const result = await onRegister!(dni, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      login();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="dni"
          onChangeText={(number: string) => setDni(number)}
          value={dni}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Contrasena"
          onChangeText={(pass: string) => setPassword(pass)}
          secureTextEntry={false}
        />
        <Button onPress={login} title="Sign in" />
        <Button onPress={register} title="Create Account" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  form: {},
  input: {},
});

export default Login;
