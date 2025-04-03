import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Button, Text } from "@rneui/base";
import { useTranslation } from "react-i18next";
import { Units } from "@/common/constants/units";
import { signInWithGoogle } from "@/services/google-auth.service";
import { GoogleAuthErrorType } from "@/services/google-auth.service";
import { useState } from "react";

export default function GoogleLoginScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError("");
      await signInWithGoogle();
      router.replace("/(tabs)" as any);
    } catch (err) {
      const error = err as GoogleAuthErrorType;
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        {t("auth.googleLogin.title")}
      </Text>
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <Button
        title={t("auth.googleLogin.button")}
        onPress={handleGoogleLogin}
        loading={isLoading}
        containerStyle={styles.button}
        icon={{
          name: "google",
          type: "font-awesome",
          color: "white",
          size: 20,
          style: { marginRight: 10 },
        }}
        testID="google_login_button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Units.s16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    textAlign: "center",
    marginBottom: Units.s32,
    color: "#000000",
  },
  button: {
    marginTop: Units.s16,
    marginBottom: Units.s8,
  },
  error: {
    color: "#FF0000",
    textAlign: "center",
    marginBottom: Units.s16,
  },
}); 