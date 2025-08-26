import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import api from "../axiosUrl"; // adjust path if needed

export default function Verify() {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const { email } = useLocalSearchParams(); // email passed in params from register page

  const handleVerify = () => {
    if (!otp) {
      Alert.alert("Enter OTP", "Please enter the code sent to your email.");
      return;
    }

    api
      .post("/verify-otp", { email, otp }) // send both email + otp
      .then((response) => {
        Alert.alert("Verified", "Your account has been verified.");
        router.replace("/login"); // go to login after success
      })
      .catch((error) => {
        Alert.alert("Verification failed", "Invalid or expired OTP.");
        console.log("Error verifying OTP :: Frontend :: ", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Account</Text>
      <Text style={styles.subtitle}>Enter the OTP sent to {email}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
      />

      <Pressable style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: "100%",
    padding: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
