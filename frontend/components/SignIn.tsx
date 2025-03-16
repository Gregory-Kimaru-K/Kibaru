import { View, Text, Animated, Keyboard, Pressable, Dimensions, StyleSheet, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';

const {height} = Dimensions.get("window")

const SignIn = ({show, setShow}: {show: string | null, setShow: (value: string | null) => void}) => {
    const createAnimatedValues = () => ({
        labelPositionBottom: new Animated.Value(14),
        labelFontSize: new Animated.Value(14),
        labelPositionLeft: new Animated.Value(8)
    })

     const closeKeyboard = () => {
        Keyboard.dismiss()
    }

    const loginFormPostion = useRef(new Animated.Value(height)).current;
    const logoHeight = useRef(new Animated.Value(height * 0.72)).current;
    const backButtonOpacity = useRef(new Animated.Value(0)).current;
    const submitButton = useRef(new Animated.Value(0)).current
    const [emailAnimations, setEmailAnimations] = useState(createAnimatedValues());
    const [passwordAnimations, setPasswordAnimations] = useState(createAnimatedValues());

     const openLoginForm = () => {
            Animated.parallel([
                Animated.timing(loginFormPostion, {
                    toValue: 0,
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
        setShow(null)
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
    const toggleLoginForms = () => {
        closeLoginForm()
        setShow("SIGNUP")
    }
    const FocusedAnimation = (animations: {labelPositionBottom: Animated.Value, labelFontSize: Animated.Value, labelPositionLeft: Animated.Value}) => {
        Animated.parallel([
            Animated.timing(animations.labelPositionBottom, {
                toValue: 56,
                duration: 200,
                useNativeDriver: false
            }),
            Animated.timing(animations.labelFontSize, {
                toValue: 12,
                duration: 200,
                useNativeDriver: false
            }),
            Animated.timing(animations.labelPositionLeft, {
                toValue: 18,
                duration: 200,
                useNativeDriver: false
            })
        ]).start()
    }

    const BlurAnimation = (animations: {labelPositionBottom: Animated.Value, labelFontSize: Animated.Value, labelPositionLeft: Animated.Value}) => {
        Animated.parallel([
            Animated.timing(animations.labelPositionBottom, {
                toValue: 20,
                duration: 200,
                useNativeDriver: false
            }),
            Animated.timing(animations.labelFontSize, {
                toValue: 14,
                duration: 200,
                useNativeDriver: false
            }),
            Animated.timing(animations.labelPositionLeft, {
                toValue: 2,
                duration: 200,
                useNativeDriver: false
            })
        ]).start()
    }

    const ButtonAnimation = () => {
        Animated.sequence([
            Animated.timing(submitButton, {
                toValue: 1,
                duration: 10,
                useNativeDriver: false
            }),
            Animated.timing(submitButton, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false
            })
        ]).start()
    }

    if (show === "SIGNIN"){
        openLoginForm()
    }

    const submitedButtonColors = submitButton.interpolate({
        inputRange: [0,1],
        outputRange: ['#FF4C00', '#9A2E00']
    })
    return (
        <Animated.View style={[styles.signIn, {top: loginFormPostion}]}>
            <Animated.View style={{ opacity: backButtonOpacity }}>
                <Pressable onPress={closeLoginForm}>
                    <Ionicons name="arrow-back" size={30} color="#ffffff" />
                </Pressable>
            </Animated.View>
            <View style={styles.signInForm}>
                <Text style={styles.signInFormHeader}>Welcome Back</Text>
                <View style={styles.ContInput}>
                    <TextInput style={styles.textInput} onFocus={() => FocusedAnimation(emailAnimations)} onBlur={() => BlurAnimation(emailAnimations)} />
                    <Animated.Text style={[styles.InputLabel, {left: emailAnimations.labelPositionLeft, bottom: emailAnimations.labelPositionBottom, fontSize: emailAnimations.labelFontSize}]}>
                        Email or Phone Number
                    </Animated.Text>
                </View>
                <View style={styles.ContInput}>
                    <TextInput style={styles.textInput} onFocus={() => FocusedAnimation(passwordAnimations)} onBlur={()=>BlurAnimation(passwordAnimations)} />
                    <Animated.Text style={[styles.InputLabel, {left: passwordAnimations.labelPositionLeft, bottom: passwordAnimations.labelPositionBottom, fontSize: passwordAnimations.labelFontSize}]}>
                        Password
                    </Animated.Text>
                    <Pressable style={styles.eye}>
                        <Ionicons name="eye-off-outline" size={24} color="rgba(255, 255, 255, 0.4)" />
                    </Pressable>
                </View>
                <Pressable onPress={ButtonAnimation}>
                    <Animated.View style={[styles.submitBtn, {backgroundColor: submitedButtonColors}]}>
                        <Text style={styles.submitBtnText}>
                            Login
                        </Text>
                    </Animated.View>
                </Pressable>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account?  <Text style={styles.footerHighlights} onPress={toggleLoginForms}>Signup</Text></Text>
                </View>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
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
    },
    eye: {
        position: "absolute",
        right: 8,
        top: "30%"
    }
})
export default SignIn