import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function CourseDetailScreen() {
  const { slug } = useLocalSearchParams();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        Lessons for: {slug}
      </Text>
      {/* You can render lessons list based on the slug */}
    </View>
  );
}
