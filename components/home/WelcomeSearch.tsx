import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

const THEME_KEY = 'appTheme'; // storage key

const WelcomeHeader = () => {
  const systemScheme = useColorScheme(); // system light/dark
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [userName, setUserName] = useState('');
  const [notificationCount, setNotificationCount] = useState(3);

  useEffect(() => {
    const loadUser = async () => {
      const name = await AsyncStorage.getItem('userName');
      const savedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (name) setUserName(name);
      if (savedTheme) setTheme(savedTheme as any);
    };
    loadUser();
  }, []);

  const appliedTheme =
    theme === 'system' ? systemScheme ?? 'light' : theme;

  const handleThemeChange = async (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    await AsyncStorage.setItem(THEME_KEY, newTheme);
  };

  return (
    <View style={[styles.container, appliedTheme === 'dark' && styles.darkContainer]}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Text style={[styles.logoText, appliedTheme === 'dark' && styles.darkText]}>
          SQLMate
        </Text>

        <View style={styles.rightIcons}>
          {/* Notification */}
          <TouchableOpacity style={styles.iconContainer}>
            <Feather name="bell" size={22} color={appliedTheme === 'dark' ? '#fff' : '#000'} />
            {notificationCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{notificationCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Theme Toggle Menu */}
          <Menu>
            <MenuTrigger>
              <View style={styles.iconContainer}>
                <Feather name="sun" size={22} color={appliedTheme === 'dark' ? '#fff' : '#000'} />
              </View>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => handleThemeChange('light')}>
                <Text style={styles.menuItem}>Light</Text>
              </MenuOption>
              <MenuOption onSelect={() => handleThemeChange('dark')}>
                <Text style={styles.menuItem}>Dark</Text>
              </MenuOption>
              <MenuOption onSelect={() => handleThemeChange('system')}>
                <Text style={styles.menuItem}>System</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      </View>

      {/* Greeting */}
      <Text style={[styles.greeting, appliedTheme === 'dark' && styles.darkText]}>
        Welcome back{userName ? `, ${userName}` : ''}! 👋
      </Text>

      {/* Search Input */}
      <TextInput
        placeholder="Search courses, topics, or content"
        placeholderTextColor={appliedTheme === 'dark' ? '#ccc' : '#666'}
        style={[
          styles.searchBar,
          appliedTheme === 'dark' ? styles.searchBarDark : styles.searchBarLight,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#1c1c1e',
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  greeting: {
    fontSize: 18,
    marginTop: 8,
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  searchBar: {
    height: 40,
    marginTop: 16,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  searchBarLight: {
    backgroundColor: '#f1f5f9',
    color: '#000',
  },
  searchBarDark: {
    backgroundColor: '#2c2c2e',
    color: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginLeft: 16,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#ef4444',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
    minWidth: 16,
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  menuItem: {
    padding: 10,
    fontSize: 16,
  },
});

export default WelcomeHeader;
