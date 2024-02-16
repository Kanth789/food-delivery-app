import React, { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView, StatusBar, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import Categories from "../components/categories";
import FeaturedRow from "../components/FeaturedRow";
import { getFeaturedRestaurants } from "../api";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const HomeScreen = () => {
  const [featured, setFeatured] = useState([]);
  const navigation = useNavigation();
    useLayoutEffect(() => {
      navigation.setOptions({headerShown: false})
    }, [])
  useEffect(() => {
    getFeaturedRestaurants()
      .then((res) => setFeatured(res))
      .catch((err) => console.log(err));
  }, []);
  const handleLogout = async () => {
    await AsyncStorage.removeItem("loggedIn");
    navigation.navigate('Login')
  };
  return (
    <SafeAreaView className="bg-white py-2">
      <StatusBar barStyle="dark-content" />
      <View className="flex-row items-center space-x-2 px-4 pb-2">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          <Icon.Search height="25" width="25" stroke="gray" />
          <TextInput placeholder="Restaurtants" className="ml-2 flex-1" />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
            <Icon.MapPin height="20" width="20" stroke="gray" />
            <Text className="text-gray-600">New York,NYC</Text>
          </View>
        </View>
        <View
          className="p-3 rounded-full"
          style={{ backgroundColor: themeColors.bgColor(1) }}
        >
          <Icon.LogOut
            height="20"
            width="20"
            strokeWidth={2.5}
            stroke="white"
            onPress={()=>handleLogout()}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Categories />
        <View className="mt-5">
          {featured?.map((item, index) => {
            return (
              <FeaturedRow
                key={index}
                title={item.name}
                restaurants={item.restaurants}
                description={item.description}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
