import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { ModalPortal } from "react-native-modals";

const Layout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="create" options={{ headerShown: false }} />
      </Stack>

      <ModalPortal />
    </>
  );
};

export default Layout;

const styles = StyleSheet.create({});
