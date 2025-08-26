import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, AntDesign, Feather, SimpleLineIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

const info = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
      <Ionicons onPress={() => router.back()} name="arrow-back" size={24} color="black" />

      <View>
        <View style={{ marginTop: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", textAlign: "center"}}>
            Todo Info
          </Text>
        </View>

        <Text style={{ marginLeft: 20, marginTop: 30, fontSize: 18, fontWeight: "400" }}>
          Title : {params?.title}
        </Text>
      </View>

      <View style={{ marginTop: 50 }} />

      <Pressable style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        <AntDesign name="plus" size={24} color="#7CB9E8" />
        <Text style={{ color: "#7CB9E8", fontSize: 16, fontWeight: "500" }}>
          Add a subtask
        </Text>
      </Pressable>

      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <AntDesign name="calendar" size={24} color="black" />
            <Text>Due Date</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text> {params?.dueDate}</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Ionicons name="time-sharp" size={24} color="gray" />
            <Text>Time and Reminder</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text> No </Text>
          </Pressable>
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Feather name="repeat" size={24} color="black" />
            <Text>Repeat</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text> No </Text>
          </Pressable>
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <SimpleLineIcons name="note" size={24} color="black" />
            <Text>Notes</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text> Not Added </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default info;

const styles = StyleSheet.create({});
