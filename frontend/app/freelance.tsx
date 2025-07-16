import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { freelanceStyles } from '@/constants/signup/styles';
import { Stack } from 'expo-router';
import { SkillsProvider } from '@/contexts/SkillsContext';

const Freelance = () => {
  const [step ,setStep] = useState(1);
  const [formData, setFormData] = useState({
    skills: [],
    certificate: "",
    location: "",
    front_id: "",
    back_id: "",
    image: ""
  })
  return (
    <SkillsProvider>
      {step === 1 && (
        <View>
        </View>
      )}
    </SkillsProvider>
  )
}

export default Freelance