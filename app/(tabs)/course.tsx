// app/(tabs)/course.tsx
import React, { useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';

import AdvancedQueriesAndJoins from '@/components/courses/AdvancedQueriesAndJoins';
import CoursesHeader from '@/components/courses/CoursesHeader';
import CourseStats from '@/components/courses/CourseStats';
import DBDesignAndOptimization from '@/components/courses/DBDesignAndOptimization';
import PerformanceOptimization from '@/components/courses/performanceOptimization';
import SQLForDataAnalysis from '@/components/courses/sqlForDataAnalysis';
import SqlFundamental from '@/components/courses/sqlFundamental';

export default function CoursesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [refreshing, setRefreshing] = useState(false);

  const coursesData = [
    {
      title: 'SQL Fundamentals',
      level: 'Beginner',
      component: <SqlFundamental />,
    },
    {
      title: 'Advanced Queries & Joins',
      level: 'Intermediate',
      component: <AdvancedQueriesAndJoins />,
    },
    {
      title: 'Database Design & Optimization',
      level: 'Intermediate',
      component: <DBDesignAndOptimization />,
    },
    {
      title: 'SQL for Data Analysis',
      level: 'Advanced',
      component: <SQLForDataAnalysis />,
    },
    {
      title: 'Performance Optimization',
      level: 'Advanced',
      component: <PerformanceOptimization />,
    },
  ];

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'All' || course.level === filter;
    return matchesSearch && matchesFilter;
  });

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      // Optionally refetch or reload data here
      setRefreshing(false);
    }, 1000);
  };

  return (
    <FlatList
      data={
        filteredCourses.length > 0
          ? [<CourseStats key="stats" />, ...filteredCourses.map((c, i) => <View key={i}>{c.component}</View>)]
          : []
      }
      renderItem={({ item }) => <View style={{ marginBottom: 20 }}>{item}</View>}
      keyExtractor={(_, index) => index.toString()}
      ListHeaderComponent={
        <CoursesHeader
          onSearch={(query) => setSearchQuery(query)}
          onFilterChange={(f) => setFilter(f)}
        />
      }
      stickyHeaderIndices={[0]}
      ListEmptyComponent={
        <View style={{ padding: 40, alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: '#999' }}>No results found.</Text>
        </View>
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );
}
