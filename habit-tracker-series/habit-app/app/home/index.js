import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import {
  BottomModal,
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  Feather,
  EvilIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import api from "../api";
import { useFocusEffect } from "@react-navigation/native";

const Index = () => {
  const [options, setOptions] = useState("Today");
  const [habits, setHabits] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState();
  const currentDay = new Date()
    .toLocaleDateString("en-US", { weekday: "short" })
    .slice(0, 3);
  const router = useRouter();

  useEffect(() => {
    fetchHabits();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchHabits();
    }, [])
  );

  const fetchHabits = async () => {
    try {
      const response = await api.get("/habitsList");
      setHabits(response.data.habits);
    } catch (error) {
      console.log("Error fetching habits");
    }
  };

  const handleLongPress = (habitId) => {
    const selectedHabit = habits?.find((habit) => habit._id == habitId);
    setSelectedHabit(selectedHabit);
    setModalVisible(!isModalVisible);
  };

  const handleCompletion = async () => {
    try {
      const habitId = selectedHabit?._id;
      const updatedCompletion = {
        ...selectedHabit?.completed,
        [currentDay]: true,
      };

      await api.put(`/habits/${habitId}/completed`, {
        completed: updatedCompletion,
      });

      await fetchHabits();

      setModalVisible(!isModalVisible);
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteHabit = async () => {
    try {
      const habitId = selectedHabit._id;

      const response = await api.delete(`/habits/${habitId}`);

      if (response.status == 200) {
        setHabits(response.data);
      }
    } catch (error) {
      console.log("Error deleting habir", error);
    }
  };


  const getCompletedDays = (completedObj) => {
    if(completedObj && typeof completedObj == "object") {
      return Object.keys(completedObj).filter((day) => completedObj[day]);
    }

    return [];
  }

  console.log("Habits: ", habits);

  const filteredHabits = habits?.filter((habit) => {
    return !habit.completed || !habit.completed[currentDay];
  });

  console.log("Filtered Habits: ", habits);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <>
      <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
        <SafeAreaView
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Ionicons name="logo-foursquare" size={24} color="black" />
          <AntDesign
            style={{ padding: 2 }}
            name="plus"
            size={24}
            color="black"
            onPress={() => router.push("/home/create")}
          />
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

        {options == "Today" &&
          (filteredHabits?.length > 0 ? (
            <View>
              {filteredHabits.map((item, index) => (
                <Pressable
                  onLongPress={() => handleLongPress(item._id)}
                  key={index}
                  style={{
                    marginVertical: 10,
                    backgroundColor: item?.color,
                    padding: 12,
                    borderRadius: 24,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontWeight: "500",
                    }}
                  >
                    {item.title}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : (
            <View
              style={{
                marginTop: 150,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "auto",
              }}
            >
              <Image
                style={{ width: 60, height: 60, resizeMode: "cover" }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/10609/10609386.png",
                }}
              />

              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "600",
                  marginTop: 10,
                }}
              >
                {" "}
                No habits for Today
              </Text>

              <Pressable
                onPress={() => router.push("/home/create")}
                style={{
                  backgroundColor: "#0071c5",
                  marginTop: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Text> Create </Text>
              </Pressable>
            </View>
          ))}

        {options == "Weekly" && (
          <View>
            {habits?.map((habit, index) => (
              <Pressable
                style={{
                  marginVertical: 10,
                  backgroundColor: habit.color,
                  padding: 15,
                  borderRadius: 24,
                }}
                key={index}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 15, fontWeight: "500", color: "white" }}
                  >
                    {habit.title}
                  </Text>
                  <Text style={{ color: "white" }}>{habit.repeatMode}</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    marginVertical: 10,
                  }}
                >
                  {days?.map((day, item) => {
                    const isCompleted = habit.completed && habit.completed[day];

                    return (
                      <Pressable>
                        <Text
                          style={{ color: day == currentDay ? "red" : "white" }}
                        >
                          {" "}
                          {day}{" "}
                        </Text>
                        {isCompleted ? (
                          <FontAwesome
                            name="circle"
                            size={24}
                            color="white"
                            style={{ marginTop: 12 }}
                          />
                        ) : (
                          <Feather
                            name="circle"
                            size={24}
                            color="white"
                            style={{ marginTop: 12 }}
                          />
                        )}
                      </Pressable>
                    );
                  })}
                </View>
              </Pressable>
            ))}
          </View>
        )}

        {options == "Overall" && (
          <View>
            {habits?.map((habit, index) => (
              <>
                <Pressable
                  style={{
                    marginVertical: 10,
                    backgroundColor: habit.color,
                    padding: 15,
                    borderRadius: 24,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "500",
                        color: "white",
                      }}
                    >
                      {habit.title}
                    </Text>
                    <Text style={{ color: "white" }}>{habit.repeatMode}</Text>
                  </View>
                </Pressable>

                <View style={{ flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                  <Text> Completed On </Text>
                  <Text> {getCompletedDays(habit.completed).join(", ")} </Text>
                </View>
              </>
            ))}
          </View>
        )}
      </ScrollView>

      <BottomModal
        onHardwareBackPress={() => setModalVisible(!isModalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Choose Option" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        visible={isModalVisible}
        onTouchOutside={() => setModalVisible(!isModalVisible)}
      >
        <ModalContent style={{ width: "200%", height: 280 }}>
          <View style={{ marginVertical: 10 }}>
            <Text> Options </Text>
            <Pressable
              onPress={handleCompletion}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                gap: 12,
              }}
            >
              <MaterialIcons
                name="check-circle-outline"
                size={24}
                color="black"
              />
              <Text> Completed </Text>
            </Pressable>

            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                gap: 12,
              }}
            >
              <Feather name="skip-forward" size={24} color="black" />
              <Text> Skip </Text>
            </Pressable>

            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                gap: 12,
              }}
            >
              <Feather name="edit-2" size={24} color="black" />
              <Text> Edit </Text>
            </Pressable>

            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                gap: 12,
              }}
            >
              <Feather name="archive" size={22} color="black" />
              <Text> Archive </Text>
            </Pressable>

            <Pressable
              onPress={deleteHabit}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                gap: 12,
              }}
            >
              <AntDesign name="delete" size={24} color="black" />
              <Text> Delete </Text>
            </Pressable>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default Index;

const styles = StyleSheet.create({});
