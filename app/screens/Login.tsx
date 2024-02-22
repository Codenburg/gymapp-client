import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import * as yup from "yup";
import { Formik } from "formik";
import tw from "twrnc";

const Login = () => {
  const { onLogin } = useAuth();

  const loginSchema = yup.object().shape({
    dni: yup.string().required("El DNI es obligatorio"),
    password: yup
      .string()
      .min(7, "La contraseña debe ser entre 7 y 8 caracteres")
      .required("La contraseña es obligatoria"),
  });

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
          <Formik
            initialValues={{ dni: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={async (values) => {
              try {
                const result = await onLogin!(values.dni, values.password);
                if (result && result.error) {
                  return alert("Datos incorrectos");
                }
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
            }) => (
              <>
                <TextInput
                  style={tw`border border-opacity-75 rounded-md mb-2 p-1.5 py-1.5 text-sm font-medium text-gray-900`}
                  placeholder="DNI"
                  onChangeText={handleChange("dni")}
                  onBlur={handleBlur("DNI")}
                  value={values.dni}
                  keyboardType="numeric"
                />
                {errors.dni && <Text>{errors.dni}</Text>}
                <TextInput
                  style={tw`border border-opacity-75 rounded-md mb-2 p-1.5 py-1.5 text-sm font-medium text-gray-900`}
                  placeholder="Contraseña"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry
                />
                {errors.password && <Text>{errors.password}</Text>}
                <Button
                  onPress={handleSubmit}
                  title="Ingresar"
                  disabled={!isValid}
                />
              </>
            )}
          </Formik>
        </View>
      </View>
    </View>
  );
};

export default Login;
