import { removeToken } from '@/storage/tokenStorage'
import React from 'react'
import { Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileScreen() {


  const logout = async() => {
    await removeToken()
  }
  return (
    <SafeAreaView>
      <Button title="logout" onPress={logout}/>
    </SafeAreaView>
  )
}