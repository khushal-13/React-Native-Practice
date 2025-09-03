import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";

const Index = () => {
  const [options, setOptions] = useState("Today");
  const router = useRouter();

  return (
    <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <SafeAreaView
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Ionicons name="logo-foursquare" size={24} color="black" />
        <AntDesign style={{ padding: 2}} name="plus" size={24} color="black" onPress={() => router.push("/home/create")}/>
      </SafeAreaView>

      <Text style={{ marginTop: 5, fontSize: 23, fontWeight: "500" }}>
        Habits
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginVertical: 8,
        }}
      >
        <Pressable
          onPress={() => setOptions("Today")}
          style={{
            backgroundColor: options == "Today" ? "#E0FFFF" : "transparent",
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 25,
          }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 14 }}>
            {" "}
            Today{" "}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setOptions("Weekly")}
          style={{
            backgroundColor: options == "Weekly" ? "#E0FFFF" : "transparent",
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 25,
          }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 14 }}>
            {" "}
            Weekly{" "}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setOptions("Overall")}
          style={{
            backgroundColor: options == "Overall" ? "#E0FFFF" : "transparent",
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 25,
          }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 14 }}>
            {" "}
            Overall{" "}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({});
