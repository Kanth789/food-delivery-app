import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../slices/cartSlice";

const CartIcon = () => {
  const naviagtion = useNavigation();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal)
  if (!cartItems.length) return;
  return (
    <View className="absolute bottom-5 w-full z-50">
      <TouchableOpacity
        onPress={() => naviagtion.navigate("Cart")}
        className="flex-row justify-between items-center mx-5 rounded-full p-4 py-3 shadow-lg"
        style={{ backgroundColor: themeColors.bgColor(1) }}
      >
        <View
          className="p-2 px-4 rounded-full"
          style={{ backgroundColor: "white", opacity: 0.3 }}
        >
          <Text className="font-extrabold text-white text-lg">{cartItems.length}</Text>
        </View>
        <Text className="flex-1 text-center font-extrabold text-white text-lg">
          View Cart
        </Text>
        <Text className="font-extrabold text-white text-lg">{cartTotal}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartIcon;
