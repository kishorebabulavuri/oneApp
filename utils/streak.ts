import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInCalendarDays } from 'date-fns';

const STREAK_KEY = 'dailyStreak';
const LAST_OPENED_KEY = 'lastOpened';

export async function updateDailyStreak(): Promise<number> {
  const lastOpened = await AsyncStorage.getItem(LAST_OPENED_KEY);
  const today = new Date();

  if (!lastOpened) {
    await AsyncStorage.setItem(STREAK_KEY, '1');
    await AsyncStorage.setItem(LAST_OPENED_KEY, today.toISOString());
    return 1;
  }

  const lastDate = new Date(lastOpened);
  const diff = differenceInCalendarDays(today, lastDate);

  if (diff === 1) {
    // continued streak
    const currentStreak = parseInt((await AsyncStorage.getItem(STREAK_KEY)) || '1', 10) + 1;
    await AsyncStorage.setItem(STREAK_KEY, currentStreak.toString());
    await AsyncStorage.setItem(LAST_OPENED_KEY, today.toISOString());
    return currentStreak;
  } else if (diff > 1) {
    // reset streak
    await AsyncStorage.setItem(STREAK_KEY, '1');
    await AsyncStorage.setItem(LAST_OPENED_KEY, today.toISOString());
    return 1;
  } else {
    // same day, no change
    return parseInt((await AsyncStorage.getItem(STREAK_KEY)) || '1', 10);
  }
}

export async function getTotalPoints(): Promise<number> {
  const points = await AsyncStorage.getItem('totalPoints');
  return parseInt(points || '0', 10);
}
