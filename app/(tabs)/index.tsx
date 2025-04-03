import React from 'react';
import { Image, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@rneui/base';
import { useTranslation } from 'react-i18next';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Units } from '@/common/constants';
import { signOut } from '@/services/google-auth.service';
import { useAuth } from '@/contexts/auth.context';

export default function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          {isAuthenticated ? `Welcome, ${user?.displayName || 'User'}!` : 'Welcome!'}
        </ThemedText>
        <HelloWave />
      </ThemedView>

      {isAuthenticated && user && (
        <ThemedView style={styles.userContainer}>
          <ThemedText type="subtitle">Your Profile</ThemedText>
          <ThemedText>Email: {user.email}</ThemedText>
          <ThemedText>User ID: {user.id}</ThemedText>
        </ThemedView>
      )}

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.authContainer}>
        {!isAuthenticated ? (
          <>
            <Button
              title={t("auth.login.button")}
              onPress={() => router.push("/auth/login" as any)}
              containerStyle={styles.authButton}
              testID="home_login_button"
            />
            <Button
              title={t("auth.googleLogin.button")}
              onPress={() => router.push("/auth/google-login" as any)}
              containerStyle={styles.authButton}
              icon={{
                name: "google",
                type: "font-awesome",
                color: "white",
                size: 20,
                style: { marginRight: 10 },
              }}
              testID="home_google_login_button"
            />
          </>
        ) : (
          <Button
            title="Sign Out"
            onPress={() => signOut()}
            containerStyle={styles.authButton}
            testID="home_signout_button"
          />
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userContainer: {
    gap: 8,
    marginBottom: Units.s16,
    padding: Units.s16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  authContainer: {
    marginTop: Units.s16,
    alignItems: 'center',
    gap: Units.s8,
  },
  authButton: {
    width: '100%',
    maxWidth: 300,
  },
});
