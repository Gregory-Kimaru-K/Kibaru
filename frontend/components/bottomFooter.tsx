import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import Svg, {Path} from 'react-native-svg'
import { Link } from 'expo-router'

/**796,956,856 */
interface Props {
    name: string
}
const {width, height} = Dimensions.get("window")
const BottomFooter: React.FC<Props> = ({name}) => {
  return (
    <View style={styles.container}>
        <Svg width={width-4} height={height * 0.24} style={styles.svg} preserveAspectRatio='none' viewBox={'0, 0, 462, 230'}>
            <Path
                d='M462 261.73H0V187.975V144.666C0 104.901 32.2042 72.7315 71.9687 72.7315H331.737C462 72.7315 462 0 462 0V261.73Z'
                fill={"#ffffff"}
            />
        </Svg>
        <View style={styles.footer}>
            {name === "signup"?
                <Text style={styles.footerText}>Have an account?<Link href={"/login/login"}><Text style={styles.aText}>Login</Text></Link></Text>
                :
                <Text style={styles.footerText}>Don't have an account?<Link href={"/login/signup"}><Text style={styles.aText}>Signup</Text></Link></Text>
            }
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
    },
    svg: {
        alignSelf: "flex-end"
    },
    footer: {
        position: "absolute",
        right: width/4.8,
        top: (height *0.4) /3.2
    },
    footerText: {
        fontSize: 20,
        fontFamily: "ValeraRound",
        color: "#808080"
    },
    aText: {
        color: 'rgba(255, 85, 13, 0.8)',
        textDecorationLine: "underline"
    }
})

export default BottomFooter