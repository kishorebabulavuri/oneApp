import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const slides = [
  {
    id: '1',
    title: 'Welcome to SQLMate',
    description: 'Learn SQL interactively with flashcards, quizzes, and notes!',
    image: require('../../assets/sql-logo.png'),
  },
  {
    id: '2',
    title: 'Track Your Progress',
    description: 'Earn daily streaks and rewards as you learn.',
    image: require('../../assets/sql-logo.png'),
  },
  {
    id: '3',
    title: 'Ace Interviews',
    description: 'Get top interview questions with answers!',
    image: require('../../assets/sql-logo.png'),
  },
  {
    id: '4',
    title: "Let's Get Started!",
    description: 'Time to begin your SQL journey.',
    image: require('../../assets/sql-logo.png'),
  },
];

export default function OnboardingScreen() {
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [name, setName] = useState('');
  const flatListRef = useRef<FlatList>(null);

  // Base dimensions for scaling (iPhone 6/7/8)
  const baseWidth = 375;
  const scale = windowWidth / baseWidth;

  // Update dimensions on screen size change
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setWindowWidth(window.width);
    });
    return () => subscription?.remove();
  }, []);

  const handleNext = async () => {
    if (currentIndex === slides.length - 1) {
      if (!name.trim()) {
        alert('Please enter your name');
        return;
      }
      await AsyncStorage.setItem('hasOnboarded', 'true');
      await AsyncStorage.setItem('userName', name.trim());
      router.replace('/(tabs)/home');
    } else {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const renderItem = ({ item, index }: any) => (
    <View style={{ 
      width: windowWidth, 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: 20 * scale 
    }}>
      <Image 
        source={item.image} 
        style={{ 
          width: windowWidth * 0.6, 
          height: windowWidth * 0.6, 
          marginBottom: 30 * scale 
        }} 
        resizeMode="contain" 
      />
      <Text style={{ 
        fontSize: 24 * scale, 
        fontWeight: 'bold', 
        textAlign: 'center' 
      }}>{item.title}</Text>
      <Text style={{ 
        fontSize: 16 * scale, 
        textAlign: 'center', 
        marginTop: 10 * scale 
      }}>{item.description}</Text>
      {index === slides.length - 1 && (
        <>
          <TextInput
            placeholder="Enter your good name"
            value={name}
            onChangeText={setName}
            style={{
              marginTop: 20 * scale,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 10 * scale,
              padding: 12 * scale,
              width: '100%',
              fontSize: 16 * scale,
            }}
          />
          <TouchableOpacity
            onPress={handleNext}
            style={{
              backgroundColor: '#007bff',
              paddingVertical: 12 * scale,
              paddingHorizontal: 30 * scale,
              borderRadius: 10 * scale,
              marginTop: 20 * scale,
            }}>
            <Text style={{ 
              color: '#fff', 
              fontSize: 16 * scale, 
              fontWeight: 'bold' 
            }}>Get Started</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />
      {/* Show "Next" only if not last screen */}
      {currentIndex < slides.length - 1 && (
        <TouchableOpacity
          onPress={handleNext}
          style={{
            position: 'absolute',
            bottom: 40 * scale,
            right: 30 * scale,
            backgroundColor: '#007bff',
            paddingVertical: 10 * scale,
            paddingHorizontal: 20 * scale,
            borderRadius: 10 * scale,
          }}>
          <Text style={{ 
            color: '#fff', 
            fontWeight: 'bold', 
            fontSize: 16 * scale 
          }}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}