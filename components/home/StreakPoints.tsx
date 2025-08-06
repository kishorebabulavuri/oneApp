// components/home/StreakPoints.tsx
import { useAutoPointIncrement } from '@/hooks/useAutoPointIncrement';
import { updateDailyStreak } from '@/utils/streak';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function StreakPoints() {
  const { points } = useAutoPointIncrement();
  const [streak, setStreak] = useState(0);
  const theme = useColorScheme();

  useEffect(() => {
    const loadStreak = async () => {
      const streakValue = await updateDailyStreak();
      setStreak(streakValue);
    };
    loadStreak();
  }, []);

  const isDark = theme === 'dark';

  return (
    <View style={styles.container}>
      <View style={[styles.card, isDark && styles.cardDark]}>
        <Text style={styles.emoji}>🔥</Text>
        <View>
          <Text style={[styles.label, isDark && styles.labelDark]}>
            Daily Streak
          </Text>
          <Text style={[styles.value, isDark && styles.valueDark]}>
            {streak}
          </Text>
        </View>
      </View>
      <View style={[styles.card, isDark && styles.cardDark]}>
        <Text style={styles.emoji}>🏆</Text>
        <View>
          <Text style={[styles.label, isDark && styles.labelDark]}>
            Total Points
          </Text>
          <Text style={[styles.value, isDark && styles.valueDark]}>
            {points}
          </Text>
        </View>
      </View>
    </View>
  );
}

const cardWidth = screenWidth / 2 - 24;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#f2f4f7',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: cardWidth,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: '#2c2c2e',
  },
  emoji: {
    fontSize: 28,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  labelDark: {
    color: '#aaa',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  valueDark: {
    color: '#fff',
  },
});
