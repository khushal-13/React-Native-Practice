import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { ModalPortal } from "react-native-modals";

const Layout = () => {
  return (
    <>
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name='index' />
    </Stack>
    <ModalPortal />
    </>
    
  )
}

export default Layout

const styles = StyleSheet.create({})