// components/courses/AdvancedQueriesAndJoins.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AdvancedQueriesAndJoins = () => {
  return (
    <View style={styles.card}>
      <View style={styles.topBar} />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Ionicons name="git-branch-outline" size={24} color="#007bff" style={styles.icon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Advanced Queries and Joins</Text>
            <Text style={styles.subtitle}>
              Master complex SQL queries and joins with hands-on exercises
            </Text>
          </View>
          <View style={styles.levelTag}>
            <Text style={styles.levelText}>Intermediate</Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <Ionicons name="time-outline" size={16} color="#555" />
          <Text style={styles.metaText}>4 hours</Text>
          <Ionicons name="book-outline" size={16} color="#555" style={styles.metaIcon} />
          <Text style={styles.metaText}>12 lessons</Text>
          <Ionicons name="people-outline" size={16} color="#555" style={styles.metaIcon} />
          <Text style={styles.metaText}>1234</Text>
          <Ionicons name="star" size={16} color="#f4c10f" style={styles.metaIcon} />
          <Text style={styles.metaText}>4.8</Text>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Progress</Text>
            <Text style={styles.progressValue}>85%</Text>
          </View>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: '85%' }]} />
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="play-circle-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Continue</Text>
          <Ionicons name="chevron-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdvancedQueriesAndJoins;


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        margin: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        overflow: 'hidden',
    },
    topBar: {
        height: 6,
        backgroundColor: '#007bff', // blue color
    },
    content: {
        padding: 16,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
        marginTop: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    subtitle: {
        fontSize: 13,
        color: '#555',
        marginTop: 2,
    },
    levelTag: {
        backgroundColor: '#e3f0ff', // light blue
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginLeft: 8,
    },
    levelText: {
        fontSize: 12,
        color: '#007bff', // blue color
        fontWeight: '600',
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        flexWrap: 'wrap',
    },
    metaText: {
        fontSize: 12,
        color: '#555',
        marginLeft: 4,
    },
    metaIcon: {
        marginLeft: 12,
    },
    progressSection: {
        marginVertical: 8,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    progressLabel: {
        fontWeight: 'bold',
        fontSize: 13,
        color: '#000',
    },
    progressValue: {
        fontSize: 13,
        color: '#888',
    },
    progressBarBackground: {
        height: 6,
        backgroundColor: '#eee',
        borderRadius: 6,
        marginTop: 4,
    },
    progressBarFill: {
        height: 6,
        backgroundColor: '#007bff', // blue color
        borderRadius: 6,
    },
    button: {
        backgroundColor: '#007bff', // blue color
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        marginHorizontal: 6,
    },
});
