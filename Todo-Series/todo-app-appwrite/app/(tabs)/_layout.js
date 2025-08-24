import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'

const Layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name='home'options={{headerShown: false}}/>
        <Tabs.Screen name='profile' options={{headerShown: false}}/>
    </Tabs>
  )
}

export default Layout

const styles = StyleSheet.create({})