import { View, Text, Animated, Dimensions, Keyboard, Pressable, TextInput, StyleSheet, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/constants/signup/styles';
import { FocusedAnimation, BlurAnimation } from '@/constants/signup/animations';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';

const {height} = Dimensions.get("window")
const skills = [
    { id: "1", category: "Construction & Engineering", subSkills: ["Plumbing", "Painting"] },
    { id: "2", category: "Electrical & Maintenance", subSkills: ["Wiring", "AC Repair"] },
    { id: "3", category: "Carpentry", subSkills: ["Furniture Making", "Wood Polishing"] },
    { id: "4", category: "Welding", subSkills: ["Metal Cutting", "Arc Welding"] },
    { id: "5", category: "Construction & Engineering", subSkills: ["Plumbing", "Painting"] },
    { id: "6", category: "Electrical & Maintenance", subSkills: ["Wiring", "AC Repair"] },
    { id: "7", category: "Carpentry", subSkills: ["Furniture Making", "Wood Polishing"] },
    { id: "8", category: "Welding", subSkills: ["Metal Cutting", "Arc Welding"] },
  ];

const SignUp = ({show, setShow}: {show: string | null, setShow: (value: string | null) => void}) => {
    const [role, setRole] = useState<null | string>(null)
    const [signupData, setSignupData] = useState<Record<string, string>>({})
    const [code, setCode] = useState<null | string>(null)
    const [step, setStep] = useState<number>(1)
    const [password, setPassword] = useState<null | string>(null)
    const [confirm, setConfirm] = useState<null | string>(null)
    const [passwordVisibility, setpasswordVisibility] = useState(true)
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(true)


    useEffect(() => {
        console.log(code)
    }, [code])

    const createAnimatedValues = () => ({
        labelPositionBottom: new Animated.Value(12),
        labelFontSize: new Animated.Value(14),
        labelPositionLeft: new Animated.Value(8)
    })

    const loginFormPostion = useRef(new Animated.Value(height)).current;
    const logoHeight = useRef(new Animated.Value(height * 0.72)).current;
    const backButtonOpacity = useRef(new Animated.Value(0)).current;
    const submitButton = useRef(new Animated.Value(0)).current;
    const freelanceBg = useRef(new Animated.Value(0)).current;
    const employerBg = useRef(new Animated.Value(0)).current;
    const [emailAnimations, setEmailAnimations] = useState(createAnimatedValues());
    const [fnameAnimations, setfnameAnimations] = useState(createAnimatedValues());
    const [lnameAnimations, setlnameAnimations] = useState(createAnimatedValues());
    const [phoneAnimations, setphoneAnimations] = useState(createAnimatedValues());
    const [codeAnimations, setcodeAnimations] = useState(createAnimatedValues());
    const [passwordAnimations, setPasswordAnimations] = useState(createAnimatedValues());
    const [cpasswordAnimations, setCpasswordAnimations] = useState(createAnimatedValues());

    const closeKeyboard = () => {
        Keyboard.dismiss()
    }
    
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
        setShow("SIGNIN")
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
            
    if (show === "SIGNUP"){
        openLoginForm()
    }
            
    const submitedButtonColors = submitButton.interpolate({
        inputRange: [0,1],
        outputRange: ['#FF4C00', '#9A2E00']
    })

    const animateRoleSelection = (selectedRole: string) => {
        setRole(selectedRole)
        Animated.parallel([
            Animated.timing(freelanceBg, {
                toValue: selectedRole === "FREELANCER" ? 1 : 0,
                duration: 300,
                useNativeDriver: false
            }),
            Animated.timing(employerBg, {
                toValue: selectedRole === "EMPLOYER" ? 1 : 0,
                duration: 300,
                useNativeDriver: false
            })
        ]).start()
    }

    const freelancerColors = freelanceBg.interpolate({
        inputRange: [0,1],
        outputRange: ["transparent", "#FF550D"]
    })

    const freelancerrTextColors = freelanceBg.interpolate({
        inputRange: [0,1],
        outputRange: ["#ffffff", "#000000"]
    })

    const freelancerBorderColors = freelanceBg.interpolate({
        inputRange: [0,1],
        outputRange: ["#ffffff", "#FF550D"]
    })

    const employerColors = employerBg.interpolate({
        inputRange: [0,1],
        outputRange: ["transparent", "#FF550D"]
    })

    const employerTextColors = employerBg.interpolate({
        inputRange: [0,1],
        outputRange: ["#ffffff", "#000000"]
    })

    const employerBorderColors = employerBg.interpolate({
        inputRange: [0,1], 
        //032139
        outputRange: ["#ffffff", "#FF550D"]
    })


    const handleNextStep = (step: number) => {
        ButtonAnimation()
        setStep(step)
    }

    const handleSignupData = (name: string, value: string) => {
        setSignupData((prev) => ({...prev, [name]: value}))
        console.log(signupData)
    }

    const handlePasswordConfirm = () => {
        ButtonAnimation()
        if (password === confirm && (password !== null || password !== "")) {
            setStep(4)
        }
    }

    return (
        <>
            {step === 1 && (
                <Animated.View style={[styles.signIn, {top: loginFormPostion}]}>
                    <Animated.View style={{ opacity: backButtonOpacity }}>
                        <Pressable onPress={closeLoginForm}>
                            <Ionicons name="arrow-back" size={30} color="#ffffff" />
                        </Pressable>
                    </Animated.View>
                    <View style={styles.signInForm}>
                        <Text style={styles.signInFormHeader}>Create Account</Text>
                        <View style={styles.NameInputs}>
                            <View style={styles.NameInput}>
                                <TextInput style={styles.textInput} onFocus={() => FocusedAnimation(fnameAnimations)} onBlur={() => !signupData.first_name && BlurAnimation(fnameAnimations)} onChangeText={(text) => handleSignupData("first_name", text)} />
                                <Animated.Text style={[styles.InputLabel, {left: fnameAnimations.labelPositionLeft, bottom: fnameAnimations.labelPositionBottom, fontSize: fnameAnimations.labelFontSize}]}>
                                    First Name
                                </Animated.Text>
                            </View>
                            <View style={styles.NameInput}>
                                <TextInput style={styles.textInput} onFocus={() => FocusedAnimation(lnameAnimations)} onBlur={() => !signupData.last_name && BlurAnimation(lnameAnimations)} onChangeText={(text) => handleSignupData("last_name", text)} />
                                <Animated.Text style={[styles.InputLabel, {left: lnameAnimations.labelPositionLeft, bottom: lnameAnimations.labelPositionBottom, fontSize: lnameAnimations.labelFontSize}]}>
                                    Last Name
                                </Animated.Text>
                            </View>
                        </View>
                        <View style={styles.ContInput}>
                            <TextInput style={styles.textInput} onFocus={() => FocusedAnimation(emailAnimations)} onBlur={() => !signupData.email  && BlurAnimation(emailAnimations)} onChangeText={(text) => handleSignupData("email", text)}keyboardType='email-address' />
                            <Animated.Text style={[styles.InputLabel, {left: emailAnimations.labelPositionLeft, bottom: emailAnimations.labelPositionBottom, fontSize: emailAnimations.labelFontSize}]}>
                                Email
                            </Animated.Text>
                        </View>
                        <View style={styles.ContInput}>
                            <TextInput style={styles.textInput} onFocus={() => FocusedAnimation(phoneAnimations)} onBlur={() =>  !signupData.phone_number && BlurAnimation(phoneAnimations)} onChangeText={(text) => handleSignupData("phone_number", text)} keyboardType='phone-pad' />
                            <Animated.Text style={[styles.InputLabel, {left: phoneAnimations.labelPositionLeft, bottom: phoneAnimations.labelPositionBottom, fontSize: phoneAnimations.labelFontSize}]}>
                                Phone Number
                            </Animated.Text>
                        </View>
                        <View style={styles.ContRoles}>
                            <Text style={styles.Roles}>
                                Role:
                            </Text>
                            <View style={styles.BtnRolesCont}>
                                <Animated.Text style={[styles.BtnRoles, {backgroundColor: freelancerColors, borderColor: freelancerBorderColors, color: freelancerrTextColors}]} onPress={() => animateRoleSelection("FREELANCER")}>
                                    Freelancer
                                </Animated.Text>
                                <Animated.Text style={[styles.BtnRoles, {backgroundColor: employerColors, borderColor: employerBorderColors, color: employerTextColors}]} onPress={() => animateRoleSelection("EMPLOYER")}>
                                    Employer
                                </Animated.Text>
                            </View>
                        </View>
                        <Pressable onPress={() => handleNextStep(2)}>
                            <Animated.View style={[styles.submitBtn, {backgroundColor: submitedButtonColors}]}>
                                <Text style={styles.submitBtnText}>
                                    Next
                                </Text>
                            </Animated.View>
                        </Pressable>
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Have an account?  <Text style={styles.footerHighlights}onPress={toggleLoginForms}>Signin</Text></Text>
                        </View>
                    </View>
                </Animated.View>
            )}

            {step === 2 && (
                <Animated.View style={[styles.signIn, {top: loginFormPostion}]}>
                    <Animated.View style={{ opacity: backButtonOpacity }}>
                        <Pressable onPress={() => setStep(1)}>
                            <Ionicons name="arrow-back" size={30} color="#ffffff" />
                        </Pressable>
                    </Animated.View>
                    <View style={styles.signInForm}>
                    <Text style={styles.signInFormHeader}>Confirm Email</Text>
                    <Text style={styles.checkMail}>Check <Text style={styles.Mail}>Email</Text></Text>
                    <View style={styles.ContInput}>
                        <TextInput style={styles.textInput} onFocus={() => FocusedAnimation(codeAnimations)} onBlur={() => (code === null || code === "") && BlurAnimation(codeAnimations)} onChangeText={(text) => setCode(text)} keyboardType='numeric' />
                        <Animated.Text style={[styles.InputLabel, {left: codeAnimations.labelPositionLeft, bottom: codeAnimations.labelPositionBottom, fontSize: codeAnimations.labelFontSize}]}>
                            Enter Code
                        </Animated.Text>
                    </View>
                        <Pressable onPress={() => handleNextStep(3)}>
                            <Animated.View style={[styles.submitBtn, {backgroundColor: submitedButtonColors}]}>
                                <Text style={styles.submitBtnText}>
                                    Confirm Code
                                </Text>
                            </Animated.View>
                        </Pressable>
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Have an account?  <Text style={styles.footerHighlights}onPress={toggleLoginForms}>Signin</Text></Text>
                        </View>
                    </View>
                </Animated.View>
            )}

            {step === 3 && (
                <Animated.View style={[styles.signIn, {top: loginFormPostion}]}>
                    <Animated.View style={{ opacity: backButtonOpacity }}>
                        <Pressable onPress={() => setStep(2)}>
                        <Ionicons name="arrow-back" size={30} color="#ffffff" />
                        </Pressable>
                    </Animated.View>
                    <View style={styles.signInForm}>
                        <Text style={styles.signInFormHeader}>Create Password</Text>
                        <View style={styles.ContInput}>
                            <TextInput style={styles.textInput} secureTextEntry={passwordVisibility} onFocus={() => FocusedAnimation(passwordAnimations)} onBlur={() => (password === null || password === "") && BlurAnimation(passwordAnimations)} onChangeText={(text) => setPassword(text)} />
                            <Animated.Text style={[styles.InputLabel, {left: passwordAnimations.labelPositionLeft, bottom: passwordAnimations.labelPositionBottom, fontSize: passwordAnimations.labelFontSize}]}>
                                Password
                            </Animated.Text>
                            <Pressable style={styles.eye} onPress={() => setpasswordVisibility(!passwordVisibility)}>
                                {passwordVisibility ? <Ionicons name="eye-off-outline" size={24} color="rgba(255, 255, 255, 0.4)" /> : <Ionicons name="eye-outline" size={24} color="rgba(255, 255, 255, 0.4)" />}
                            </Pressable>
                        </View>
                        <View style={styles.ContInput}>
                            <TextInput style={styles.textInput} secureTextEntry={confirmPasswordVisibility} onFocus={() => FocusedAnimation(cpasswordAnimations)} onBlur={() => (confirm === null || confirm === "") && BlurAnimation(cpasswordAnimations)} onChangeText={(text) => setConfirm(text)} />
                            <Animated.Text style={[styles.InputLabel, {left: cpasswordAnimations.labelPositionLeft, bottom: cpasswordAnimations.labelPositionBottom, fontSize: cpasswordAnimations.labelFontSize}]}>
                                Confirm Password
                            </Animated.Text>
                            <Pressable style={styles.eye} onPress={() => setConfirmPasswordVisibility(!confirmPasswordVisibility)}>
                                {confirmPasswordVisibility ? <Ionicons name="eye-off-outline" size={24} color="rgba(255, 255, 255, 0.4)" /> : <Ionicons name="eye-outline" size={24} color="rgba(255, 255, 255, 0.4)" />}
                            </Pressable>
                        </View>
                        <Pressable onPress={() => handlePasswordConfirm()}>
                            <Animated.View style={[styles.submitBtn, {backgroundColor: submitedButtonColors}]}>
                                <Text style={styles.submitBtnText}>
                                    Next
                                </Text>
                            </Animated.View>
                        </Pressable>
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Have an account?  <Text style={styles.footerHighlights}onPress={toggleLoginForms}>Signin</Text></Text>
                        </View>
                    </View>
                </Animated.View>
            )}

            {step === 4 && (
                <View style={styles.signIn}>
                    <View>
                        <Pressable onPress={() => setStep(3)}>
                            <Ionicons name="arrow-back" size={30} color="#ffffff" />
                        </Pressable>
                    </View>
                    <View style={styles.signInForm}>
                        <Text style={styles.signInFormHeader}>Current Location</Text>
                        <GooglePlacesAutocomplete
                            placeholder="Location"
                            minLength={2} // Minimum number of characters to start search
                            fetchDetails={true} // Important to get `details`
                            onPress={(data, details = null) => {
                                console.log("Data:", data);
                                console.log("Details:", details);
                            }}
                            query={{
                                key: "AIzaSyAgf8Rk4UX_On71_nasBjil_YPEjz95WTo",
                                language: "en", // Language for results
                                types: "geocode", // Limits results to cities, change as needed
                                components: "country:KE",
                            }}
                            nearbyPlacesAPI="GooglePlacesSearch"
                            debounce={200}
                            enablePoweredByContainer={false}
                            textInputProps={{
                                placeholderTextColor: "rgba(255,255,255, 0.4)",
                            }}
                            styles={{
                                textInputContainer: {
                                    width: "96%",
                                    height: 64,
                                    alignSelf: "center",
                                    borderWidth: 1,
                                    borderColor: "#ffffff",
                                    borderRadius: 8,
                                    alignItems:"center",
                                    justifyContent:"center",
                                },
                                textInput: {
                                    width: "100%",
                                    height: "100%",
                                    marginLeft: 0,
                                    marginRight: 0,
                                    color: "#ffffff",
                                    backgroundColor: 'transparent',
                                    fontSize: 16,
                                },
                                predefinedPlacesDescription: {
                                    color: "blue",
                                },
                                listView: {
                                    maxHeight: "32%",
                                    borderRadius: 8,
                                    marginTop: 5,
                                },
                                row: {
                                    backgroundColor: "#333333", // Background for each row
                                    padding: 10,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#444444",
                                },
                                description: {
                                    color: "#ffffff", // Text color for suggestions
                                    fontSize: 14,
                                },
                                separator: {
                                    height: 1,
                                    backgroundColor: "#444444",
                                },
                            }}
                        />
                        <Pressable style={styles.submitLocation} onPress={() => handleNextStep(5)}>
                            <Animated.View style={[styles.submitBtn, {backgroundColor: submitedButtonColors}]}>
                                <Text style={styles.submitBtnText}>
                                    Save
                                </Text>
                            </Animated.View>
                        </Pressable>
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Have an account?  <Text style={styles.footerHighlights}onPress={toggleLoginForms}>Signin</Text></Text>
                        </View>
                    </View>
                </View>
            )}
        </>
    )
}
export default SignUp