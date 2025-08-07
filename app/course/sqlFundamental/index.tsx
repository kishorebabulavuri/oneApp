// app/course/sqlFundamental/index.tsx

import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
  Animated,
  RefreshControl,
  SafeAreaView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Lesson {
  id: number;
  title: string;
  time: string;
  type: string;
  completed: boolean;
  locked: boolean;
}

export default function CourseList() {
  const router = useRouter();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { width } = useWindowDimensions();
  const progressAnim = useRef(new Animated.Value(0)).current;

  const handleGoBack = () => {
    router.push('/course');
  };
  
  const loadLessons = async () => {
    try {
      const url = 'https://raw.githubusercontent.com/kishorebabulavuri/AppData1/main/sqlFundamental.json';
      const res = await axios.get(`${url}?t=${new Date().getTime()}`);
      
      const rawData = res.data;

      if (!Array.isArray(rawData)) {
        throw new Error("Fetched data is not an array.");
      }

      const storedProgress = await AsyncStorage.getItem('sqlLessonsProgress');
      const completedIds = storedProgress ? JSON.parse(storedProgress) : [];

      const prepared = rawData.map((lesson: any, index: number) => {
        const isCompleted = completedIds.includes(lesson.id);
        const isLocked = index === 0 ? false : !completedIds.includes(rawData[index - 1].id);

        return {
          ...lesson,
          completed: isCompleted,
          locked: isLocked,
        };
      });

      setLessons(prepared);
    } catch (err) {
      console.error('Failed to load lessons:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadLessons();
  }, []);

  const handleStartLesson = async (lesson: Lesson, index: number) => {
    const updated = [...lessons];
    updated[index].completed = true;

    if (index + 1 < updated.length) {
      updated[index + 1].locked = false;
    }

    setLessons(updated);

    const completedIds = updated.filter(l => l.completed).map(l => l.id);
    await AsyncStorage.setItem('sqlLessonsProgress', JSON.stringify(completedIds));

    // ✅ Corrected navigation path to match the file structure
    router.push(`/topicsContent/sqlFundamentalTopicsData?lessonId=${lesson.id}`);
  };

  const completedCount = lessons.filter(l => l.completed).length;
  const totalLessons = lessons.length > 0 ? lessons.length : 1;
  const progress = completedCount / totalLessons;
  const percentage = Math.round(progress * 100);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: percentage,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  const onRefresh = () => {
    setRefreshing(true);
    progressAnim.setValue(0);
    setLessons([]);
    loadLessons();
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#00c07d" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SQL Fundamentals</Text>
      </View>

      <ScrollView
        style={[styles.container, { paddingHorizontal: width * 0.04 }]}
        contentContainerStyle={{ paddingBottom: 24 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.headerCard}>
          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Beginner</Text>
            </View>
            <Text style={styles.durationText}>4 hours</Text>
          </View>

          <View style={styles.descriptionRow}>
             <Ionicons name="golf" size={32} color="#F43F5E" style={styles.targetIcon} />
            <View style={styles.descriptionContent}>
              <Text style={styles.descriptionText}>
                Master the basics of SQL with hands-on exercises
              </Text>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Ionicons name="people-outline" size={16} color="#6B7280" />
                  <Text style={styles.statText}>1234 students</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="star" size={16} color="#FBBF24" />
                  <Text style={styles.statText}>4.8</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Course Progress</Text>
                <Text style={styles.progressPercentageText}>{percentage}%</Text>
            </View>
            <View style={styles.progressBarBackground}>
              <Animated.View
                style={[styles.progressBarFill, { width: progressAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%']
                }) }]}
              />
            </View>
          </View>
        </View>

        <Text style={[styles.title, { fontSize: width * 0.05 }]}>Course Content</Text>

        {lessons.map((lesson, index) => (
          <TouchableOpacity
            key={lesson.id}
            style={[styles.lessonCard, { paddingHorizontal: width * 0.04 }]}
            disabled={lesson.locked}
            onPress={() => !lesson.locked && handleStartLesson(lesson, index)}
          >
            <View style={styles.lessonLeft}>
              {lesson.completed ? (
                <Ionicons name="checkmark-circle" size={20} color="#00c07d" />
              ) : (
                <Ionicons name="ellipse-outline" size={20} color="#bbb" />
              )}
            </View>

            <View style={styles.lessonContent}>
              <Text style={[styles.lessonTitle, { fontSize: width * 0.042 }]}>
                {index + 1}. {lesson.title}
              </Text>
              <Text style={[styles.lessonMeta, { fontSize: width * 0.035 }]}>
                {lesson.time} • {lesson.type}
              </Text>
            </View>

            {lesson.locked ? (
              <Ionicons name="lock-closed" size={20} color="#999" />
            ) : (
              <View style={styles.startButton}>
                <Ionicons name="play-outline" size={16} color="#000" />
                <Text style={[styles.startText, { fontSize: width * 0.035 }]}>
                  {lesson.completed ? 'Done' : 'Start'}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: Platform.OS === 'android' ? 28 : 0,
  },
   header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 0, 
    bottom: 0,
    justifyContent: 'center'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#E0F2F1',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    color: '#00796B',
    fontWeight: '600',
    fontSize: 12,
  },
  durationText: {
    marginLeft: 12,
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  descriptionRow: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'flex-start',
  },
  targetIcon: {
    marginRight: 12,
    marginTop: 4,
  },
  descriptionContent: {
      flex: 1,
  },
  descriptionText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    marginLeft: 4,
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  progressSection: {
    marginTop: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
  },
  progressLabel: {
    fontWeight: 'bold',
    color: '#111827',
    fontSize: 16,
  },
  progressPercentageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#00c07d',
    borderRadius: 4,
  },
  title: {
    fontWeight: '700',
    marginBottom: 16,
    color: '#111827',
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  lessonLeft: {
    marginRight: 12,
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontWeight: '600',
    color: '#1F2937',
  },
  lessonMeta: {
    color: '#6B7280',
    marginTop: 2,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  startText: {
    marginLeft: 4,
    fontWeight: '600',
    color: '#111827',
  },
});