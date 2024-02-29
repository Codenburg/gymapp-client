import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { User } from "../../../utils/interfaces/User";
import { instance } from "../../../utils/constants/AxiosIntance";

const DetailUser = ({ route }: { route: any }) => {
  const [user, setUser] = useState<User>();
  const { id } = route.params;
  useEffect(() => {
    const fetchUser = async () => {
      const response = await instance.get(`accounts/edit/${id}`);
      setUser(response.data);
    };
    fetchUser();
  }, [id]);

  if (!user) {
    return (
      <>
        <Text>Cargando...</Text>
      </>
    );
  }
  return (
    <View>
      <Text>
        Nombre y Apellido{user.name} {user.last_name}
      </Text>
      <Text>DNI {user.dni}</Text>
      <Text>Email: {user.email}</Text>
    </View>
  );
};

export default DetailUser;
