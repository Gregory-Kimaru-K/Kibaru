import { View, Text, StyleSheet, Image, StatusBar, ActivityIndicator, Dimensions, Pressable, Animated, PanResponder, TextInput, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Stack, useRouter } from 'expo-router'
import * as SecureStore from "expo-secure-store"
import {jwtDecode} from "jwt-decode"
import { Ionicons } from '@expo/vector-icons';

interface JwtPayload {
    role: string;
    exp: number;
    iat: number;
  }

const {width, height} = Dimensions.get("window")

const _layout = () => {
    const [loading, setLoading] = useState(true)
    const [userExists, setUserExists] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const router = useRouter()

    const loginFormPostion = useRef(new Animated.Value(height)).current;
    const logoHeight = useRef(new Animated.Value(height * 0.72)).current;
    const backButtonOpacity = useRef(new Animated.Value(0)).current;
    const labelPosition = useRef(new Animated.Value(14)).current;
    const labelFontSize = useRef(new Animated.Value(14)).current;
    const labelPositionLeft = useRef(new Animated.Value(8)).current;

    const closeKeyboard = () => {
        Keyboard.dismiss()
    }

    useEffect(() => {
        async function Waiting() {
            await new Promise(resolve => setTimeout(resolve, 5000))
            
            try{
                const storedTokens = await SecureStore.getItemAsync("AuthTokens")
                if (storedTokens){
                    const parsedTokens = JSON.parse(storedTokens)
                    const user = jwtDecode<JwtPayload>(parsedTokens.access)

                    if (user.role === "FREELANCER"){
                        router.replace("/(tabs)")
                    }else {
                        router.replace("/(emptabs)")
                    }
                    setUserExists(true)
                }
                else{
                    console.log("No Stored Tokens")
                    setUserExists(false)
                }
            }
            catch (error){
                console.log(`NJR_LAYOUT_ERROR: ${error}`)
                setUserExists(false)
            }
            finally{
                setLoading(false)
            }
        }
        Waiting()
    }, [])

    const openLoginForm = () => {
        setShowLogin(true)
        
        Animated.parallel([
            Animated.timing(loginFormPostion, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }),
            Animated.timing(logoHeight, {
                toValue: height * 0.4,
                duration: 500,
                useNativeDriver: false
            }),
            Animated.timing(backButtonOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            })
        ]).start()
    }

    const closeLoginForm = () => {
        setShowLogin(false)
        closeKeyboard()
        Animated.parallel([
            Animated.timing(loginFormPostion, {
                toValue: height,
                duration: 500,
                useNativeDriver: false
            }),
            Animated.timing(logoHeight, {
                toValue: height * 0.72,
                duration: 500,
                useNativeDriver: false
            }),
            Animated.timing(backButtonOpacity, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true
            })
        ]).start()

    }

    const FocusedAnimation = () => {
        Animated.parallel([
            Animated.timing(labelPosition, {
                toValue: 56,
                duration: 200,
                useNativeDriver: false
            }),
            Animated.timing(labelFontSize, {
                toValue: 12,
                duration: 200,
                useNativeDriver: false
            }),
            Animated.timing(labelPositionLeft, {
                toValue: 18,
                duration: 200,
                useNativeDriver: false
            })
        ]).start()
    }

    const BlurAnimation = () => {
        Animated.parallel([
            Animated.timing(labelPosition, {
                toValue: 20,
                duration: 200,
                useNativeDriver: false
            }),
            Animated.timing(labelFontSize, {
                toValue: 14,
                duration: 200,
                useNativeDriver: false
            }),
            Animated.timing(labelPositionLeft, {
                toValue: 2,
                duration: 200,
                useNativeDriver: false
            })
        ]).start()
    }

    return (
        <TouchableWithoutFeedback onPress={closeKeyboard}>
            <View style={styles.container}>
                <StatusBar backgroundColor={"#001729"} />
                <Animated.Image style={[styles.logo, {height: logoHeight}]} source={require("../assets/logos/Finallyrmbj.png")} />
                {loading ?
                    <View style={styles.activityInd}>
                        <ActivityIndicator color={"#FF550D"} size={40} />
                    </View>
                :
                    (!userExists ?
                    <View style={styles.buttonsView}>
                        <Pressable style={styles.btn2} onPress={openLoginForm}>
                            <Text style={{ color: "#ffffff", fontSize: 30 }}>Sign In</Text>
                        </Pressable>
                        <Pressable style={styles.btn}>
                            <Text style={{ color: "#001729", fontSize: 30 }}>Sign Up</Text>
                        </Pressable>
                    </View>
                    :
                        <Stack>
                            <Stack.Screen name='(tabs)' />
                            <Stack.Screen name='(emptabs)' />
                        </Stack>
                    )
                }
                <Animated.View style={[styles.signIn, {top: loginFormPostion}]}>
                    <Animated.View style={{ opacity: backButtonOpacity }}>
                        <Pressable onPress={closeLoginForm}>
                            <Ionicons name="arrow-back" size={30} color="#ffffff" />
                        </Pressable>
                    </Animated.View>
                    <View style={styles.signInForm}>
                        <Text style={styles.signInFormHeader}>Welcome Back</Text>
                        <View style={styles.ContInput}>
                            <TextInput style={styles.textInput} onFocus={FocusedAnimation} onBlur={BlurAnimation} />
                            <Animated.Text style={[styles.InputLabel, {left: labelPositionLeft, bottom: labelPosition, fontSize: labelFontSize}]}>
                                Email or Phone Number
                            </Animated.Text>
                        </View>
                    </View>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#001729",
        width: width,
        height: height,
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
        height: 56,
        alignItems:"center",
        justifyContent: "center",
        borderTopLeftRadius: 32,
    },
    btn2: {
        width: "48%",
        height: 56,
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
        backgroundColor: "#002542",
        borderTopLeftRadius: 56,
        borderTopRightRadius: 56
    },

    signInFormHeader: {
        fontSize: 42,
        fontWeight: 600,
        textAlign: "center",
        paddingBottom: 32,
        color: "#ffffff"
    },

    ContInput: {
        borderWidth: 1,
        borderColor: "#ffffff",
        borderRadius: 20,
        width: '96%',
        height: 64,
        alignSelf: "center"
    },

    textInput: {
        width: "96%",
        height: "100%",
        alignSelf: "center",
        fontSize: 24,
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
    }
})

export default _layout