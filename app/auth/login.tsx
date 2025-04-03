import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Button, Input, Text } from "@rneui/base";
import { login } from "@/services/login.service";
import { useTranslation } from "react-i18next";
import { Units } from "@/common/constants";
import { LoginErrorType } from "@/services/login.service";

export default function LoginScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError("");
      await login(email, password);
      router.replace("/(tabs)" as any);
    } catch (err) {
      const error = err as LoginErrorType;
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        {t("auth.login.title")}
      </Text>
      
      <Input
        placeholder={t("auth.login.emailPlaceholder")}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        containerStyle={styles.input}
        testID="login_email_input"
      />
      
      <Input
        placeholder={t("auth.login.passwordPlaceholder")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        containerStyle={styles.input}
        testID="login_password_input"
      />
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <Button
        title={t("auth.login.button")}
        onPress={handleLogin}
        loading={isLoading}
        containerStyle={styles.button}
        testID="login_submit_button"
      />
      
      <Button
        title={t("auth.login.registerLink")}
        type="clear"
        onPress={() => router.push("/auth/register" as any)}
        testID="login_register_link"
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
  input: {
    marginBottom: Units.s16,
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