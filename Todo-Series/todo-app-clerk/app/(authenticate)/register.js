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
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { isLoaded, signUp, setActive } = useSignUp();

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username.trim()) {
      Alert.alert("Validation Error", "Username is required");
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Validation Error", "Password must be at least 6 characters long");
      return;
    }

    if (!isLoaded) return;

    try {
      // Create the user
      await signUp.create({
        emailAddress: email,
        password,
        username: username, // Store username in Clerk metadata
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      Alert.alert("Success", "OTP sent to your email for verification");

      router.push({
        pathname: "/verify",
        params: { email },
      });
    } catch (err) {
      console.log("Clerk signup error:", err);
      Alert.alert("Registration Failed", err.errors?.[0]?.longMessage || "Unknown error");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <View style={{ marginTop: 60 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#0066b2" }}>
          TODO-LIST TRACKER
        </Text>
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 20 }}>
            Register Your Account
          </Text>
        </View>

        <View style={{ marginTop: 30 }}>
          {/* Username */}
          <View style={styles.inputContainer}>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Enter username"
              style={styles.input}
            />
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
              keyboardType="email-address"
              style={styles.input}
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Enter password"
              style={styles.input}
            />
          </View>

          <View style={{ marginTop: 30 }}>
            <Pressable onPress={handleRegister} style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
            </Pressable>

            <View style={{ flexDirection: "row", gap: 10, justifyContent: "center", marginTop: 15 }}>
              <Text style={{ textAlign: "center", color: "gray", fontSize: 15 }}>
                Already have an account?
              </Text>

              <Text
                style={{ textAlign: "center", color: "#007FFF", fontWeight: "500", fontSize: 15 }}
                onPress={() => router.replace("/login")}
              >
                Login
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  input: {
    color: "gray",
    width: 280,
    fontSize: 16,
    paddingHorizontal: 8,
  },
  button: {
    width: 180,
    backgroundColor: "#6699CC",
    padding: 15,
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
