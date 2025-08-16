import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'

const ProfileScreen = () => {

  const route = useRoute();
  const navigation = useNavigation();

  console.log(route?.params);

  const handleSave = () => {
    route?.params?.goBack("React Native");
    navigation.goBack();  
  }

  return (
    <SafeAreaView>
      <Text>ProfileScreen</Text>
      <Pressable onPress={handleSave}> <Text> Go back to Home Screen </Text> </Pressable>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})