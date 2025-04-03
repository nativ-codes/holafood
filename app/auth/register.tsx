import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Button, Input, Text } from "@rneui/base";
import { register } from "@/services/register.service";
import { useTranslation } from "react-i18next";
import { Units } from "@/common/constants";
import { RegisterErrorType } from "@/services/register.service";

export default function RegisterScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      setError("");

      if (password !== confirmPassword) {
        setError(t("auth.register.passwordMismatch"));
        return;
      }

      await register(email, password);
      router.replace("/(tabs)" as any);
    } catch (err) {
      const error = err as RegisterErrorType;
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        {t("auth.register.title")}
      </Text>
      
      <Input
        placeholder={t("auth.register.emailPlaceholder")}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        containerStyle={styles.input}
        testID="register_email_input"
      />
      
      <Input
        placeholder={t("auth.register.passwordPlaceholder")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        containerStyle={styles.input}
        testID="register_password_input"
      />

      <Input
        placeholder={t("auth.register.confirmPasswordPlaceholder")}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        containerStyle={styles.input}
        testID="register_confirm_password_input"
      />
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <Button
        title={t("auth.register.button")}
        onPress={handleRegister}
        loading={isLoading}
        containerStyle={styles.button}
        testID="register_submit_button"
      />
      
      <Button
        title={t("auth.register.loginLink")}
        type="clear"
        onPress={() => router.push("/auth/login" as any)}
        testID="register_login_link"
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