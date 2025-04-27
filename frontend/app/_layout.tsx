import { View, Image, StatusBar, ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Slot, Stack, Tabs, useNavigationContainerRef, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  role: string;
  exp: number;
  iat: number;
}

const { width, height } = Dimensions.get("window");

const _layout = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    async function checkAuth() {
      try {
        setLoading(true)
        const storedTokens = await SecureStore.getItemAsync("AuthTokens");

        if (storedTokens) {
          console.log("Stored Tokens:", storedTokens);
          const parsedTokens = JSON.parse(storedTokens);
          jwtDecode<JwtPayload>(parsedTokens.access);

          setIsAuthenticated(true); // ✅ Set navigation target
        } else {
          console.log("No Stored Tokens");
          setIsAuthenticated(false); // ✅ Set navigation target
        }
      } catch (error) {
        console.log(`NJR_LAYOUT_ERROR: ${error}`);
        setIsAuthenticated(false);
      } finally {
        setLoading(false)
      }
    }

    checkAuth();
  }, []);

  // ✅ Navigate only after component is mounted
    useEffect(() => {
        if (!loading && isAuthenticated !== null) {
          router.replace(isAuthenticated ? "/(tabs)" : "/");
        }
        setLoading(false)
    }, [loading, isAuthenticated]);

  if (loading || isAuthenticated === null) {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={"#001729"} />
        <Image style={styles.logo} source={require("../assets/logos/Finallyrmbj.png")} />
        <View style={styles.activityInd}>
          <ActivityIndicator color={"#FF550D"} size={40} />
        </View>
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001729",
    width: width,
    justifyContent: "space-between",
  },
  logo: {
    width: "100%",
    height: "72%",
    resizeMode: "contain",
  },
  activityInd: {
    height: "100%",
  },
});

export default _layout;