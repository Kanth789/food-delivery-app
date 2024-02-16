import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { themeColors } from "../theme";
import RestaurantCard from "./restaurantCard";

const FeaturedRow = ({ title, restaurants, description }) => {
  return (
    <View>
      <View className="flex-row justify-between items-center px-4">
        <View>
          <Text className="font-bold text-lg">{title}</Text>
          <Text className="text-gray-500 text-xs">{description}</Text>
        </View>
        <TouchableOpacity>
          <Text style={{ color: themeColors.text }}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="overflow-visible py-5"
      >
        {restaurants?.map((eachItem) => {
          return (
            <RestaurantCard
              key={eachItem._id}
              id={eachItem._id}
              imgUrl={eachItem.image}
              title={eachItem.name}
              rating={eachItem.rating}
              type={eachItem.type?.name}
              address="123 main street"
              description={eachItem.description}
              dishes={eachItem.dishes}
              lng={eachItem.lng}
              lat={eachItem.lat}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
