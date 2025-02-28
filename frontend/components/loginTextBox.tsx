import { View, Text, TextInput, StyleSheet, Dimensions, Pressable } from 'react-native'
import React from 'react'

const {height, width} = Dimensions.get("window")

const LoginTextBox = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>LOGIN</Text>
            <TextInput style={styles.input} placeholder='Enter Phone Number or Email' placeholderTextColor={"rgba(255,255,255,0.5)"} />
            <TextInput secureTextEntry={true} placeholder='Enter Password' placeholderTextColor={"rgba(255,255,255,0.5)"} style={styles.input} />
            <Pressable style={styles.btn}>
                <Text style={styles.btnText}>SUBMIT</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height * 0.48,
        justifyContent: "space-around"
    },
    label: {
        fontSize: 32,
        color: "#ffffff",
        alignSelf: "center",
        borderBottomWidth: 2,
        borderColor: "#ffffff",
        fontFamily: "ValeraRound"
    },
    input: {
        borderBottomWidth: 2,
        borderColor: "#ffffff",
        width: width * 0.9,
        alignSelf: "center",
        color: "#ffffff",
        fontFamily: "ValeraRound"
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
    }
})

export default LoginTextBox