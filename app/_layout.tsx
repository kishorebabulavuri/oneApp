// app/_layout.js or app/(tabs)/_layout.js
import { Slot } from 'expo-router';
import { MenuProvider } from 'react-native-popup-menu';

export default function Layout() {
  return (
    <MenuProvider>
      <Slot />
    </MenuProvider>
  );
}
