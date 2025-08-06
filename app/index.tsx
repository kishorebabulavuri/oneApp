import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Index() {
  const [isReady, setIsReady] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const hasOnboarded = await AsyncStorage.getItem('hasOnboarded');
        setIsOnboarded(hasOnboarded === 'true');
      } catch (error) {
        setIsOnboarded(false);
      } finally {
        setIsReady(true);
      }
    };
    checkOnboarding();
  }, []);

  if (!isReady) return null;

  return isOnboarded ? (
    <Redirect href="/(tabs)/home" />
  ) : (
    <Redirect href="/(onboarding)/onboarding" />
  );
}
