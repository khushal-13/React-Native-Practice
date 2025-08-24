import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCurrentUser, logout } from "../../../appwrite/authService";
import { useRouter } from "expo-router";

const Index = () => {

  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace("/(authenticate)/Login");
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={styles.container}>
        <Text> Hello World !!</Text>
        <Text variant="headlineMedium">
          {user ? `Welcome, ${user.name} 🎉` : "Loading..."}
        </Text>
        {user && (
          <Text variant="bodyMedium" style={{ marginTop: 5 }}>
            {user.email}
          </Text>
        )}

        <Button
          style={{ marginTop: 20 }}
          onPress={handleLogout}
          title="Logout"
        >
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({});
