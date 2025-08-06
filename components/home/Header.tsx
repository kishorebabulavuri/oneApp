// components/home/Header.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bell, SunMedium } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function Header() {
  const [username, setUsername] = useState('User');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedName = await AsyncStorage.getItem('username');
        if (storedName) {
          setUsername(storedName);
        }
      } catch (e) {
        console.error('Error fetching username:', e);
      }
    };
    fetchUsername();
  }, []);

  return (
    <View className="flex-row justify-between items-center px-4 pt-6">
      <View>
        <Text className="text-xl font-bold text-[#1E40AF]">SQLMate</Text>
        <Text className="text-sm text-gray-700">Welcome back, {username}! 👋</Text>
      </View>
      <View className="flex-row gap-3">
        <Pressable className="relative p-2 rounded-full bg-white shadow">
          <Bell size={20} color="#000" />
          <View className="absolute top-0 right-0 w-4 h-4 rounded-full bg-black justify-center items-center">
            <Text className="text-[10px] text-white font-bold">3</Text>
          </View>
        </Pressable>
        <Pressable className="p-2 rounded-full bg-white shadow">
          <SunMedium size={20} color="#000" />
        </Pressable>
      </View>
    </View>
  );
}
