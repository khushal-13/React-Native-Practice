import { StyleSheet, View, Image, Pressable, Text } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import api from "../../axiosUrl";


const Index = () => {
  const today = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(today);
  const [todos, setTodos] = useState([]);

  const fetchCompletedTodos = async () => {
    try {
      const response = await api.get(
        `/todos/completed/${selectedDate}`
      );
      const completedTodos = response.data.completedTodos || [];
      setTodos(completedTodos);
    } catch (error) {
      console.log("Error fetcching completed todos::  ", error);
    }
  };

  useEffect(() => {
    fetchCompletedTodos();
  }, [selectedDate]);

  console.log(`Completed Todos of ${selectedDate}`, todos);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#7CB9EB" },
        }}
        // Show only "Month Year"
        monthFormat={"MMMM yyyy"}
        // Hide extra text like week numbers
        hideExtraDays={true}
        // Custom arrows
        renderArrow={(direction) =>
          direction === "left" ? (
            <Ionicons name="chevron-back" size={20} color="black" />
          ) : (
            <Ionicons name="chevron-forward" size={20} color="black" />
          )
        }
        // Make header title centered
        theme={{
          textMonthFontSize: 18,
          textMonthFontWeight: "bold",
          arrowColor: "black",
        }}
      />

      <View style={{ marginTop: 20 }} />

      {todos.length > 0 && (
        <View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
            }}
          >
            <Image
              style={{ height: 100, width: 100 }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/6784/6784655.png",
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginVertical: 10,
            }}
          >
            <Text> Completed tasks</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="black" />
          </View>

          {todos?.map((item, index) => (
            <Pressable
              style={{
                backgroundColor: "#E0E0E0",
                padding: 10,
                borderRadius: 7,
                marginVertical: 10,
              }}
              key={index}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <FontAwesome name="circle" size={18} color="gray" />
                <Text
                  style={{
                    flex: 1,
                    textDecorationLine: "line-through",
                    color: "gray",
                  }}
                >
                  {item.title}
                </Text>
                <Feather name="flag" size={20} color="gray" />
              </View>
            </Pressable>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({});
