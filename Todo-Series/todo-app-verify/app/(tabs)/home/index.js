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
import {
  Ionicons,
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { useRouter } from "expo-router";
import api from "../../axiosUrl";
import { AuthContext } from "../../../context/AuthContext";

const index = () => {
  const [todos, setTodos] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [todo, setTodo] = useState("");
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [marked, setMarked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  const today = moment().format("MMM Do");
  const router = useRouter();
  const { user, loading } = useContext(AuthContext);


  useEffect(() => {
    if (!loading && user?._id) {
      getUserTodos();
    }
  }, [isModalVisible, marked, loading]);

  // // 🔹 Protect against user being null or not loaded yet
  // if (loading) {
  //   return (
  //     <SafeAreaView
  //       style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  //     >
  //       <Text>Loading...</Text>
  //     </SafeAreaView>
  //   );
  // }

  console.log(
    "------------------------------",
    user,
    "---------------------------"
  );

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

  const addTodo = async () => {
    try {
      const todoData = {
        title: todo,
      };

      await api
        .post(`/todos/${user._id}`, todoData)
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
      const response = await api.get(`/users/${user._id}/todos`);
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
      const response = await api.patch(`/todos/${todoId}/complete`);
      console.log("Marking complete :: ", response.data);

      // refresh todos immediately
      await getUserTodos();

      // reset marker flag
      setMarked(false);
    } catch (error) {
      console.log("Error marking complete", error);
    }
  };

  const updateTodo = async (todoId, title) => {
    try {
      const response = await api.patch(`/todos/${todoId}`, { title });
      console.log("Updated Todo :: ", response.data);

      //referesh todos after editing
      await getUserTodos();

      // reset modal state after edit
      setModalVisible(false);
      setIsEditMode(false);
      setEditTodoId(null);
      setTodo("");
    } catch (error) {
      console.log(
        "Error updating Todo :: ",
        error.response?.data || error.message
      );
    }
  };

  const handleDelete = async (todoId) => {
    try {
      const response = await api.delete(`/todos/${todoId}`);
      console.log("Deleted Todo :: ", response.data);

      //referesh todos after editing
      await getUserTodos();
    } catch (error) {
      console.log("Error deleting Todo");
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>
                  {pendingTodos?.length > 0 && <Text> Tasks to Do!</Text>}
                </Text>
                <Text>{today}</Text>
              </View>
              {pendingTodos?.map((item, index) => (
                <Pressable
                  onPress={() => {
                    router?.push({
                      pathname: "/home/info",
                      params: {
                        id: item._id,
                        title: item?.title,
                        createdDate: item?.createdDate,
                        dueDate: item?.dueDate,
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

                    <Feather
                      name="edit"
                      size={24}
                      color="#007AFF"
                      onPress={() => {
                        setTodo(item.title),
                          setEditTodoId(item._id),
                          setIsEditMode(true),
                          setModalVisible(!isModalVisible);
                      }}
                    />
                    <MaterialIcons
                      name="delete"
                      size={24}
                      color="#FF3B30"
                      onPress={() => handleDelete(item._id)}
                    />
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
              {isEditMode ? "Edit Todo" : "Add a Todo"}
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
                onPress={() => {
                  if (isEditMode) {
                    updateTodo(editTodoId, todo);
                  } else {
                    addTodo();
                  }
                }}
                name="send"
                size={24}
                color="#007FFF"
              />
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
