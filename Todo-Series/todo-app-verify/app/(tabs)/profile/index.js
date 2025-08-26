import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-chart-kit";
import api from "../../axiosUrl";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const router = useRouter();

  const fetchTaskData = async () => {
    try {
      const resposne = await api.get("/todos/count");
      const { totalCompletedTodos, totalPendingTodos } = resposne.data;
      setCompletedTasks(totalCompletedTodos);
      setPendingTasks(totalPendingTodos);
    } catch (error) {
      console.log("Error fetching Task Data", error);
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, []);

  // console.log("Completed : ", completedTasks);
  // console.log("Pending : ", pendingTasks);
  
  const handleLogout = async () => {
    try {
      AsyncStorage.removeItem("authToken");
      router.replace("(authenticate)/login");
    } catch (error) {
      console.log("Error log out");
    }
  }

  return (
    <SafeAreaView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image
          style={{ height: 60, width: 60, borderRadius: 30 }}
          source={{
            uri: "https://lh3.googleusercontent.com/ogw/ANLem4Zmk7fohWyH7kB6YArqFy0WMfXnFtuX3PX3LSBf=s64-c-mo",
          }}
        />

        <View>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            Keep Plan for 15 days
          </Text>
          <Text style={{ color: "gray", marginTop: 4 }}> Select category</Text>
        </View>
      </View>

      <View style={{ marginVertical: 12 }}>
        <Text> Task Overview</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginVertical: 8,
          }}
        >
          <View
            style={{
              backgroundColor: "#89CFF0",
              padding: 10,
              borderRadius: 8,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}
            >
              {completedTasks}
            </Text>
            <Text style={{ marginTop: 4 }}> Completed Task </Text>
          </View>
          <View
            style={{
              backgroundColor: "#89CFF0",
              padding: 10,
              borderRadius: 8,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}
            >
              {pendingTasks}
            </Text>
            <Text style={{ marginTop: 4 }}> Pending Task </Text>
          </View>
        </View>
      </View>

      <LineChart
        data={{
          labels: ["Pending Tasks", "Completed Tasks"],
          datasets: [
            {
              data: [pendingTasks, completedTasks],
            },
          ],
        }}
        width={Dimensions.get("window").width - 20} // from react-native
        height={220}
        // yAxisLabel="$"
        // yAxisSuffix="k"
        yAxisInterval={2} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          borderRadius: 16,
        }}
      />

      <View
        style={{
          backgroundColor: "#89CFF0",
          padding: 10,
          borderRadius: 6,
          marginTop: 15,
        }}
      >
        <Text style={{ textAlign: "center", color: "white" }}>
          Tasks for the next seven days
        </Text>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Image
          style={{ width: 120, height: 120 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/9537/9537221.png",
          }}
        />

        <Pressable
          onPress={handleLogout}
          style={{
            backgroundColor: "#FF3B30", // a nicer iOS-style red
            marginTop: 20,
            width: "100%",
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5, // shadow on Android
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Logout
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
