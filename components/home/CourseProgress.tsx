import { useNavigation } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';

const progressData = [
  { title: 'SQL Basics', level: 'Beginner', progress: 0.85 },
  { title: 'Advanced Queries', level: 'Intermediate', progress: 0.65 },
  { title: 'Database Design', level: 'Advanced', progress: 0.3 },
];

const CourseProgress = () => {
  const navigation = useNavigation();
  const isDark = useColorScheme() === 'dark';

  // Create animated values for each progress bar
  const animatedProgress = useRef(progressData.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    progressData.forEach((item, index) => {
      Animated.timing(animatedProgress[index], {
        toValue: item.progress,
        duration: 800,
        useNativeDriver: false,
      }).start();
    });
  }, []);

  return (
    <View style={[styles.card, { backgroundColor: isDark ? '#1c1c1e' : '#f0f4ff' }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#000' }]}>
          Course Progress
        </Text>
        <TouchableOpacity
          style={styles.viewAll}
          onPress={() => navigation.navigate('course' as never)}
        >
          <Text style={{ color: isDark ? '#aaa' : '#333' }}>View All</Text>
          <ChevronRight size={16} color={isDark ? '#aaa' : '#333'} />
        </TouchableOpacity>
      </View>

      {/* Progress List */}
      {progressData.map((item, index) => (
        <View key={item.title} style={styles.progressItem}>
          <View style={styles.titleRow}>
            <Text style={[styles.courseTitle, { color: isDark ? '#fff' : '#000' }]}>
              {item.title}
            </Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{Math.round(item.progress * 100)}%</Text>
            </View>
          </View>
          <Text style={[styles.courseLevel, { color: isDark ? '#ccc' : '#666' }]}>
            {item.level}
          </Text>

          {/* Animated Progress Bar */}
          <View style={[styles.progressBar, { backgroundColor: isDark ? '#3a3a3c' : '#e5e7eb' }]}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  backgroundColor: '#0f172a',
                  width: animatedProgress[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  progressItem: {
    marginBottom: 18,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  courseLevel: {
    fontSize: 13,
    marginBottom: 6,
  },
  badge: {
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    borderRadius: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 12,
  },
});

export default CourseProgress;
