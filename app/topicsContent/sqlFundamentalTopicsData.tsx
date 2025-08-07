// app/topicsContent/sqlFundamentalTopicsData.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  useWindowDimensions,
  RefreshControl,
  Image, // Import the Image component
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import CodeHighlighter from 'react-native-code-highlighter';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface Topic {
  id: number;
  title: string;
  image: string; // The new image property
  content: string;
  sqlQuery: string;
  queryResult: string;
  queryExplanation: string;
}

export default function SQLTopicPage() {
  const router = useRouter();
  const { lessonId } = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // ... (Your fetchTopicData, useEffect, onRefresh, and handleGoBack functions remain the same)
  const fetchTopicData = async () => {
    if (!lessonId) {
      setError('Lesson ID is missing.');
      setLoading(false);
      return;
    }
    try {
      const url = 'https://raw.githubusercontent.com/kishorebabulavuri/AppData1/main/sqlFundamentalTopicsData.json';
      const res = await axios.get(`${url}?t=${new Date().getTime()}`);
      const allTopics = res.data;
      if (!Array.isArray(allTopics)) {
        throw new Error("Fetched topics data is not an array.");
      }
      const currentTopic = allTopics.find(
        (t: Topic) => t.id.toString() === lessonId
      );
      if (currentTopic) {
        setTopic(currentTopic);
      } else {
        setError(`No topic found for lesson ID: ${lessonId}`);
      }
    } catch (err) {
      console.error('Failed to load topic data:', err);
      setError('Failed to load the lesson content. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTopicData();
  }, [lessonId]);
  
  const onRefresh = () => {
    setRefreshing(true);
    fetchTopicData();
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/course/sqlFundamental');
    }
  };


  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#00c07d" />
      </View>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
        </View>
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{topic?.title}</Text>
      </View>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={{ paddingHorizontal: width * 0.05, paddingBottom: 30 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.topicTitle}>{topic?.title}</Text>
        
        {/* Render the new Image component */}
        {topic?.image && (
          <Image source={{ uri: topic.image }} style={styles.topicImage} />
        )}
        
        <Text style={styles.topicContent}>{topic?.content}</Text>
        
        <Text style={styles.subheading}>Example Query</Text>
        <CodeHighlighter
          hljsStyle={atomOneDarkReasonable}
          containerStyle={styles.codeContainer}
          textStyle={styles.codeText}
          language="sql"
        >
          {topic?.sqlQuery || ''}
        </CodeHighlighter>
        
        <Text style={styles.subheading}>Result</Text>
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>{topic?.queryResult}</Text>
        </View>
        
        <Text style={styles.subheading}>Explanation</Text>
        <Text style={styles.topicContent}>{topic?.queryExplanation}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? 28 : 0,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: 16,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 20,
    marginBottom: 16,
  },
  topicImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    marginBottom: 24,
    backgroundColor: '#F3F4F6', // A placeholder color while the image loads
  },
  topicContent: {
    fontSize: 17,
    color: '#374151',
    lineHeight: 28,
    marginBottom: 24,
  },
  subheading: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 6,
  },
  codeContainer: {
    padding: 16,
    minWidth: '100%',
    borderRadius: 8,
    marginBottom: 24,
  },
  codeText: {
    fontSize: 16,
  },
  resultBox: {
    backgroundColor: '#282c34', 
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  resultText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: '#abb2bf',
    fontSize: 16,
  }
});