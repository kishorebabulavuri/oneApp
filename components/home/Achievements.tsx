import AsyncStorage from '@react-native-async-storage/async-storage';
import { Flame, Star, Trophy } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

// Helper function to convert date into "time ago"
const timeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);

  if (weeks >= 1) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  if (days >= 1) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours >= 1) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes >= 1) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'just now';
};

const StreakPoints = () => {
  const isDark = useColorScheme() === 'dark';
  const [achievements, setAchievements] = useState([
    { title: 'First Query', icon: '🎯', timeAgo: '' },
    { title: 'Week Streak', icon: '🔥', timeAgo: '' },
    { title: 'Quiz Master', icon: '🧠', timeAgo: '' },
  ]);

  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const loadAchievements = async () => {
      const now = new Date().toDateString();

      const queryTime = await AsyncStorage.getItem('achievement:firstQuery');
      const streakTime = await AsyncStorage.getItem('achievement:weekStreak');
      const quizTime = await AsyncStorage.getItem('achievement:quizMaster');
      const dailyStreak = await AsyncStorage.getItem('dailyStreak');

      const updated = [
        {
          title: 'First Query',
          icon: '🎯',
          timeAgo: queryTime ? timeAgo(queryTime) : 'N/A',
        },
        {
          title: 'Week Streak',
          icon: '🔥',
          timeAgo: streakTime ? timeAgo(streakTime) : 'N/A',
        },
        {
          title: 'Quiz Master',
          icon: '🧠',
          timeAgo: quizTime ? timeAgo(quizTime) : 'N/A',
        },
      ];

      setAchievements(updated);
      setStreak(dailyStreak ? parseInt(dailyStreak) : 0);
    };

    loadAchievements();
  }, []);

  return (
    <View style={styles.container}>
      {/* Recent Achievements */}
      <View style={[styles.card, { backgroundColor: isDark ? '#1c1c1e' : '#f0f4ff' }]}>
        <View style={styles.header}>
          <Trophy size={18} color={isDark ? '#fff' : '#000'} />
          <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
            Recent Achievements
          </Text>
        </View>

        {achievements.map((item) => (
          <View
            key={item.title}
            style={[styles.achievement, { backgroundColor: isDark ? '#2c2c2e' : '#fff' }]}
          >
            <Text style={styles.achievementIcon}>{item.icon}</Text>
            <View style={styles.achievementText}>
              <Text style={[styles.achievementTitle, { color: isDark ? '#fff' : '#000' }]}>
                {item.title}
              </Text>
              <Text style={[styles.achievementTime, { color: isDark ? '#aaa' : '#666' }]}>
                {item.timeAgo}
              </Text>
            </View>
            <Star size={20} color={isDark ? '#ffd700' : '#facc15'} />
          </View>
        ))}
      </View>

      {/* Streak Section */}
      <View
        style={[styles.streakBox, { backgroundColor: isDark ? '#27341b' : '#ecfdf5' }]}
      >
        <View style={styles.streakLeft}>
          <Text style={[styles.streakTitle, { color: isDark ? '#fff' : '#000' }]}>
            Keep it up! <Text>🔥</Text>
          </Text>
          <Text style={{ color: isDark ? '#ccc' : '#555' }}>
            You&apos;re on a {streak}-day streak
          </Text>
        </View>

        <View style={styles.streakRight}>
          <Flame size={28} color="#fb923c" />
          <Text style={styles.streakCount}>{streak}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  achievement: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  achievementIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  achievementText: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  achievementTime: {
    fontSize: 12,
  },
  streakBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
  },
  streakLeft: {},
  streakTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  streakRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  streakCount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fb923c',
  },
});

export default StreakPoints;
