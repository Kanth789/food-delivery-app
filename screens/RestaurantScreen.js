import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import Dish from "../components/Dish";
import CartIcon from "../components/CartIcon";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant, setRestaurant } from "../slices/restuarntSlice";
import { urlFor } from "../sanity";
import { emptyCart } from "../slices/cartSlice";

export const RestaurantScreen = () => {
  const navigation = useNavigation();
  const resturant = useSelector(selectRestaurant);
  let dispatch = useDispatch();
  const {
    params: {
      id,
      title,
      imgUrl,
      rating,
      type,
      address,
      description,
      dishes,
      lng,
      lat,
    },
  } = useRoute();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  useEffect(() => {
    if (resturant && resturant.id != id) {
      dispatch(emptyCart());
    }
    dispatch(
      setRestaurant({
        id,
        title,
        imgUrl,
        rating,
        type,
        address,
        description,
        dishes,
        lng,
        lat,
      })
    );
  }, []);
  return (
    <>
      <>
        <CartIcon />
        <ScrollView>
          <View className="relative">
            <Image
              className="w-full h-72"
              source={{ uri: urlFor(imgUrl).url() }}
            />
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow"
            >
              <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
            </TouchableOpacity>
          </View>
          <View
            style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
            className="bg-white -mt-12 pt-6"
          >
            <View className="px-5">
              <Text className="text-3xl font-bold">{title}</Text>
              <View className="flex-row space-x-2 my-1">
                <View className="pb-4 space-y-2">
                  <View className="flex-row items-center space-x-1">
                    <Image
                      source={require("../assets/images/fullStar.png")}
                      className="h-4 w-4"
                    />
                    <Text className="text-xs">
                      <Text className="text-green-700">{rating}</Text>
                      <Text className="text-gray-700">
                        {" "}
                        (4.6k review)
                      </Text> ·{" "}
                      <Text className="font-semibold text-gray-700">
                        {type}
                      </Text>
                    </Text>
                    <View className="flex-row items-center space-x-1">
                      <Icon.MapPin color="gray" width="15" height="15" />
                      <Text className="text-gray-700 text-xs">
                        Nearby. {address}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text className="text-gray-500 mt-1">{description}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View className="pb-36 bh-white">
            <Text className="px-4 py-4 text-2xl font-bold">Menu</Text>
            {dishes.map((eachItem, index) => {
              return (
                <Dish
                  key={eachItem._id}
                  id={eachItem._id}
                  name={eachItem.name}
                  description={eachItem.description}
                  price={eachItem.price}
                  image={eachItem.image}
                />
              );
            })}
          </View>
        </ScrollView>
      </>
    </>
  );
};
