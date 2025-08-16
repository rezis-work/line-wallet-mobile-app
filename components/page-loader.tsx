import { COLORS } from "@/constants/colors";
import { ActivityIndicator, View } from "react-native";

export const PageLoader = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};
