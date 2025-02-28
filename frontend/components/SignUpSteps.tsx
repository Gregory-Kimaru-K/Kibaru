import { View, Text, StyleSheet, Dimensions, Pressable, ActivityIndicator, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

const {width, height} = Dimensions.get("window")
const SignUpSteps = () => {
    const [step, setStep] = useState<number>(1)
    const [role, setRole] = useState<null | string>(null)
    const [loading, setLoading] = useState(true)

    const handleRole = async(role: string) => {
        setRole(role);
    }

    return (
        <View style={{height: height * 0.48}}>
            {step === 1 && (
                <View style={styles.container}>
                    <Text style={styles.text}>PLEASE SELECT ONE:</Text>
                    <View style={styles.radioContainer}>
                        <Pressable style={styles.radioButton} onPress={() => handleRole("FREELANCER")}>
                            <View style={styles.radio}><View style={role === "FREELANCER" && styles.insideThingOn}></View></View>
                            <Text style={styles.text2}>Freelancer</Text>
                        </Pressable>
                        <Pressable style={styles.radioButton} onPress={() => handleRole("EMPLOYER")}>
                            <View style={styles.radio}><View style={role === "EMPLOYER" && styles.insideThingOn}></View></View>
                            <Text style={styles.text2}>Employer</Text>
                        </Pressable>

                        <Pressable onPress={() => setStep(2)} style={styles.btn}>
                            <Text style={styles.btnText}>Next</Text>
                        </Pressable>
                    </View>
                </View>
            )}

            {step === 2 && (
                <View>
                    <TextInput style={styles.textBox} placeholder='First Name' placeholderTextColor="#ffffff" />
                    <TextInput style={styles.textBox} placeholder='Second Name' placeholderTextColor="#ffffff" />
                    <TextInput style={styles.textBox} placeholder='Email' placeholderTextColor="#ffffff" />
                    <Pressable onPress={() => setStep(2)} style={styles.btn}>
                        <Text style={styles.btnText}>Prev</Text>
                    </Pressable>
                    <Pressable onPress={() => setStep(3)} style={styles.btn}>
                        <Text style={styles.btnText}>Next</Text>
                    </Pressable>
                </View>
            )}

            {step === 3 && (
                <View>
                    <TextInput style={styles.textBox} placeholder='Enter code' placeholderTextColor="#ffffff" keyboardType='number-pad' />
                    <Pressable onPress={() => setStep(3)} style={styles.btn}>
                        <Text style={styles.btnText}>Prev</Text>
                    </Pressable>
                    <Pressable onPress={() => setStep(4)} style={styles.btn}>
                        <Text style={styles.btnText}>Next</Text>
                    </Pressable>
                </View>
            )}

            {step === 4 && (
                <View>
                    <TextInput style={styles.textBox} placeholder='Mpesa Number' placeholderTextColor="#ffffff" />
                    <Pressable onPress={() => setStep(3)} style={styles.btn}>
                        <Text style={styles.btnText}>Prev</Text>
                    </Pressable>
                    <Pressable onPress={() => setStep(4)} style={styles.btn}>
                        <Text style={styles.btnText}>Next</Text>
                    </Pressable>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        gap: 20
    },
    loadingContainer: {
        height: "100%",
        alignItems:"center",
        justifyContent: "center"
    },
    text: {
        color: "#ffffff",
        fontSize: 16
    },

    text2: {
        color: "#ffffff"
    },
    radioContainer: {
        gap: 16,
    },

    radioButton: {
        flexDirection: "row",
        paddingVertical: 20,
        justifyContent: "space-evenly",
        backgroundColor: "#808080",
    },

    radio: {
        height: 20,
        width: 20,
        borderWidth: 1,
        borderColor: "#c0c0c0",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    insideThingOn: {
        backgroundColor: "#c0c0c0",
        height: 10,
        width: 10,
        borderRadius: 15
    },
    btn: {
        backgroundColor:"#ffffff",
        width: width * 0.5,
        alignSelf: "center",
        padding: 12,
        borderRadius: 10,
    },
    btnText: {
        fontSize: 24,
        textAlign: "center",
        color: "#000000",
        fontFamily: "ValeraRound"
    },
    textBox: {
        borderWidth: 2,
        borderColor: "#ffffff",
        color: "#ffffff"
    }
})

export default SignUpSteps