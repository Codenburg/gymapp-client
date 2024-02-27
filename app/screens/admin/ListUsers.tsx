import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { instance } from "../../../utils/constants/AxiosIntance";
import { useEffect, useState } from "react";
import { User } from "../../../utils/interfaces/User";

const ListUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const listUser = async () => {
    try {
      const response = await instance.get("accounts/list/");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listUser();
  }, []); // Solo se llama a listUser una vez, cuando el componente se monta

  return (
    <SafeAreaView>
      <ScrollView>
        {users.map((user) => (
          <Text key={user.id}>
            Nombre y apellido: {user.name} {user.last_name} Email:{user.email}
          </Text>
          // Aquí puedes mostrar otras propiedades del usuario según lo necesites
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default ListUsers;
