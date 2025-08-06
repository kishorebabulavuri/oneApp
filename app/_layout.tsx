// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';

export default function Layout() {
  const colorScheme = useColorScheme(); // returns 'light' or 'dark'

  useEffect(() => {
    console.log(`Current theme: ${colorScheme}`);
  }, [colorScheme]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <MenuProvider>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Slot />
      </MenuProvider>
    </ThemeProvider>
  );
}
