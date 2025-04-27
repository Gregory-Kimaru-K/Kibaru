import { View, Text, TextInput, StatusBar } from 'react-native'
import React from 'react'
import {styles} from "../../../constants/signup/styles"

const AddJob = () => {
    return (
        <View>
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
            <View>
                <TextInput/>
                <Text>
                    Title
                </Text>
            </View>

            <View>
                <TextInput/>
                <Text>
                    Title
                </Text>
            </View>
        </View>
    )
}

export default AddJob