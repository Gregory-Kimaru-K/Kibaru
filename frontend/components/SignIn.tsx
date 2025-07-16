import { View, Text, Animated, Keyboard, Pressable, Dimensions, StyleSheet, TextInput } from 'react-native'
import React, { use, useContext, useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import AuthContext from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

const {height} = Dimensions.get("window")

const SignIn = ({show, setShow}: {show: string | null, setShow: (value: string | null) => void}) => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        throw new Error("SignIn must be used within an AuthProvider");
    }
    const { login, forgotPassword, confirmCode, resetPassword } = authContext;
    const router = useRouter();
    const [step, setStep] = useState(1)

    const createAnimatedValues = () => ({
        labelPositionBottom: new Animated.Value(14),
        labelFontSize: new Animated.Value(14),
        labelPositionLeft: new Animated.Value(8)
    })

     const closeKeyboard = () => {
        Keyboard.dismiss()
    }

    // Animated values for the login form
    const loginFormPostion = useRef(new Animated.Value(height)).current;
    const logoHeight = useRef(new Animated.Value(height * 0.72)).current;
    const backButtonOpacity = useRef(new Animated.Value(0)).current;
    const submitButton = useRef(new Animated.Value(0)).current
    const confirmBtn = useRef(new Animated.Value(0)).current;
    const [emailAnimations, setEmailAnimations] = useState(createAnimatedValues());
    const [emailConfirmAnimations, setEmailConfirmAnimations] = useState(createAnimatedValues());
    const [codeAnimations, setCodeAnimations] = useState(createAnimatedValues());
    const [newPasswordAnimations, setNewPasswordAnimations] = useState(createAnimatedValues());
    const [confirmPasswordAnimations, setConfirmPasswordAnimations] = useState(createAnimatedValues());
    const [passwordAnimations, setPasswordAnimations] = useState(createAnimatedValues());

    const [loginData, setLoginData] = useState<{ email?: string; password?: string }>({});
    const [securePassword, setsecurePassword] = useState(true);
    const [securePassword1, setsecurePassword1] = useState(true);
    const [securePassword2, setsecurePassword2] = useState(true);
    const [showError, setShowError] = useState(false);
    const [showError1, setShowError1] = useState(false);
    const [showError2, setShowError2] = useState(false);
    const [showError3, setShowError3] = useState(false);
    const [showError4, setShowError4] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessage1, setErrorMessage1] = useState("");
    const [errorMessage2, setErrorMessage2] = useState("");
    const [errorMessage3, setErrorMessage3] = useState("");
    const [errorMessage4, setErrorMessage4] = useState("");
     const openLoginForm = () => {
            Animated.parallel([
                Animated.timing(loginFormPostion, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: false
                }),
                Animated.timing(backButtonOpacity, {
                    toValue: 1,
                    duration: 1000,
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
                toValue: 14,
                duration: 200,
                useNativeDriver: false
            }),
            Animated.timing(animations.labelFontSize, {
                toValue: 14,
                duration: 200,
                useNativeDriver: false
            }),
            Animated.timing(animations.labelPositionLeft, {
                toValue: 8,
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

    const confirmBtnColors = confirmBtn.interpolate({
        inputRange: [0,1],  
        outputRange: ['#FF4C00', '#9A2E00']
    })

    const handleLogin = async () => {
        setErrorMessage("");
        setShowError(false);
        if (!loginData.email || !loginData.password){
            console.log("Please fill in all fields")
            setErrorMessage("Please fill in all fields");
            setShowError(true);
            return;
        } else {
            const response = await login({
                email: loginData.email,
                password: loginData.password
            });
            if (response.success) {
                console.log("Login successful");
                closeLoginForm();
                router.replace("/(tabs)")
            } else {
                console.log(`Login failed: ${response.data}`);
                setErrorMessage(response.data || "Login failed");
                setShowError(true);
            }
        }
    }

    const [forgotEmail, setForgotEmail] = useState("")
    const [code, setCode] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const handleforgotPassword = async (email: string) => {
        setErrorMessage1("");
        setShowError1(false);
        if (!email) {
            console.log("Please enter your email");
            setErrorMessage1("Please enter your email");
            setShowError1(true);
            return;
        }
        const response = await forgotPassword({email});
        if (response.success) {
            console.log("Password reset email sent successfully");
            setStep(3);
        } else {
            console.log(`Password reset failed: ${response.data}`);
            setErrorMessage1(response.data || "Password reset failed");
            setShowError1(true);
        }
    }
    const handleCodevalidation = async (code: string) => {
        setErrorMessage2("");
        setShowError2(false);
        if (!code) {
            console.log("Please enter the code");
            setErrorMessage2("Please enter the code");
            setShowError2(true);
            return;
        }
        const response = await confirmCode({email: forgotEmail, code});
        if (response.success) {
            console.log("Code confirmed successfully");
            setStep(4);
        } else {
            console.log(`Code confirmation failed: ${response.data}`);
            setErrorMessage2(response.data || "Code confirmation failed");
            setShowError2(true);
        }
    }

    const handleNewPassword = async () => {
        setErrorMessage3("");
        setShowError3(false);
        setErrorMessage4("");
        setShowError4(false);
        if (!newPassword || !confirmPassword) {
            console.log('Please fill in all fields');
            setErrorMessage3("Please fill in all fields");
            setErrorMessage4("Please fill in all fields");
            setShowError3(true);
            setShowError4(true);

            return;
        }

        if (newPassword !== confirmPassword) {
            console.log("Passwords donot match");
            setErrorMessage4("Passwords do not match");
            setShowError4(true);
            return;
        }

        if (newPassword.length < 8) {
            console.log("Password must be at least 8 characters long");
            setErrorMessage3("Password must be at least 8 characters long");
            setShowError3(true);
            return;
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(newPassword)) {
            console.log("Password must contain at least one uppercase letter, one lowercase letter, and one number");
            setErrorMessage3("Password must contain at least one uppercase letter, one lowercase letter, and one number");
            setShowError3(true);
            return;
        }

        if (newPassword === confirmPassword) {
            const response = await resetPassword({email: {forgotEmail}, password: newPassword});
            if (response.success) {
                console.log("Password reset successfully");
                setStep(1);
            }
            else {
                console.log(`Password reset failed: ${response.data}`);
                setErrorMessage3(response.data || "Password reset failed");
                setShowError3(true);
            }
        }
    }
    return (
        <Animated.View style={[styles.signIn, {top: loginFormPostion}]}>
            {step === 1 && (
                <View>
                    <Animated.View style={{ opacity: backButtonOpacity }}>
                        <Pressable style={{ marginTop: 20 }} onPress={closeLoginForm}>
                            <Ionicons name="arrow-back" size={30} color="#ffffff" />
                        </Pressable>
                    </Animated.View>
                    <View style={styles.signInForm}>
                        <Text style={styles.signInFormHeader}>Welcome Back</Text>
                        {showError && (
                            <Text style={[styles.signInFormHeader, 
                                {fontSize: 20, paddingBottom: 12, textAlign: 'left', color: "#FF3636"}]}>
                                    * {showError ? errorMessage : ""}
                            </Text>)}
                        <View style={styles.ContInput}>
                            <TextInput
                                style={styles.textInput}
                                onFocus={() => FocusedAnimation(emailAnimations)}
                                onBlur={() => !loginData.email && BlurAnimation(emailAnimations)}
                                value={loginData.email}
                                onChangeText={(text) => setLoginData({...loginData, email: text})}
                                />
                            <Animated.Text style={[styles.InputLabel, {left: emailAnimations.labelPositionLeft, bottom: emailAnimations.labelPositionBottom, fontSize: emailAnimations.labelFontSize}]}>
                                Email or Phone Number
                            </Animated.Text>
                        </View>
                        <View style={styles.ContInput}>
                            <TextInput
                                style={styles.textInput}
                                onFocus={() => FocusedAnimation(passwordAnimations)}
                                onBlur={() => !loginData.password && BlurAnimation(passwordAnimations)}
                                value={loginData.password}
                                onChangeText={(text) => setLoginData({...loginData, password: text})}
                                secureTextEntry={securePassword}
                                />
                            <Animated.Text style={[styles.InputLabel, {left: passwordAnimations.labelPositionLeft, bottom: passwordAnimations.labelPositionBottom, fontSize: passwordAnimations.labelFontSize}]}>
                                Password
                            </Animated.Text>
                            <Pressable
                                style={styles.eye}
                                onPress={() => setsecurePassword(!securePassword)}
                                >
                                {securePassword ? <Ionicons name="eye-off-outline" size={24} color="rgba(255, 255, 255, 0.4)" /> : <Ionicons name="eye-outline" size={24} color="rgba(255, 255, 255, 0.4)" /> }
                            </Pressable>
                            <Text 
                            style= {{ 
                                color: "#FF550D",
                                fontSize: 22,
                                fontWeight: 600,
                                textAlign: "right",
                                textDecorationLine: "underline",
                                marginLeft: 16,
                             }}
                                onPress={() => 
                                    {setShowError(false)
                                    setStep(2)}}>
                                    Forgot Password
                                </Text>
                        </View>
                        <Pressable
                            onPress={ButtonAnimation}
                            onPressOut={handleLogin}
                        >
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
                </View>
            )}
            {step === 2 && (
                <View>
                    <Animated.View style={{ opacity: backButtonOpacity }}>
                        <Pressable style={{ marginTop: 20 }} onPress={() => setStep(1)}>
                            <Ionicons name="arrow-back" size={30} color="#ffffff" />
                        </Pressable>
                    </Animated.View>
                    <View style={styles.signInForm}>
                        <Text style={styles.signInFormHeader}>Enter Email</Text>
                        {showError1 && (
                            <Text style={[styles.signInFormHeader, 
                                {fontSize: 20, paddingBottom: 12, textAlign: 'left', color: "#FF3636"}]}>
                                    * {showError1 ? errorMessage1 : ""}
                            </Text>)}
                        <View style={styles.ContInput}>
                            <TextInput
                                style={styles.textInput}
                                onFocus={() => FocusedAnimation(emailConfirmAnimations)}
                                onBlur={() => !forgotEmail && BlurAnimation(emailConfirmAnimations)}
                                value={forgotEmail}
                                onChangeText={(text) => setForgotEmail(text)}
                                keyboardType='email-address'
                                />
                            <Animated.Text style={[styles.InputLabel, {left: emailConfirmAnimations.labelPositionLeft, bottom: emailConfirmAnimations.labelPositionBottom, fontSize: emailConfirmAnimations.labelFontSize}]}>
                                Email
                            </Animated.Text>
                        </View>
                        <Pressable
                            onPress={ButtonAnimation}
                            onPressOut={() => handleforgotPassword(forgotEmail)}
                        >
                            <Animated.View style={[styles.submitBtn, {backgroundColor: submitedButtonColors}]}>
                                <Text style={styles.submitBtnText}>
                                    Enter
                                </Text>
                            </Animated.View>
                        </Pressable>
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Don't have an account?  <Text style={styles.footerHighlights} onPress={toggleLoginForms}>Signup</Text></Text>
                        </View>
                    </View>
                </View>
            )}
            {step === 3 && (
                <View>
                    <Animated.View style={{ opacity: backButtonOpacity }}>
                        <Pressable style={{ marginTop: 20 }} onPress={() => setStep(2)}>
                            <Ionicons name="arrow-back" size={30} color="#ffffff" />
                        </Pressable>
                    </Animated.View>
                    <View style={styles.signInForm}>
                        <Text style={[styles.signInFormHeader, {fontSize: 24}]}>Check <Text style={{ color: "#FF550D" }}>{forgotEmail}</Text></Text>
                        {showError2 && (
                            <Text style={[styles.signInFormHeader, 
                                {fontSize: 20, paddingBottom: 12, textAlign: 'left', color: "#FF3636"}]}>
                                    * {showError2 ? errorMessage2 : ""}
                            </Text>)}
                        <View style={styles.ContInput}>
                            <TextInput
                                style={styles.textInput}
                                onFocus={() => FocusedAnimation(codeAnimations)}
                                onBlur={() => !code && BlurAnimation(codeAnimations)}
                                value={code}
                                onChangeText={(text) => setCode(text)}
                                />
                            <Animated.Text style={[styles.InputLabel, {left: codeAnimations.labelPositionLeft, bottom: codeAnimations.labelPositionBottom, fontSize: codeAnimations.labelFontSize}]}>
                                Enter code
                            </Animated.Text>
                        </View>
                        <Pressable
                            onPress={ButtonAnimation}
                            onPressOut={() => handleCodevalidation(code)}
                        >
                            <Animated.View style={[styles.submitBtn, {backgroundColor: confirmBtnColors}]}>
                                <Text style={styles.submitBtnText}>
                                    Confirm
                                </Text>
                            </Animated.View>
                        </Pressable>
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Don't have an account?  <Text style={styles.footerHighlights} onPress={toggleLoginForms}>Signup</Text></Text>
                        </View>
                    </View>
                </View>
            )}
            {step === 4 && (
                <View>
                    <Animated.View style={{ opacity: backButtonOpacity }}>
                        <Pressable style={{ marginTop: 20 }} onPress={() => setStep(3)}>
                            <Ionicons name="arrow-back" size={30} color="#ffffff" />
                        </Pressable>
                    </Animated.View>
                    <View style={styles.signInForm}>
                        <Text style={styles.signInFormHeader}>Update Password</Text>
                        <View style={styles.ContInput}>
                            <TextInput
                                style={styles.textInput}
                                onFocus={() => FocusedAnimation(newPasswordAnimations)}
                                onBlur={() => !newPassword && BlurAnimation(newPasswordAnimations)}
                                value={newPassword}
                                onChangeText={(text) => setNewPassword(text)}
                                secureTextEntry={securePassword1}
                                />
                            <Animated.Text style={[styles.InputLabel, {left: newPasswordAnimations.labelPositionLeft, bottom: newPasswordAnimations.labelPositionBottom, fontSize: newPasswordAnimations.labelFontSize}]}>
                                Password
                            </Animated.Text>
                            <Pressable
                                style={styles.eye}
                                onPress={() => setsecurePassword1(!securePassword1)}
                                >
                                {securePassword1 ? <Ionicons name="eye-off-outline" size={24} color="rgba(255, 255, 255, 0.4)" /> : <Ionicons name="eye-outline" size={24} color="rgba(255, 255, 255, 0.4)" /> }
                            </Pressable>
                            {showError3 && (
                                <Text style={[styles.signInFormHeader, 
                                    {fontSize: 20, paddingBottom: 12, textAlign: 'left', color: "#FF3636"}]}>
                                        * {showError3 ? errorMessage3: ""}
                                </Text>)}
                        </View>
                         <View style={styles.ContInput}>
                            <TextInput
                                style={styles.textInput}
                                onFocus={() => FocusedAnimation(confirmPasswordAnimations)}
                                onBlur={() => !code && BlurAnimation(confirmPasswordAnimations)}
                                value={confirmPassword}
                                onChangeText={(text) => setConfirmPassword(text)}
                                secureTextEntry={securePassword2}
                                />
                            <Animated.Text style={[styles.InputLabel, {left: confirmPasswordAnimations.labelPositionLeft, bottom: confirmPasswordAnimations.labelPositionBottom, fontSize: confirmPasswordAnimations.labelFontSize}]}>
                                Confirm Password
                            </Animated.Text>
                            <Pressable
                                style={styles.eye}
                                onPress={() => setsecurePassword2(!securePassword2)}
                                >
                                {securePassword2 ? <Ionicons name="eye-off-outline" size={24} color="rgba(255, 255, 255, 0.4)" /> : <Ionicons name="eye-outline" size={24} color="rgba(255, 255, 255, 0.4)" /> }
                            </Pressable>
                            {showError4 && (
                                <Text style={[styles.signInFormHeader, 
                                    {fontSize: 20, paddingBottom: 12, textAlign: 'left', color: "#FF3636"}]}>
                                        * {showError4 ? errorMessage4: ""}
                                </Text>)}
                        </View>
                        <Pressable
                            onPress={ButtonAnimation}
                            onPressOut={() => handleNewPassword()}
                        >
                            <Animated.View style={[styles.submitBtn, {backgroundColor: confirmBtnColors}]}>
                                <Text style={styles.submitBtnText}>
                                    Confirm
                                </Text>
                            </Animated.View>
                        </Pressable>
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Don't have an account?  <Text style={styles.footerHighlights} onPress={toggleLoginForms}>Signup</Text></Text>
                        </View>
                    </View>
                </View>
            )}
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