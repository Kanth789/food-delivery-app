import React, { useEffect, useState } from "react";
import {
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const LoginScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const handleLogin = async () => {
    if (userName === "User123" && password === "1234") {
      await AsyncStorage.setItem("loggedIn", "true");
      navigation.navigate("Home");
      setUserName('')
      setPassword('')
    }
  };
  useEffect(()=>{
    const checkLoggedIn = async () => {
      const isLoggedIn = await AsyncStorage.getItem("loggedIn");
      if (isLoggedIn) {
        navigation.navigate("Home");
      }
    };
    checkLoggedIn();
  },[])
  return (
    <View className="bg-white h-full w-full">
      <StatusBar style="light" />

      <View className="flex-row justify-around w-full absoulte px-4">
        <Image
          className="h-40 w-40"
          source={require("../assets/images/pizza.png")}
        />
       
        <Image
          className="h-60 w-60"
          source={require("../assets/images/buns.png")}
        />
      </View>
      <View className="pt-35 w-full flex justify-around pb-10">
        <View className="flex items-center">
          <Text className="text-black font-bold tracking-wider text-5xl">
            Login
          </Text>
        </View>
        <View className="flex items-center mx-4 my-10 space-y-4">
          <View className="bg-black/5 p-5 rounded-2xl w-full">
            <TextInput
              placeholder="Please Enter Username"
              placeholderTextColor={"gray"}
              value={userName}
              onChangeText={(text) => setUserName(text)}
            />
          </View>
            <Text>Please Type: User123</Text>
          <View className="bg-black/5 p-5 rounded-2xl w-full mb-3">
            <TextInput
              placeholder="Please Enter Password"
              secureTextEntry
              placeholderTextColor={"gray"}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
            <Text>Please Type: 1234</Text>
          <View className="w-full">
            <TouchableOpacity
              className="w-full rounded-2xl mb-3 p-3"
              style={{ backgroundColor: themeColors.bgColor(1) }}
              onPress={(e)=>handleLogin(e)}
            >
              <Text className="text-xl font-bold text-white text-center">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
