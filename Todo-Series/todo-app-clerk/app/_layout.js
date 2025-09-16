// app/_layout.js
import { Stack } from "expo-router";
import { View } from "react-native";
import { AuthProvider } from "../context/AuthContext";
import { ClerkProvider } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import * as SecureStore from "expo-secure-store";

// EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY =
//   pk_test_YWN0dWFsLW1ha28tNzMuY2xlcmsuYWNjb3VudHMuZGV2JA;

const tokenCache = {
  async getToken(key){
    try{
      return await SecureStore.getItemAsync(key)
    }catch(err){
      return null;
    }
  },
  async saveToken(key,value){
    try{
      return await SecureStore.setItemAsync(key,value);
    }catch(err){
      return;
    }
  }
}

export default function Layout() {
  return (
    <ClerkProvider publishableKey="pk_test_YWN0dWFsLW1ha28tNzMuY2xlcmsuYWNjb3VudHMuZGV2JA" tokenCache={tokenCache}>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
      <Slot />
    </ClerkProvider>
  );
}
