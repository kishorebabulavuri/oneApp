import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  title: string;
  level: string;
  lessons: number;
  duration: string;
  progress: number;
  onContinue: () => void;
  slug?: string;
}

const CourseCard = ({
  title,
  level,
  lessons,
  duration,
  progress,
  onContinue,
}: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.levelTag}>
          <Text style={styles.levelText}>{level}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <Ionicons name="time-outline" size={16} color="#555" />
        <Text style={styles.metaText}>{duration}</Text>
        <Ionicons name="book-outline" size={16} color="#555" style={{ marginLeft: 12 }} />
        <Text style={styles.metaText}>{lessons} Lessons</Text>
      </View>

      <View style={styles.progressRow}>
        <Text style={styles.progressText}>Progress: {progress}%</Text>
      </View>

      <TouchableOpacity onPress={onContinue} style={styles.button}>
        <Text style={styles.buttonText}>
          {progress > 0 ? 'Continue' : 'Start Course'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
  },
  levelTag: {
    backgroundColor: '#DCFCE7',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  levelText: {
    fontSize: 12,
    color: '#15803D',
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 4,
  },
  progressRow: {
    marginBottom: 12,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  button: {
    backgroundColor: '#16A34A',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
