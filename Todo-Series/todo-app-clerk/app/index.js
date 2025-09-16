import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

const Index = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FF5722" />
      </View>
    );
  }

  return isSignedIn ? (
    <Redirect href="/(tabs)/home" />
  ) : (
    <Redirect href="/(authenticate)/login" />
  );
};

export default Index;

const styles = StyleSheet.create({});
