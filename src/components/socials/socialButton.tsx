import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
    label: string,
    icon: any,
    onPress: () => void;
}

export default function SocialButton({label, icon, onPress}: Props) {
  return (
    <View style={styles.rootContainer}>
      <Pressable
        style={({pressed}) => [pressed && {opacity: 0.5}]}
        onPress={onPress}
      >
        <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={24} /> 
        <Text style={styles.buttonText}>{label}</Text>
        </View>
      </Pressable>
    </View>
  )
}


const styles = StyleSheet.create({
    rootContainer:{
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E2E8F0',
        paddingVertical: 14,
        paddingHorizontal: 14,
        width: '40%',
        marginHorizontal: 14,   
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 600,
    },
    buttonContainer:{
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'center'
    }

})