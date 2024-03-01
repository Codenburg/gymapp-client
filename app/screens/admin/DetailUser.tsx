import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { User } from "../../../utils/interfaces/User";
import { instance } from "../../../utils/constants/AxiosIntance";
import tw from "twrnc";
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
      <View style={tw`flex-1 items-center justify-center`}>
        <Text style={tw`text-lg`}>Cargando...</Text>
      </View>
    );
  }
  return (
    <View style={tw`bg-white rounded-lg shadow-md p-4`}>
      <Text style={tw`text-lg font-bold mb-2`}>
        {user.name} {user.last_name}
      </Text>
      <Text style={tw`text-gray-600`}>DNI: {user.dni}</Text>
      <Text style={tw`text-gray-600`}>Email: {user.email}</Text>
    </View>
  );
};

export default DetailUser;
