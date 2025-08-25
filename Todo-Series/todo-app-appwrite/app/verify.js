import { useEffect } from "react";
import { Alert, View, Text } from "react-native";
import { useSearchParams, useRouter } from "expo-router";
import { account } from "../appwrite/appwrite";

export default function Verify() {
  const { userId, secret } = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const confirm = async () => {
      if (userId && secret) {
        try {
          await account.updateVerification(userId, secret);
          Alert.alert("✅ Success", "Your email has been verified!");
          router.replace("/(tabs)/Login");
        } catch (error) {
          Alert.alert("❌ Error", error.message || "Verification failed");
        }
      }
    };
    confirm();
  }, [userId, secret]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Verifying your account...</Text>
    </View>
  );
}
