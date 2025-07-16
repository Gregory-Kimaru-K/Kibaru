import { View, Text, Animated, Dimensions, Keyboard, Pressable, TextInput, StyleSheet, ScrollView, FlatList } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/constants/signup/styles';
import { FocusedAnimation, BlurAnimation } from '@/constants/signup/animations';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import { Vibration } from 'react-native';
import AuthContext from '@/contexts/AuthContext';
import UserContext from '@/contexts/UserContext';
import { useRouter } from 'expo-router';


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
    const [rolestate, setrolestate] = useState("")
    const [signupData, setSignupData] = useState<Record<string, string>>({})
    const [code, setCode] = useState("")
    const [step, setStep] = useState<number>(1)
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [passwordVisibility, setpasswordVisibility] = useState(true)
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(true)
    const [showErrors1, setShowErrors1] = useState(false)
    const [showErrors2, setShowErrors2] = useState(false)
    const [showErrors3, setShowErrors3] = useState(false)
    const [passwordConfirm, setPasswordConfirm] = useState(true)
    const router = useRouter()

    const authContext = useContext(AuthContext)
    const userContext = useContext(UserContext)

    if (!userContext) {
        throw new Error("UserContext must be used within a UserProvider");
    }

    if(!authContext) {
        throw new Error("AuthContext must be used within a AuthProvider");
    }

    const { emailValidation, createUser } = userContext;
    const { confirmCode } = authContext


    useEffect(() => {
        console.log(code)
    }, [code])

    const createAnimatedValues = () => ({
        labelPositionBottom: new Animated.Value(12),
        labelFontSize: new Animated.Value(14),
        labelPositionLeft: new Animated.Value(8)
    })
    const createSubmitButtons = () => ({
        submitButton: new Animated.Value(0)
    })

    const loginFormPostion = useRef(new Animated.Value(height)).current;
    const logoHeight = useRef(new Animated.Value(height * 0.72)).current;
    const backButtonOpacity = useRef(new Animated.Value(0)).current;
    const freelanceBg = useRef(new Animated.Value(0)).current;
    const employerBg = useRef(new Animated.Value(0)).current;
    const [emailAnimations, setEmailAnimations] = useState(createAnimatedValues());
    const [fnameAnimations, setfnameAnimations] = useState(createAnimatedValues());
    const [lnameAnimations, setlnameAnimations] = useState(createAnimatedValues());
    const [phoneAnimations, setphoneAnimations] = useState(createAnimatedValues());
    const [codeAnimations, setcodeAnimations] = useState(createAnimatedValues());
    const [passwordAnimations, setPasswordAnimations] = useState(createAnimatedValues());
    const [cpasswordAnimations, setCpasswordAnimations] = useState(createAnimatedValues());

    const [submitButton1,setSubmitButton1] = useState(createSubmitButtons());
    const [submitButton2,setSubmitButton2] = useState(createSubmitButtons());
    const [submitButton3,setSubmitButton3] = useState(createSubmitButtons());
    const [submitButton4,setSubmitButton4] = useState(createSubmitButtons());

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

    const ButtonAnimation = (name: {submitButton: Animated.Value}) => {
        Animated.sequence([
            Animated.timing(name.submitButton, {
            toValue: 1,
            duration: 10,
            useNativeDriver: false
            }),
            Animated.timing(name.submitButton, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
            })
        ]).start()
    }
            
    if (show === "SIGNUP"){
        openLoginForm()
    }
            
    const submitedButtonColors1 = submitButton1.submitButton.interpolate({
        inputRange: [0,1],
        outputRange: ['#FF4C00', '#9A2E00']
    })

    const submitedButtonColors2 = submitButton2.submitButton.interpolate({
        inputRange: [0,1],
        outputRange: ['#FF4C00', '#9A2E00']
    })
    const submitedButtonColors3 = submitButton3.submitButton.interpolate({
        inputRange: [0,1],
        outputRange: ['#FF4C00', '#9A2E00']
    })
    const submitedButtonColors4 = submitButton4.submitButton.interpolate({
        inputRange: [0,1],
        outputRange: ['#FF4C00', '#9A2E00']
    })

    const animaterolestateSelection = (selectedrolestate: string) => {
        setrolestate(selectedrolestate)
        Animated.parallel([
            Animated.timing(freelanceBg, {
                toValue: selectedrolestate === "FREELANCER" ? 1 : 0,
                duration: 300,
                useNativeDriver: false
            }),
            Animated.timing(employerBg, {
                toValue: selectedrolestate === "EMPLOYER" ? 1 : 0,
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

    const handleNextStep = async(step: number) => {
        if (step === 2){
            ButtonAnimation(submitButton1)
            if (!signupData.first_name || !signupData.last_name || !signupData.email || !signupData.phone_number || !rolestate){
                setShowErrors1(true)
                Vibration.vibrate(100)
                return;
            }
            setShowErrors1(false);
            (async () => {
                const validate = await emailValidation({ email: signupData.email });
        
                if (validate.success) {
                    setStep(step);
                }
            })();
        } else if (step === 3){
            ButtonAnimation(submitButton2)
            if (code.trim() === ""){
                setShowErrors2(true)
                Vibration.vibrate(100)
                return;
            }
            setShowErrors2(false);
            (async () => {
                const validate = await confirmCode({email: signupData.email, code});
        
                if (validate.success) {
                    setStep(step);
                }
            })();
        } else if (step === 4){
            ButtonAnimation(submitButton3)
            if (password.trim() === "" || confirm.trim() === ""){
                setShowErrors3(true)
                Vibration.vibrate(100)
                return;
            } else if (password !== confirm) {
                setPasswordConfirm(false)
                Vibration.vibrate(100)
                return;
            }
            setPasswordConfirm(true)
            setShowErrors3(false)
            if (rolestate === "EMPLOYER"){
                handleUserCreation()
                return;
            }
            setStep(step)
        }
    }


    const handleSignupData = (name: string, value: string) => {
        setSignupData((prev) => ({...prev, [name]: value}))
        console.log(signupData)
    }

    const handleUserCreation = async () => {
        const updated_data = {...signupData, role: rolestate, password: password}
        console.log(updated_data)
        const response = await createUser(updated_data)
        console.log(response)
        if (response.success){
            if (rolestate === "FREELANCER"){
                router.replace("/freelance")
            }
            router.replace("/(tabs)")
        }
    }

    return (
        <>
            {step === 1 && (
                <Animated.View style={[styles.signIn, {top: loginFormPostion}]}>
                    <Animated.View style={{ opacity: backButtonOpacity }}>
                        <Pressable style={{ marginTop: 20 }} onPress={closeLoginForm}>
                            <Ionicons name="arrow-back" size={30} color="#ffffff" />
                        </Pressable>
                    </Animated.View>
                    <View style={styles.signInForm}>
                        <Text style={styles.signInFormHeader}>Create Account</Text>
                        <View style={styles.NameInputs}>
                            <View style={styles.NameInput}>
                                <TextInput 
                                    style={styles.textInput}
                                    onFocus={() => FocusedAnimation(fnameAnimations)}
                                    onBlur={() => !signupData.first_name && BlurAnimation(fnameAnimations)}
                                    onChangeText={(text) => handleSignupData("first_name", text)}
                                    value={signupData.first_name}
                                    />
                                <Animated.Text style={[styles.InputLabel, {left: fnameAnimations.labelPositionLeft, bottom: fnameAnimations.labelPositionBottom, fontSize: fnameAnimations.labelFontSize}]}>
                                    First Name
                                </Animated.Text>
                                {showErrors1 && (!signupData.first_name || signupData.first_name.trim() === "")
                                    && (
                                        <Text style={{ color: "#FF3636", fontSize: 16, marginLeft: 8 }}>* First Name Required</Text>
                                    )
                                }
                            </View>

                            <View style={styles.NameInput}>
                                <TextInput
                                    style={styles.textInput}
                                    onFocus={() => FocusedAnimation(lnameAnimations)}
                                    onBlur={() => !signupData.last_name && BlurAnimation(lnameAnimations)}
                                    onChangeText={(text) => handleSignupData("last_name", text)}
                                    value={signupData.last_name}
                                    />
                                <Animated.Text style={[styles.InputLabel, {left: lnameAnimations.labelPositionLeft, bottom: lnameAnimations.labelPositionBottom, fontSize: lnameAnimations.labelFontSize}]}>
                                    Last Name
                                </Animated.Text>
                                {showErrors1 && (!signupData.last_name || signupData.last_name.trim() === "")
                                    && (
                                        <Text style={{ color: "#FF3636", fontSize: 16, marginLeft: 8 }}>* Last Name Required</Text>
                                    )
                                }
                            </View>
                        </View>
                        <View style={styles.ContInput}>
                            <TextInput
                                style={styles.textInput}
                                onFocus={() => FocusedAnimation(emailAnimations)}
                                onBlur={() => !signupData.email  && BlurAnimation(emailAnimations)}
                                onChangeText={(text) => handleSignupData("email", text)}
                                keyboardType='email-address'
                                value={signupData.email}
                                />
                            <Animated.Text style={[styles.InputLabel, {left: emailAnimations.labelPositionLeft, bottom: emailAnimations.labelPositionBottom, fontSize: emailAnimations.labelFontSize}]}>
                                Email
                            </Animated.Text>
                            {showErrors1 && (!signupData.email || signupData.email.trim() === "")
                                    && (
                                        <Text style={{ color: "#FF3636", fontSize: 16, marginLeft: 8 }}>* Email Required</Text>
                                    )
                                }
                        </View>
                        <View style={styles.ContInput}>
                            <TextInput
                                style={styles.textInput}
                                onFocus={() => FocusedAnimation(phoneAnimations)}
                                onBlur={() =>  !signupData.phone_number && BlurAnimation(phoneAnimations)}
                                onChangeText={(text) => handleSignupData("phone_number", text)}
                                keyboardType='phone-pad'
                                value={signupData.phone_number}
                                />
                            <Animated.Text style={[styles.InputLabel, {left: phoneAnimations.labelPositionLeft, bottom: phoneAnimations.labelPositionBottom, fontSize: phoneAnimations.labelFontSize}]}>
                                Phone Number
                            </Animated.Text>
                            {showErrors1 && (!signupData.phone_number || signupData.phone_number.trim() === "")
                                && (
                                    <Text style={{ color: "#FF3636", fontSize: 16, marginLeft: 8 }}>* Phone Number Required</Text>
                                )
                            }
                        </View>
                        <View style={styles.ContRoles}>
                        {showErrors1 && (!rolestate) ?
                            (
                                <Text style={{ color: "#FF3636", fontSize: 24, marginVertical: 12, fontWeight: 600 }}>
                                    Role Required:
                                </Text>
                            ) :
                            (
                                <Text style={styles.Roles}>
                                    Role:
                                </Text>
                            )
                            }
                            <View style={styles.BtnRolesCont}>
                                <Animated.Text style={[styles.BtnRoles, {backgroundColor: freelancerColors, borderColor: freelancerBorderColors, color: freelancerrTextColors}]} onPress={() => animaterolestateSelection("FREELANCER")}>
                                    Freelancer
                                </Animated.Text>
                                <Animated.Text style={[styles.BtnRoles, {backgroundColor: employerColors, borderColor: employerBorderColors, color: employerTextColors}]} onPress={() => animaterolestateSelection("EMPLOYER")}>
                                    Employer
                                </Animated.Text>
                            </View>
                        </View>
                        <Pressable onPress={() => handleNextStep(2)}>
                            <Animated.View style={[styles.submitBtn, {backgroundColor: submitedButtonColors1}]}>
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
                        <Pressable style={{ marginTop: 20 }} onPress={() => setStep(1)}>
                            <Ionicons name="arrow-back" size={30} color="#ffffff" />
                        </Pressable>
                    </Animated.View>
                    <View style={styles.signInForm}>
                    <Text style={styles.signInFormHeader}>Confirm Email</Text>
                    <Text style={styles.checkMail}>Check <Text style={styles.Mail}>{signupData.email}</Text></Text>
                    <View style={styles.ContInput}>
                        <TextInput
                            style={styles.textInput}
                            onFocus={() => FocusedAnimation(codeAnimations)}
                            onBlur={() => (code.trim() === "") && BlurAnimation(codeAnimations)}
                            onChangeText={(text) => setCode(text)}
                            keyboardType='numeric'
                            value={code}
                            />
                        <Animated.Text style={[styles.InputLabel, {left: codeAnimations.labelPositionLeft, bottom: codeAnimations.labelPositionBottom, fontSize: codeAnimations.labelFontSize}]}>
                            Enter Code
                        </Animated.Text>
                        {showErrors2 &&
                            (
                                <Text style={{ color: "#FF3636", fontSize: 16, marginLeft: 8 }}>* Code Required</Text>
                            )
                        }
                    </View>
                        <Pressable onPress={() => handleNextStep(3)}>
                            <Animated.View style={[styles.submitBtn, {backgroundColor: submitedButtonColors2}]}>
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
                    <View style={styles.signInForm}>
                        <Text style={styles.signInFormHeader}>Create Password</Text>
                        <View style={styles.ContInput}>
                            <TextInput
                                style={styles.textInput}
                                secureTextEntry={passwordVisibility}
                                onFocus={() => FocusedAnimation(passwordAnimations)}
                                onBlur={() => (password === null || password === "") && BlurAnimation(passwordAnimations)}
                                onChangeText={(text) => setPassword(text)}
                                value={password}
                                />
                            <Animated.Text style={[styles.InputLabel, {left: passwordAnimations.labelPositionLeft, bottom: passwordAnimations.labelPositionBottom, fontSize: passwordAnimations.labelFontSize}]}>
                                Password
                            </Animated.Text>
                            <Pressable style={styles.eye} onPress={() => setpasswordVisibility(!passwordVisibility)}>
                                {passwordVisibility ? <Ionicons name="eye-off-outline" size={24} color="rgba(255, 255, 255, 0.4)" /> : <Ionicons name="eye-outline" size={24} color="rgba(255, 255, 255, 0.4)" />}
                            </Pressable>
                            {(showErrors3 && password.trim() === '') &&
                                (
                                    <Text style={{ color: "#FF3636", fontSize: 16, marginLeft: 8 }}>* Password Required</Text>
                                )
                            }
                        </View>
                        <View style={styles.ContInput}>
                            <TextInput
                                style={styles.textInput}
                                secureTextEntry={confirmPasswordVisibility}
                                onFocus={() => FocusedAnimation(cpasswordAnimations)}
                                onBlur={() => (confirm === null || confirm === "") && BlurAnimation(cpasswordAnimations)}
                                onChangeText={(text) => setConfirm(text)}
                                value={confirm}
                                />
                            <Animated.Text style={[styles.InputLabel, {left: cpasswordAnimations.labelPositionLeft, bottom: cpasswordAnimations.labelPositionBottom, fontSize: cpasswordAnimations.labelFontSize}]}>
                                Confirm Password
                            </Animated.Text>
                            <Pressable style={styles.eye} onPress={() => setConfirmPasswordVisibility(!confirmPasswordVisibility)}>
                                {confirmPasswordVisibility ? <Ionicons name="eye-off-outline" size={24} color="rgba(255, 255, 255, 0.4)" /> : <Ionicons name="eye-outline" size={24} color="rgba(255, 255, 255, 0.4)" />}
                            </Pressable>
                            {(showErrors3 && confirm.trim() === '') &&
                                (
                                    <Text style={{ color: "#FF3636", fontSize: 16, marginLeft: 8 }}>* Password Confirmation Required</Text>
                                )
                            }
                            {!passwordConfirm &&
                                (
                                    <Text style={{ color: "#FF3636", fontSize: 16, marginLeft: 8 }}>* Password do not match</Text>
                                )
                            }
                        </View>
                        <Pressable onPress={() => handleUserCreation()}>
                            <Animated.View style={[styles.submitBtn, {backgroundColor: submitedButtonColors3}]}>
                                <Text style={styles.submitBtnText}>
                                    Save
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
                        <Pressable style={{ marginTop: 20 }} onPress={() => setStep(3)}>
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
                            <Animated.View style={[styles.submitBtn, {backgroundColor: submitedButtonColors4}]}>
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