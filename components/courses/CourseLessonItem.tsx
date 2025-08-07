// components/CourseLessonItem.tsx
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';

interface Props {
  index: number;
  title: string;
  duration: string;
  type: 'Theory' | 'Practical' | 'Quiz';
  description: string;
  status: 'review' | 'start' | 'locked';
  onPress?: () => void;
}

const CourseLessonItem: React.FC<Props> = ({
  index,
  title,
  duration,
  type,
  description,
  status,
  onPress,
}) => {
  const renderAction = () => {
    if (status === 'locked') {
      return <Feather name="lock" size={16} color="#999" />;
    }

    return (
      <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
        <Text style={styles.actionText}>{status === 'review' ? 'Review' : 'Start'}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <FontAwesome name="check-circle" size={16} color="#2ecc71" />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{`${index}. ${title}`}</Text>
          <Text style={styles.meta}>
            {duration} · {type}
          </Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      <View style={styles.right}>{renderAction()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f9fafe',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    flex: 1,
  },
  textContainer: {
    marginLeft: 8,
    flexShrink: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  meta: {
    fontSize: 12,
    color: '#666',
  },
  description: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  right: {
    marginLeft: 10,
  },
  actionBtn: {
    backgroundColor: '#0f172a',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default CourseLessonItem;
