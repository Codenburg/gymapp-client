import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";

const AdminScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Panel de Administrador</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Gestionar Usuarios"
          onPress={() => navigation.navigate("Panel de usuarios")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "80%",
    marginTop: 20,
  },
});

export default AdminScreen;
