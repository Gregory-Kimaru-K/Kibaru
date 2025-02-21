import { createContext, ReactNode, useContext } from "react";
import * as SecureStore from 'expo-secure-store';
import AuthContext from "./AuthContext";
import { jwtDecode } from "jwt-decode";

interface UserContext {
    createUser: (userData: object) => void,
    updateUser: (userData: object, id: number) => void
}

const UserContext = createContext<UserContext | undefined>(undefined)

export default UserContext

export const UserProvider = ({children}: {children: ReactNode}) => {
    const authContext = useContext(AuthContext)

    if (!authContext){
        throw new Error("UserProviders should be within authProvider")
    }
    const {setTokens, setUser, tokens} = authContext

    const createUser = async(userData: object) => {
        try{
            const response = await fetch("http://127.0.0.1:8000/api/user/new/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })

            if (response.status === 201){
                const data = await response.json();
                console.log(`CREATE RESP: ${data}`);
                const strData = JSON.stringify(data);
                await SecureStore.setItemAsync("AuthTokens", strData);
                setUser(jwtDecode(data.access));
                setTokens(data)
            }
            else {
                const data = await response.json();
                console.log(`MIN ERROR: ${data}`)
            }
        } catch(error) {
            console.log(`MJR_ERROR: ${error}`)
        }
    }
    const updateUser = async(userData: object, id: number) => {
        try{
            const response = await fetch(`http://127.0.0.1:8000/api/user/${id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication": `Bearer ${tokens?.access}`
                },
                body: JSON.stringify(userData)
            })
            if (response.status === 200) {
                const data = await response.json();
                console.log(`UPDATE RESP: ${data}`)
            }
            else{
                const data = await response.json()
                console.log(`UPDATE MIN ERROR: ${data}`)
            }
        } catch(error){
            console.log(`MJR ERROR: ${error}`)
        }
    }

    const context = {
        createUser,
        updateUser
    }

    return(
        <UserContext.Provider value={context}>
            {children}
        </UserContext.Provider>
    )
}