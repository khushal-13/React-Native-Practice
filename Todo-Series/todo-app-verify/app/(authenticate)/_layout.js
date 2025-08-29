import { StyleSheet, Text, View } from 'react-native'
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
        <Stack.Screen name='login' options={{headerShown: false}}/>
        <Stack.Screen name='register' options={{headerShown: false}}/>
        <Stack.Screen name='verify' options={{headerShown: false}}/>
        <Stack.Screen name='forgotPassword' options={{headerShown: false}}/>
    </Stack>
  )
}

export default Layout

const styles = StyleSheet.create({})