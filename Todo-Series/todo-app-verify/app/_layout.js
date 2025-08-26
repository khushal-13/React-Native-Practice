// app/_layout.js
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{headerShown: false}}/>
    </View>
  );
}
