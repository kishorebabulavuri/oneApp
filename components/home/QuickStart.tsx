import { useNavigation } from 'expo-router';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';

const QuickStart = () => {
  const navigation = useNavigation();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const quickActions = [
    { title: 'Continue Course', icon: '📖', path: '/(tabs)/course' },
    { title: 'Take Quiz', icon: '🧠', path: '/(tabs)/quiz' },
    { title: 'Flashcards', icon: '💳', path: '/(tabs)/flashcards' },
    { title: 'Interview Prep', icon: '💬', path: '/(tabs)/interview' },
  ];

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: isDark ? '#1c1c1e' : '#f0f4ff' },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: isDark ? '#fff' : '#000' },
        ]}
      >
        🎯 Quick Start
      </Text>

      <View style={styles.grid}>
        {quickActions.map((item) => (
          <TouchableOpacity
            key={item.title}
            style={[
              styles.actionBox,
              {
                backgroundColor: isDark ? '#2c2c2e' : '#fff',
              },
            ]}
            onPress={() => navigation.navigate(item.path as never)}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <Text
              style={[
                styles.label,
                { color: isDark ? '#fff' : '#111' },
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionBox: {
    width: '48%',
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default QuickStart;
