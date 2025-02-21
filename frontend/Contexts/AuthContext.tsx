import { createContext, ReactNode, useEffect, useState } from "react";
import * as secureStore from "expo-secure-store"
import {jwtDecode} from "jwt-decode"

interface Tokens{
    access: string,
    refresh: string
}


interface authContext {
    user: string | null,
    tokens: Tokens | null,
    setUser: (user: string | null) => void,
    setTokens: (token: object | null) => void,
    login: (email: string, password: string) => void,
    logout: () => void,
    forgotpassword: (email: string) => void
}

const AuthContext = createContext<authContext | undefined>(undefined)

export default AuthContext

export const AuthProvider = ({ children }: {children: ReactNode})  => {
    const [user, setUser] = useState<any | null>(null)
    const [tokens, setTokens] = useState<Tokens | null>(null)

    const isExpiredToken = async (token: string) => {
        try{
            const decode: any = jwtDecode(token)

            return decode.exp * 1000 < Date.now()
        }
        catch (error){
            console.log(`IS_EXPIRED_ERROR: ${error}`)
            return true
        }
    }

    useEffect(() => {
        async function loadStoredToken(){
            const storedToken = await secureStore.getItemAsync("AuthTokens")

            if (storedToken){
                const parsedToken = JSON.parse(storedToken)

                if (!isExpiredToken(parsedToken.access)){
                    setUser(parsedToken.access)
                    setTokens(parsedToken)
                }
                else {
                    console.log(`I will not comply!!`)
                    logout()
                }
            }
        }
        loadStoredToken()
    }, [])

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/tokens/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password})
            })

            if (!response.ok) {
                const data = await response.json()
                console.log(`MIN ERROR: ${data}`)
            }
            const data = await response.json()
            console.log(`AUTH RESP: ${data}`)
            await secureStore.setItemAsync("AuthTokens", JSON.stringify(data))
            const decodedUser = jwtDecode(data.access)
            setTokens(data)
            setUser(decodedUser)

        } catch(error) {
            console.log(`MJR ERROR: ${error}`)
            return error
        }
    }

    const logout = () => {
        setTokens(null)
        setUser(null)
        secureStore.deleteItemAsync("AuthTokens")
    }

    const forgotpassword = async (email: string) => {}

    const context = {
        user: user,
        tokens,
        setTokens,
        setUser: setUser,
        login: login,
        logout: logout,
        forgotpassword: forgotpassword
    }

    return(
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}