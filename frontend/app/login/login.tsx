import { View, Text, Dimensions, StatusBar, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import React from 'react'
import TopTextLogin from '@/components/topTextLogin'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoginTextBox from '@/components/loginTextBox'
import { useFonts } from 'expo-font'
import BottomFooter from '@/components/bottomFooter'

const {width, height} = Dimensions.get("window")

const login = () => {
    const [fontLoaded] = useFonts({
            "ValeraRound": require("../../assets/fonts/VarelaRound-Regular.ttf")
        })
    
        if (!fontLoaded){
            return(
                <View style={{ width: width, height: height, backgroundColor:"#001729", justifyContent: "center",alignItems: "center" }}>
                    <ActivityIndicator size={40} color={"#FF550D"} />
                </View>
            )
        }
    return (
        <TouchableWithoutFeedback style={{ height: height }} onPress={Keyboard.dismiss}>
            <SafeAreaView style={{ width: width, height: "100%", backgroundColor: "#000", justifyContent: "space-between" }}>
                <StatusBar backgroundColor={"transparent"} translucent barStyle={"light-content"} />
                <TopTextLogin name="login" />
                <LoginTextBox />
                <BottomFooter name="login"/>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default login