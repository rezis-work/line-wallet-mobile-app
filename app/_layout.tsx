import { SafeScreen } from "@/components/safe-screen";
import { ClerkProvider } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { StatusBar } from "expo-status-bar";
import { Alert } from "react-native";
import Constants from "expo-constants";
import * as Updates from "expo-updates";

function getClerkKey(): string | undefined {
  return (
    process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    Constants.expoConfig?.extra?.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    // for older SDKs / OTA payloads:
    (Constants as any)?.manifest?.extra?.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    (Updates as any)?.manifest?.extra?.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
  );
}

const publishableKey = getClerkKey();

export default function RootLayout() {
  if (!publishableKey) {
    Alert.alert("Configuration error", "Clerk key is missing");
    throw new Error("Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY");
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <SafeScreen>
        <Slot />
      </SafeScreen>
      <StatusBar style="dark" />
    </ClerkProvider>
  );
}
