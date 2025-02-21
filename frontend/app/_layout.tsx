import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SecureStore from "expo-secure-store"
import { Stack, useRouter } from 'expo-router'
import AuthContext, { AuthProvider } from '@/Contexts/AuthContext'
import { UserProvider } from '@/Contexts/UserContext'
import WelcomeLoad from './index'

const _layout = () => {
    const [loading, setLoading] = useState(true)
    const [tokens, setTokens] = useState(null)
    const router = useRouter()

    useEffect(() => {
        async function checkTokens() {
            const storedToken = await SecureStore.getItemAsync("AuthTokens");

            await new Promise(resolve => setTimeout(resolve, 3000))

            if (storedToken){
                setTokens(JSON.parse(storedToken));
                console.log("LOGGED IN")
                router.replace("/(tabs)/jobs/confirmedjobs")
            }
            else {
                console.log("DONE")
                router.replace("/(authtabs)")
            }
        }
        checkTokens().finally(() => {
            setLoading(false)
        })
    }, []);

    useEffect(() => {
        console.log("Loading finished:", loading);
    }, [loading]);
    

    if (loading){
        return(
            <Stack>
                <Stack.Screen name='index' options={{
                    header: () => null
                }} />
            </Stack>
        )
    }

    return (
        <Stack>
            {tokens ? (
                <Stack.Screen name='(tabs)' options={{
                    header: () => null
                }}/>
            ):(
                <Stack.Screen name='(authtabs)' options={{
                    header: () => null
                }} />
            )}
        </Stack>
    )
}

export default _layout