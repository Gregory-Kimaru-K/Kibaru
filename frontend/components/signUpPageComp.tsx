import { View, Text, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import TopTextLogin from './topTextLogin'
import BottomFooter from './bottomFooter'
import SignUpSteps from './SignUpSteps'

const {width, height} = Dimensions.get("window")


const SignUpPageComp = () => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ height: height }}>
            <View style={{ justifyContent:"space-between", height: "100%" }}>
                <TopTextLogin name="signup" />
                <SignUpSteps />
                <BottomFooter name="signup" />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default SignUpPageComp