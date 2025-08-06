import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

const stats = [
  { icon: 'book-outline', label: 'Total Courses', value: 12, color: '#4CAF50' },
  { icon: 'play-circle-outline', label: 'In Progress', value: 4, color: '#FFC107' },
  { icon: 'checkmark-done-outline', label: 'Completed', value: 6, color: '#2196F3' },
];

const CourseStats = () => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 }}>
      {stats.map((stat, index) => (
        <View
          key={index}
          style={{
            flex: 1,
            marginHorizontal: 6,
            backgroundColor: '#fff',
            padding: 12,
            borderRadius: 12,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            alignItems: 'center',
          }}
        >
          <Ionicons name={stat.icon as any} size={24} color={stat.color} />
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 4 }}>{stat.value}</Text>
          <Text style={{ color: '#777', fontSize: 14, textAlign: 'center' }}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default CourseStats;
