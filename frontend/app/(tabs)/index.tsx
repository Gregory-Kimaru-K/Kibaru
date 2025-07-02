import { View, StyleSheet, Animated, Text, Pressable } from "react-native";
import React, { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import { Ionicons } from "@expo/vector-icons";
import Home from "@/components/Home";
import MyJobs from "@/components/MyJobs";
import Pending from "@/components/Pending";
import { useNavigation } from "expo-router";
import { AuthProvider } from "@/contexts/AuthContext";

const Index = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [pageNav, setPageNav] = useState<"HOME" | "MY_JOBS" | "PENDING">("HOME")
  const navigation = useNavigation()

  const handleAddJob = () => {
    navigation.navigate("jobs/addjob")
  }

  // Clamping the scroll value
  const diffClamp = Animated.diffClamp(scrollY, 0, 320);

  // Interpolating Navbar position
  const translateY = diffClamp.interpolate({
    inputRange: [0, 320],
    outputRange: [0, -240],
    extrapolate: "clamp", // Prevents overflow
  });

  return (
    <AuthProvider>
      <View style={styles.container}>
        {/* Animated Navbar */}
        <Animated.View style={[styles.navbar, { transform: [{ translateY }] }]}>
          <Navbar pageNav={pageNav} setPageNav={setPageNav} />
        </Animated.View>

        {/* Scrollable Content */}
        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16} // Smooth scrolling
          style={{ marginTop: 130 }}
        >
          {pageNav === "HOME" && <Home />}
          {pageNav === "MY_JOBS" && <MyJobs />}
          {pageNav === "PENDING" && <Pending />}
        </Animated.ScrollView>
        <Pressable style={styles.add} onPress={handleAddJob}>
          <Ionicons style={{ fontSize: 40,color: "#FFFFFF" }} name="add-outline" />
        </Pressable>
      </View>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 200,
  },
  add: {
    position: "absolute",
    bottom: "2%",
    left: "76%",
    zIndex: 100,
    width: 72,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#001729",
  }
});

export default Index;