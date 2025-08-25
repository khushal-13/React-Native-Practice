import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useRouter } from "expo-router";

const index = () => {
  const [todos, setTodos] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState("All");
  const [todo, setTodo] = useState("");
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [marked, setMarked] = useState(false);

  const today = moment().format("MMM Do");
  const router = useRouter();

  const suggestions = [
    {
      id: "0",
      todo: "Drink Water, keep healthy",
    },
    {
      id: "1",
      todo: "Go Excercising",
    },
    {
      id: "2",
      todo: "Go to bed early",
    },
    {
      id: "3",
      todo: "Take pill reminder",
    },
    // {
    //   id: "4",
    //   todo: "Go Shopping",
    // },
    // {
    //   id: "5",
    //   todo: "finish assignments",
    // },
  ];

  useEffect(() => {
    getUserTodos();
  }, [marked, isModalVisible]);

  const addTodo = async () => {
    try {
      const todoData = {
        title: todo,
        category: category,
      };

      axios
        .post(
          "http://192.168.1.102:3000/todos/68a5c34e6a6b9ae0c4ba646b",
          todoData
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("Error adding Todo ::", error);
        });

      await getUserTodos();

      setModalVisible(false);
      setTodo("");
    } catch (error) {
      console.log("Error ", error);
    }
  };

  const getUserTodos = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.102:3000/users/68a5c34e6a6b9ae0c4ba646b/todos`
      );
      setTodos(response.data.todos);

      const fetchedTodos = response.data.todos || [];
      const pending = fetchedTodos.filter(
        (todo) => todo.status !== "completed"
      );
      const completed = fetchedTodos.filter(
        (todo) => todo.status === "completed"
      );

      setPendingTodos(pending);
      setCompletedTodos(completed);
    } catch (error) {
      console.log("Error fetching todos", error);
    }
  };

  const markeTodoComplete = async (todoId) => {
    try {
      setMarked(true);
      const response = axios.patch(
        `http://192.168.1.102:3000/todos/${todoId}/complete`
      );
      console.log(response.data);
    } catch (error) {
      console.log("Error marking complete", error);
    }
  };

  console.log("Pending Todos : ", pendingTodos);
  console.log("Completed Todos : ", completedTodos);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#7CB9E8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}> All </Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: "#7CB9E8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}> Work </Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: "#7CB9E8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            marginRight: "auto",
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>Personal</Text>
        </Pressable>

        <Pressable>
          <AntDesign
            onPress={() => setModalVisible(!isModalVisible)}
            name="pluscircle"
            size={30}
            color="#007FFF"
          />
        </Pressable>
      </View>

      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ padding: 10 }}>
          {todos?.length > 0 ? (
            <View>
              {pendingTodos?.length > 0 && <Text> Tasks to Do! {today}</Text>}
              {pendingTodos?.map((item, index) => (
                <Pressable
                  onPress={() => {
                    router?.push({
                    pathname: "/home/info",
                    params: {
                      id: item._id,
                      title: item?.title,
                      category: item?.category,
                      createdDate: item?.createdDate,
                      dueDate: item?.dueDate
                    },
                  });
                }}
                  style={{
                    backgroundColor: "#E0E0E0",
                    padding: 10,
                    borderRadius: 7,
                    marginVertical: 10,
                  }}
                  key={index}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Entypo
                      onPress={() => markeTodoComplete(item._id)}
                      name="circle"
                      size={18}
                      color="black"
                    />
                    <Text style={{ flex: 1 }}> {item.title} </Text>
                    <Feather name="flag" size={20} color="black" />
                  </View>
                </Pressable>
              ))}

              {completedTodos.length > 0 && (
                <View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 10,
                    }}
                  >
                    <Image
                      style={{ height: 100, width: 100 }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/6784/6784655.png",
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      marginVertical: 10,
                    }}
                  >
                    <Text> Completed tasks</Text>
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={24}
                      color="black"
                    />
                  </View>

                  {completedTodos?.map((item, index) => (
                    <Pressable
                      style={{
                        backgroundColor: "#E0E0E0",
                        padding: 10,
                        borderRadius: 7,
                        marginVertical: 10,
                      }}
                      key={index}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <FontAwesome name="circle" size={18} color="gray" />
                        <Text
                          style={{
                            flex: 1,
                            textDecorationLine: "line-through",
                            color: "gray",
                          }}
                        >
                          {item.title}
                        </Text>
                        <Feather name="flag" size={20} color="gray" />
                      </View>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 130,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Image
                style={{ height: 200, width: 200, resizeMode: "contain" }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/2387/2387679.png",
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 15,
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                No task for today! Add Task
              </Text>
              <Pressable style={{ marginTop: 15 }}>
                <AntDesign
                  onPress={() => setModalVisible(!isModalVisible)}
                  name="pluscircle"
                  size={30}
                  color="#007FFF"
                />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Full-screen touchable backdrop */}
        <Pressable
          onPress={() => setModalVisible(false)}
          style={{
            ...StyleSheet.absoluteFillObject, // covers full screen including status bar
            backgroundColor: "rgba(0,0,0,0.3)", // semi-transparent
            justifyContent: "flex-end",
          }}
        >
          {/* Modal content */}
          <Pressable
            onPress={(e) => e.stopPropagation()} // prevent closing when inside
            style={{
              backgroundColor: "white",
              padding: 20,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              height: 280,
            }}
          >
            {/* Modal Title */}
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              Add a Todo
            </Text>

            {/* Input + Send */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <TextInput
                value={todo}
                onChangeText={setTodo}
                placeholder="Input a new task here"
                style={{
                  flex: 1,
                  borderColor: "#E0E0E0",
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: 10,
                }}
              />
              <Ionicons
                onPress={addTodo}
                name="send"
                size={24}
                color="#007FFF"
              />
            </View>

            {/* Category selection */}
            <Text style={{ fontWeight: "600", marginBottom: 5 }}>
              Choose Category
            </Text>
            <View style={{ flexDirection: "row", gap: 10, marginVertical: 10 }}>
              {["Work", "Personal", "WishList"].map((cat) => (
                <Pressable
                  key={cat}
                  onPress={() => setCategory(cat)}
                  style={{
                    borderColor: "#E0E0E0",
                    borderWidth: 1,
                    borderRadius: 25,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    backgroundColor: category === cat ? "#D0E8FF" : "white",
                  }}
                >
                  <Text>{cat}</Text>
                </Pressable>
              ))}
            </View>

            {/* Suggestions */}
            <Text style={{ fontWeight: "600", marginBottom: 5 }}>
              Some suggestions
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
              {suggestions.map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => setTodo(item.todo)}
                  style={{
                    backgroundColor: "#F0F8FF",
                    borderRadius: 25,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ textAlign: "center" }}>{item.todo}</Text>
                </Pressable>
              ))}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
