import { View, Image, Dimensions, StatusBar, ActivityIndicator } from 'react-native'
import React from 'react'

const {width, height} = Dimensions.get("window")

const WelcomeLoad = () => {
    return (
        <View style={{ flex: 1, width: width, height: height, backgroundColor: "#00162B"}}>
            <StatusBar backgroundColor={"#00162B"} />
            <Image source={require("../assets/logos/Finallyrmbj.png")} style={{ maxWidth: width, resizeMode: "contain"}} />
            <ActivityIndicator size={40} color={"#FE560F"} />
        </View>
    )
}

export default WelcomeLoad