import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useRouter } from 'expo-router'
import * as SecureStore from "expo-secure-store"
import {jwtDecode} from "jwt-decode"

interface JwtPayload {
    role: string;
    exp: number;
    iat: number;
  }


const _layout = () => {
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        async function Waiting() {
            await new Promise(resolve => setTimeout(resolve, 5000))
            
            try{
                const storedTokens = await SecureStore.getItemAsync("AuthTokens")
                if (storedTokens){
                    const parsedTokens = JSON.parse(storedTokens)
                    const user = jwtDecode<JwtPayload>(parsedTokens.access)

                    if (user.role === "FREELANCER"){
                        router.replace("/(tabs)")
                    }else {
                        router.replace("/(emptabs)")
                    }
                }
                else{
                    console.log("No Stored Tokens")
                    router.replace("/login/signup")
                }
            }
            catch (error){
                console.log(`NJR_LAYOUT_ERROR: ${error}`)
            }
            finally{
                setLoading(false)
            }
        }
        Waiting()
    }, [])

    if (loading) {
        return (
            <Stack>
                <Stack.Screen name='index' options={{
                    header: () => null
                }} />
            </Stack>
        )
    }

    return(
        <Stack>
            <Stack.Screen
                name='login/signup'
                options={{
                    header: () => null
                }}
            />
            <Stack.Screen
                name='login/login'
                options={{
                    header: () => null
                }}
            />
        </Stack>
    )
}

export default _layout