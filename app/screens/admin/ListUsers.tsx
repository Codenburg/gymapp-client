import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { instance } from "../../../utils/constants/AxiosIntance";
import { useEffect, useState } from "react";
import { User } from "../../../utils/interfaces/User";
import tw from "twrnc";
import Icon from "react-native-vector-icons/FontAwesome";

const ListUsers = ({ navigation }: { navigation: any }) => {
  const [originalUsers, setOriginalUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  const listUser = async () => {
    try {
      const response = await instance.get("accounts/list/");
      setOriginalUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listUser();
  }, []);

  const handleClearSearch = () => {
    setFilteredUsers(originalUsers);
    setSearch("");
  };
  const handleUserDetail = (userId: number | null) => {
    navigation.navigate("Detalles del usuario", { id: userId });
  };

  useEffect(() => {
    if (!search) {
      setFilteredUsers(originalUsers);
    } else {
      setFilteredUsers(
        originalUsers.filter((user) => user.dni?.toString().includes(search))
      );
    }
  }, [search, originalUsers]);

  if (!filteredUsers) {
    return <Text>Cargando...</Text>;
  }

  return (
    <SafeAreaView style={tw`mb-4`}>
      <View style={tw`relative`}>
        <TextInput
          style={tw`border-2 border-gray-300 rounded-lg p-2 pl-8`}
          placeholder="Buscar por DNI..."
          value={search}
          keyboardType="numeric"
          onChangeText={(text) => setSearch(text)}
        />
        {search ? (
          <TouchableOpacity
            onPress={handleClearSearch}
            style={tw`absolute top-2 right-2`}
          >
            <Icon name="close" size={30} />
          </TouchableOpacity>
        ) : null}
      </View>
      <ScrollView>
        {filteredUsers.map((user) => (
          <TouchableOpacity
            key={user.id}
            onPress={() => handleUserDetail(user.id)}
            style={tw`m-1 p-3 bg-gray-200 rounded-lg shadow-md`}
          >
            <Text style={tw`text-center text-lg font-semibold text-gray-800`}>
              DNI: {user.dni}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListUsers;
