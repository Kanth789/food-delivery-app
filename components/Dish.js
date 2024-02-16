import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  addCart,
  removeFromCart,
  selectCartItemsById,
} from "../slices/cartSlice";
import { urlFor } from "../sanity";

const Dish = ({name, description, id, price, image}) => {
  const dispatch = useDispatch();
  const totalItems = useSelector((state) =>
    selectCartItemsById(state, id)
  );
  const handleIncrease = () => {
    dispatch(addCart({id, name, price, image, description}));
  };
  const handleDecrease = () => {
    dispatch(removeFromCart({ id }));
  };

  return (
    <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2">
      <Image
        source={{uri:urlFor(image).url()}}
        className="rounded-3xl"
        style={{ height: 100, width: 100 }}
      />
      <View className="flex flex-1 space-y-3">
        <View className="pl-3">
          <Text className="text-xl">{name}</Text>
          <Text className="text-gray-700">{description}</Text>
        </View>

        <View className="flex-row justify-between pl-3 items-center">
          <Text className="text-gray-700 text-lg font-bold">
            {price}/-
          </Text>
          <View className="flex-row items-center">
            <TouchableOpacity
              className="p-1 rounded-full"
              style={{ backgroundColor: themeColors.bgColor(1) }}
              onPress={handleDecrease}
              disabled={!totalItems.length}
            >
              <Icon.Minus
                stroke={"white"}
                strokeWidth={2}
                height={20}
                width={20}
              />
            </TouchableOpacity>
            <Text className="px-3">{totalItems.length}</Text>
            <TouchableOpacity
              className="p-1 rounded-full"
              style={{ backgroundColor: themeColors.bgColor(1) }}
              onPress={handleIncrease}
            >
              <Icon.Plus
                stroke={"white"}
                strokeWidth={2}
                height={20}
                width={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Dish;
