import React, { useState, useEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { categories } from "../constants";
import { getCategories } from "../api";
import { urlFor } from "../sanity";

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data) 
      })
      .catch((err) => console.log(err, "err"));
  }, []);
  return (
    <View className="mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((eachItem, index) => {
          let isActive = eachItem._id === activeCategory;
          let butClass = isActive ? "bg-gray-600" : "bg-gray-200";
          let textClass = isActive
            ? "font-semibold text-gray-800"
            : "text-gray-500";
          return (
            <View key={index} className="flex justify-center items-center mr-6">
              <TouchableOpacity
                onPress={() => setActiveCategory(eachItem._id)}
                className={"p-1 rounded-full shadow bg-gray-200 " + butClass}
              >
                <Image
                  style={{ width: 45, height: 45 }}
                  source={{uri: urlFor(eachItem?.image).url()}}
                />
              </TouchableOpacity>
              <Text className={"text-sm " + textClass}>{eachItem.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Categories;
