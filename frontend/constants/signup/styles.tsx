import { Dimensions } from "react-native"
import { StyleSheet } from "react-native"

const {height} = Dimensions.get("window")

export const styles = StyleSheet.create({
    signIn: {
        position: "absolute",
        width: "100%",
        height: height,
        flex: 1
    },

    signInForm: {
        minHeight: height * 0.85,
        top: height * 0.15,
        backgroundColor: "#032139",
        borderTopLeftRadius: 56,
        borderTopRightRadius: 56,
        paddingBottom: 20,
    },

    signInFormHeader: {
        fontSize: 42,
        fontWeight: 600,
        textAlign: "center",
        paddingBottom: 24,
        color: "#ffffff"
    },

    ContInput: {
        borderWidth: 1,
        borderColor: "#ffffff",
        borderRadius: 20,
        width: '96%',
        height: 64,
        alignSelf: "center",
        marginBottom: 24,
    },

    textInput: {
        width: "96%",
        height: "100%",
        alignSelf: "center",
        fontSize: 24,
        color: "#FFFFFF"
    },

    InputLabel: {
        position: "absolute",
        backgroundColor: "#002542",
        color: "#ffffff",
        paddingHorizontal: 4,
        fontSize: 12,
        fontWeight: 300
    },
    submitBtn: {
        backgroundColor: "#FF550D",
        width:"64%",
        height: 56,
        borderRadius: 20,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    submitBtnText: {
        fontSize: 32,
    },
    footer: {
        position: "absolute",
        bottom: "12%",
        width: "100%",
        alignItems: "center",
    },
    footerText: {
        fontSize: 18,
        color: "#ffffff"
    },
    footerHighlights: {
        color: "#FF550D",
        fontSize: 22,
        fontWeight: 600
    },
    NameInputs: {
        width: "96%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24,

    },

    NameInput: {
        borderWidth: 1,
        borderColor: "#ffffff",
        borderRadius: 20,
        width: '48%',
        height: 64,
    },
    ContRoles: {
        alignSelf: "center",
        width: "96%",
        marginBottom: 24
    },
    Roles: {
        fontSize: 24,
        fontWeight: 600,
        color: "#ffffff",
        marginVertical: 12
    },
    BtnRolesCont: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    BtnRoles: {
        color: "#ffffff",
        borderWidth: 1,
        fontSize: 20,
        fontWeight: 500,
        padding: 8,
        borderRadius: 12,
        borderColor: "#ffffff"
    },

    checkMail: {
        color: "#ffffff",
        fontSize: 24,
        paddingBottom: 24,
    },
    Mail: {
        fontWeight: 600,
        color: "#FF550D"
    },
    eye: {
        position: "absolute",
        right: 8,
        top: "30%"
    },
    Skill: {
        fontSize: 24,
        color: "#ffffff",
        fontWeight: 500
    },
    SubSkills: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 24,
        flexWrap: "wrap"
    },
    SubSkill: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 8,
        marginHorizontal: 4
    },
    CheckBox: {
        width: 16,
        height: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ffffff',
    },
    SkillName: {
        color: "#ffffff",
        fontSize: 18
    },
    submitLocation: {
        position: "absolute",
        bottom: "32%",
        width:"100%",
    },
    SkillCont:{
        width: "100%",
    }
})