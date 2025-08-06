// hooks/useAutoPointIncrement.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const POINTS_KEY = 'totalPoints';

export const useAutoPointIncrement = () => {
  const [points, setPoints] = useState(0);

  const loadPoints = async () => {
    const stored = await AsyncStorage.getItem(POINTS_KEY);
    const value = stored ? parseInt(stored, 10) : 0;
    setPoints(value);
  };

  const savePoints = async (newPoints: number) => {
    setPoints(newPoints);
    await AsyncStorage.setItem(POINTS_KEY, newPoints.toString());
  };

  useEffect(() => {
    loadPoints();

    const interval = setInterval(() => {
      setPoints(prev => {
        const updated = prev + 1;
        AsyncStorage.setItem(POINTS_KEY, updated.toString());
        return updated;
      });
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(interval);
  }, []);

  return { points, setPoints: savePoints };
};
