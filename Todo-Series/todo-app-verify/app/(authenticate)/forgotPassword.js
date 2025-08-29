import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import api from "../axiosUrl";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1=email, 2=otp+password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  // Step 1 - Send OTP
  const handleSendOtp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return Alert.alert("Error", "Please enter your email");
    if (!emailRegex.test(email))
      return Alert.alert("Error", "Please enter a valid email");

    try {
      await api.post("/forgot-password", { email });
      setStep(2);
      Alert.alert("Success", "OTP has been sent to your email");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.statusText ||
        "Something went wrong. Please try again.";
      Alert.alert("Forgot Password Failed", message);
    }
  };

  // Step 2 - Verify OTP + Reset Password
  const handleResetPassword = async () => {
    if (!otp || !newPassword || !confirmPassword)
      return Alert.alert("Error", "Please fill all fields");
    if (newPassword !== confirmPassword)
      return Alert.alert("Error", "Passwords do not match");

    try {
      await api.patch("/reset-password", { email, otp, newPassword });
      Alert.alert("Success", "Password reset successfully");
      router.replace("login"); // go back to login page
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.statusText ||
        "Failed to reset password";
      Alert.alert("Error", message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        {step === 1 && "We will send an OTP to your registered email"}
        {step === 2 && "Enter OTP and your new password"}
      </Text>

      <View style={styles.form}>
        {step === 1 && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter your registered email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <Pressable style={styles.button} onPress={handleSendOtp}>
              <Text style={styles.buttonText}>Send OTP</Text>
            </Pressable>
          </>
        )}

        {step === 2 && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              keyboardType="numeric"
              value={otp}
              onChangeText={setOtp}
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Pressable style={styles.button} onPress={handleResetPassword}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </Pressable>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "8%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
  form: {
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007FFF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
