import { Image } from 'expo-image';
import { StyleSheet, TextInput } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import GoogleLoginButton from '@/auth/GoogleLoginButton';

// Dummy GoogleLoginButton component for demonstration


export default function SettingsScreen() {
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');

  async function onPress() {
  console.log(process.env.EXPO_PUBLIC_API_KEY)
  }


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#f10ecb', dark: '#14f758' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Settings Screen</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/settings.tsx</ThemedText> to see changes.
          Press{' '}
         
          to open developer tools.
        </ThemedText>
        <TextInput
          style={styles.input}
                    placeholder="useless placeholder"
          onChangeText={onChangeText}
          value={text}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
      </ThemedView>
      <GoogleLoginButton />
      {/* <Button
          title="Press me"
          onPress={onPress}
        /> */}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
});
