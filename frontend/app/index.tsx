import { View, StatusBar, Image, Dimensions, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'

const {width, height} = Dimensions.get("window")

const index = () => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={"#001729"} />
            <Image style={styles.logo} source={require("../assets/logos/Finallyrmbj.png")} />
            <ActivityIndicator color={"#FF550D"} size={40} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#001729",
        width: width,
        height: height
    },

    logo: {
        width: "100%",
        resizeMode: "contain"
    }
})

export default index