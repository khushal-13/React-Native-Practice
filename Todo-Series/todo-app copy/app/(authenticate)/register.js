import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";


const register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    const user = {
        name: name,
        email: email,
        password: password
    };

    axios.post("http://192.168.1.100:3000/register/", user)
    .then((response) => {
      console.log(response);
      Alert.alert("Registration Successfull", "User registered successfull");
      setName("");
      setEmail("");
      setPassword("");
    })
    .catch((error) => {
      Alert.alert("Registration failed");
      console.log("Error while registering user :: Frontend :: ", error)
    })
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View style={{ marginTop: 60 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#0066b2" }}>
          {" "}
          TODO-LIST TRACKER
        </Text>
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 20 }}>
            Register Your Account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#E0E0E0",
              paddingVertical: 2,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <Ionicons
              name="person"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                color: "gray",
                width: 280,
                marginVertical: 8,
                fontSize: 16,
              }}
              placeholder="Enter name"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#E0E0E0",
              paddingVertical: 2,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              name="email"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                width: 280,
                marginVertical: 8,
                fontSize: 16,
              }}
              placeholder="Enter email"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#E0E0E0",
              paddingVertical: 2,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <Entypo
              name="lock"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                color: "gray",
                width: 280,
                marginVertical: 8,
                fontSize: 16,
              }}
              placeholder="Enter password"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            <Text> Keep me logged In</Text>
            <Text style={{ color: "#007FFF", fontWeight: "500" }}>
              {" "}
              Forgot Password
            </Text>
          </View>

          <View style={{ marginTop: 60 }}>
            <Pressable
            onPress={handleRegister}
              style={{
                width: 180,
                backgroundColor: "#6699CC",
                padding: 15,
                borderRadius: 6,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                {" "}
                Register{" "}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.replace("/login")}
              style={{
                marginTop: "15",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "gray",
                  fontSize: 15,
                }}
              >
                {" "}
                Already have an account ? Login{" "}
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({});
