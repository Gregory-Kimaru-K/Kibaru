import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import Svg, {Path} from "react-native-svg"

interface Props {
    name: string
}

const {width, height} = Dimensions.get("window")
const TopTextLogin: React.FC<Props> = ({name}) => {
    return (
        <View style={styles.container}>
            <Svg viewBox={`0, 0, 492, 230`} width={width-4} height={height * 0.28} preserveAspectRatio='none' style={styles.svg}>
                <Path
                    d='M0 0H462C478.569 0 492 13.4315 492 30V73.8422C492 137.564 437.08 189.221 369.3 189.221H138.722C0 189.221 0 230 0 230V0Z'
                    fill={"#ffffff"}
                />
            </Svg>
            <View style={styles.textContainer}>
                {name === "signup"?
                    <Text style={styles.text2}>WELCOME!</Text>
                    :
                    <>
                        <Text style={styles.text2}>WELCOME</Text>
                        <Text style={styles.text2}>BACK!!!</Text>
                    </>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        padding: 0,
        margin: 0,
    },
    svg: {
        position: "relative",
        top: 0,
    },
    textContainer: {
        position: "absolute",
        height: 150,
        width: width,
        justifyContent: "center"
    },
    text2: {
        fontSize: 64,
        color: "#000",
        fontFamily: "ValeraRound"
    }
})

export default TopTextLogin