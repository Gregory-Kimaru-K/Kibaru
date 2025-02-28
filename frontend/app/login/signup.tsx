import { View, Text, StatusBar, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignUpPageComp from '@/components/signUpPageComp'

const {width, height} = Dimensions.get("window")
const signup = () => {
    return (
        <TouchableWithoutFeedback style={{ height: height }} onPress={() => Keyboard.dismiss}>
            <SafeAreaView style={{ width: width, height: "100%", backgroundColor: "#000000" }}>
                <StatusBar backgroundColor={"transparent"} translucent barStyle={'light-content'}  />
                <SignUpPageComp />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default signup