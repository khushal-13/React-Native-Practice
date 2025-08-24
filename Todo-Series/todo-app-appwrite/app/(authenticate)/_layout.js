import { StyleSheet, Text, View } from 'react-native'
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
        <Stack.Screen name='Login' options={{headerShown: false}}/>
        <Stack.Screen name='Register' options={{headerShown: false}}/>
    </Stack>
  )
}

export default Layout

const styles = StyleSheet.create({})