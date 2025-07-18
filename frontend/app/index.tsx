import { View, Text, StyleSheet, StatusBar, ActivityIndicator, Dimensions, Pressable, Animated, PanResponder, TextInput, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Stack, useRouter } from 'expo-router'
import * as SecureStore from "expo-secure-store"
import {jwtDecode} from "jwt-decode"
import SignIn from '@/components/SignIn'
import SignUp from '@/components/Signup'
import { UserProvider } from '@/contexts/UserContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'

interface JwtPayload {
    role: string;
    exp: number;
    iat: number;
  }

const {width, height} = Dimensions.get("window")

const index = () => {
    const [loading, setLoading] = useState(false)
    const [userExists, setUserExists] = useState(false)
    const [showLogin, setShowLogin] = useState<null | string>(null)
    const router = useRouter()
    const logoHeight = useRef(new Animated.Value(height * 0.72)).current;

    if (showLogin !== null){
        Animated.timing(logoHeight, {
            toValue: height * 0.4,
            duration: 500,
            useNativeDriver: false
        }).start()
    } else {
        Animated.timing(logoHeight, {
            toValue: height * 0.72,
            duration: 500,
            useNativeDriver: false
        }).start()
    }


    const closeKeyboard = () => {
        Keyboard.dismiss()
    }

    return (
        <AuthProvider>
            <UserProvider>
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={closeKeyboard}>
                    <SafeAreaView style={styles.container}>
                        <StatusBar backgroundColor={"#001729"} />
                        <Animated.Image style={[styles.logo, {height: logoHeight}]} source={require("../assets/logos/Finallyrmbj.png")} />
                        {loading ?
                            <View style={styles.activityInd}>
                                <ActivityIndicator color={"#FF550D"} size={40} />
                            </View>
                        :
                            (!userExists ?
                            <View style={styles.buttonsView}>
                                <Pressable style={styles.btn2} onPress={() => router.replace("/freelance")}>
                                    <Text style={{ color: "#ffffff", fontSize: 30 }}>Sign In</Text>
                                </Pressable>
                                <Pressable style={styles.btn} onPress={() => setShowLogin("SIGNUP")}>
                                    <Text style={{ color: "#001729", fontSize: 30 }}>Sign Up</Text>
                                </Pressable>
                            </View>
                            :
                                <Stack>
                                    <Stack.Screen name='(tabs)' />
                                </Stack>
                            )
                        }
                        <SignIn show={showLogin} setShow={setShowLogin} />
                        <SignUp show={showLogin} setShow={setShowLogin} />
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </UserProvider>
        </AuthProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#001729",
        width: width,
        justifyContent: "space-between"
    },

    logo: {
        width: "100%",
        height: "72%",
        resizeMode: "contain",
    },

    activityInd: {
        height: "100%"
    },

    buttonsView: {
        flexDirection:"row",
        justifyContent: "space-between"
    },

    btn: {
        backgroundColor: "#FF550D",
        width: "48%",
        height: 48,
        alignItems:"center",
        justifyContent: "center",
        borderTopLeftRadius: 32,
    },
    btn2: {
        width: "48%",
        height: 48,
        alignItems:"center",
        justifyContent: "center"
    },

    signIn: {
        position: "absolute",
        width: "100%",
        height: height
    },

    signInForm: {
        top: height * 0.15,
        height: height * 0.85,
        backgroundColor: "#032139",
        borderTopLeftRadius: 56,
        borderTopRightRadius: 56,
    },

    signInFormHeader: {
        fontSize: 42,
        fontWeight: 600,
        textAlign: "center",
        paddingBottom: 56,
        color: "#ffffff"
    },

    ContInput: {
        borderWidth: 1,
        borderColor: "#ffffff",
        borderRadius: 20,
        width: '96%',
        height: 64,
        alignSelf: "center",
        marginBottom: 48,
    },

    textInput: {
        width: "96%",
        height: "100%",
        alignSelf: "center",
        fontSize: 24,
        color: "#FFFFFF"
    },

    InputLabel: {
        position: "absolute",
        left: 18,
        bottom: 56,
        backgroundColor: "#002542",
        color: "#ffffff",
        paddingHorizontal: 4,
        fontSize: 12,
        fontWeight: 300
    },
    submitBtn: {
        backgroundColor: "#FF550D",
        width:"64%",
        height: 56,
        borderRadius: 20,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    submitBtnText: {
        fontSize: 32,
    },
    footer: {
        position: "absolute",
        bottom: "25%",
        width: "100%",
        alignItems: "center",
    },
    footerText: {
        fontSize: 18,
        color: "#ffffff"
    },
    footerHighlights: {
        color: "#FF550D",
        fontSize: 22,
        fontWeight: 600
    }
})

export default index