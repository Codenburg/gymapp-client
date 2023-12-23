import { View, Text } from "react-native";
import React, { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../context/AuthContext";

const Home = () => {
  useEffect(() => {
    const testCall = async () => {
      const result = await axios.post(`${API_URL}accounts/register/`);
      console.log(result.data);
    };
    testCall();
  }, []);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
