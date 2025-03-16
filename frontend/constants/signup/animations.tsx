import { Animated } from "react-native"

export const FocusedAnimation = (animations: {labelPositionBottom: Animated.Value, labelFontSize: Animated.Value, labelPositionLeft: Animated.Value}) => {
    Animated.parallel([
        Animated.timing(animations.labelPositionBottom, {
        toValue: 56,
        duration: 200,
        useNativeDriver: false
        }),
        Animated.timing(animations.labelFontSize, {
        toValue: 12,
        duration: 200,
        useNativeDriver: false
        }),
        Animated.timing(animations.labelPositionLeft, {
        toValue: 18,
        duration: 200,
        useNativeDriver: false
        })
    ]).start()
}

export const BlurAnimation = (animations: {labelPositionBottom: Animated.Value, labelFontSize: Animated.Value, labelPositionLeft: Animated.Value}) => {
    Animated.parallel([
        Animated.timing(animations.labelPositionBottom, {
        toValue: 12,
        duration: 200,
        useNativeDriver: false
        }),
        Animated.timing(animations.labelFontSize, {
        toValue: 14,
        duration: 200,
        useNativeDriver: false
        }),
        Animated.timing(animations.labelPositionLeft, {
        toValue: 2,
        duration: 200,
        useNativeDriver: false
        })
    ]).start()
}