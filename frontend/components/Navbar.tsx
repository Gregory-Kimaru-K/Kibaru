import { View, Dimensions, StyleSheet, StatusBar, Text, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Svg, { Path } from "react-native-svg";
import * as Font from 'expo-font';
import { Ionicons } from "@expo/vector-icons";
import AuthContext from "@/contexts/AuthContext";
import { useNavigation } from "expo-router";

const { width } = Dimensions.get("window");


const Navbar = (Props: {pageNav: "HOME" | "MY_JOBS" | "PENDING", setPageNav: (value: "HOME" | "MY_JOBS" | "PENDING") => void}) => {
    const [fontLoaded, setFontLoaded] = useState(false)
    const authcontext = useContext(AuthContext)
    const navigation = useNavigation();

    if (!authcontext){
      throw new Error("AuthContext is not available");
    }

    const { logout } = authcontext;

    useEffect(() => {
        async function FontLoad(){
            await Font.loadAsync({
                "AdiosAmigos": require("../assets/fonts/adios-amigos-regular.ttf")
            })
        }
        FontLoad().then(() => setFontLoaded(true)).catch(console.warn)   
    }, [])

    const handleLogout = () => {
      logout();
    }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#001729"} />
      <Svg
        width={width}
        height={320}
        viewBox={`0 0 ${width} 528`}
        preserveAspectRatio="none"
      >
        <Path
          d={`M${width} 0 H0 V250 C0 376 ${width * 0.3} 376 ${width * 0.35} 376 H${width * 0.7} C${width * 1.05} 376 ${width} 528 ${width} 528 V0 Z`}
          fill="#001729"
        />
      </Svg>
      <View style={styles.navcontainer}>
        <Text style={{ fontSize: 54, color: "#ffffff", fontWeight: 600, fontFamily: "AdiosAmigos" }}>
            KIBARU
        </Text>
        <Pressable style={styles.person} onPress={() => handleLogout()}>
            <Ionicons style={{ color: "#001729", fontSize: 32 }} name="person-outline" />
        </Pressable>
      </View>
      <View style={styles.navBar}>
        <Text 
          style={Props.pageNav ==="HOME" ?
            styles.navActive :
            styles.nav}
          
          onPress={() => Props.setPageNav("HOME")}>
            Home
        </Text>
        <Text 
          style={Props.pageNav ==="MY_JOBS" ?
            styles.navActive :
            styles.nav}
            
            onPress={() => Props.setPageNav("MY_JOBS")}>
            My Jobs
        </Text>
        <Text
          style={Props.pageNav ==="PENDING" ?
            styles.navActive :
            styles.nav}
            
            onPress={() => Props.setPageNav("PENDING")}>
            Pending
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "fixed",
    top: 0,
    backgroundColor: "transparent"
  },
  navcontainer: {
    position: "absolute",
    width: "100%",
    padding: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },

  person: {
    backgroundColor: "#FFFFFF",
    borderRadius: "50%",
    padding: 8
  },
  navBar: {
    position: "absolute",
    top: 120,
    width: "80%",
    padding: 8,
    borderRadius: 16,
    alignSelf: "center",
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#18215A"
  },
  nav: {
    fontSize: 22,
    color: "#FFFFFF"
  },
  navActive: {
    fontSize: 22,
    color: "#FFFFFF",
    backgroundColor: "#001729",
    padding: 6,
    borderRadius: 12
  }
});

export default Navbar;