import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
    
    const navigation = useNavigation();
    const [data, setData] = useState("");

  return (
    <View style={styles.container}>
      <Text> HomeScreen </Text>
      <Text> {data} </Text>
      <Pressable 
      style={styles.button} 
      onPress={() => navigation.navigate("Profile", {name: "khushal", age: 21, 
        goBack: (data) => setData(data)
      })}>
      <Text> Go to Profile </Text> 
      </Pressable>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginTop: 20,
      backgroundColor: 'aqua',
      borderRadius: 8
    }
});
