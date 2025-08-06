import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
}

const filterOptions = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const CoursesHeader: React.FC<Props> = ({ onSearch, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <View style={styles.container}>
      {/* Title Only */}
      <View style={styles.topRow}>
        <Text style={styles.title}>Courses</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={18} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search courses"
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            onSearch(text);
          }}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setSearchQuery('');
              onSearch('');
            }}
          >
            <Feather name="x" size={18} color="#888" style={styles.clearIcon} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Tabs */}
      <FlatList
        data={filterOptions}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => {
          const isActive = item === activeFilter;
          return (
            <TouchableOpacity
              onPress={() => handleFilterChange(item)}
              style={[
                styles.filterButton,
                isActive && styles.activeFilterButton,
              ]}
            >
              <Text style={[styles.filterText, isActive && styles.activeFilterText]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
        style={styles.filterList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
    backgroundColor: '#0d0d0d',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  clearIcon: {
    marginLeft: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
  },
  filterList: {
    marginTop: 4,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
  },
  activeFilterButton: {
    backgroundColor: '#ffffff',
  },
  filterText: {
    color: '#aaa',
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#000',
  },
});

export default CoursesHeader;
