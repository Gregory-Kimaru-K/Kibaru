import React, { createContext } from "react";
import backendURL from "@/constants/constants";

interface SkillsContextType {
    getSkills: () => Promise<{success: boolean, data: any}>;
}
const SkillsContext = createContext<undefined | SkillsContextType>(undefined)
export default SkillsContext;

export const SkillsProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const getSkills = async () => {
        try {
            const response = await fetch(`${backendURL}/skills/`)

            if (response.status === 200) {
                const data = await response.json();
                console.log("Skills fetched successfully:", data);
                return {success: true, data: data};
            }
            else {
                const data = await response.json();
                console.log(`MIN_GET_SKILLS_ERROR: ${JSON.stringify(data)}`);
                return {success: false, data: data.error};
            }
        }
        catch (error) {
            console.log(`MJR_GET_SKILLS_ERROR: ${error}`)
            return {success: false, data: error instanceof Error ? error.message : "Network error"}
        }
    }
    const context = {
        getSkills
    }
    return (
        <SkillsContext.Provider value={context}>
            {children}
        </SkillsContext.Provider>
    )
}