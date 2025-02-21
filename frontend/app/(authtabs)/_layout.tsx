import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import { Text } from 'react-native'
import * as Font from "expo-font"

const _layout = () => {
    const [fontLoaded, setFontLoaded] = useState(false)
    useEffect(() => {
        async function loadFont(){
            await Font.loadAsync({
                'AdiosAmigo': require("../../assets/fonts/adios_amigo_font/adios-amigos-regular.ttf")
            })
            setFontLoaded(true)
        }
        loadFont()
    }, [])

    if (!fontLoaded) {
        return <Text>Loading...</Text>
    }

    return (
        <Stack>
            <Stack.Screen name='index' options={{
                headerTitle: () => (
                    <Text style={{ fontFamily: "AdiosAmigo", fontSize: 48}}>KIBARU</Text>
                ),
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: "transparent"
                }
            }} />
        </Stack>
    )
}

export default _layout