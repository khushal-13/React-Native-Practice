import { StyleSheet, Text, View } from 'react-native'
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Layout = () => {
  return (
      <Stack screenOptions={{headerShown: false}}/>
  )
}

export default Layout

const styles = StyleSheet.create({})