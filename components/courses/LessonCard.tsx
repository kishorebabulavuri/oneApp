import { CheckCircle } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';

export default function LessonCard({ lesson }: { lesson: any }) {
  return (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
      <View className="flex-row items-center gap-2">
        <CheckCircle color="#4ADE80" size={20} />
        <Text className="text-base font-semibold">
          {lesson.id}. {lesson.title}
        </Text>
      </View>
      <View className="flex-row gap-4 mt-1 mb-1">
        <Text className="text-xs text-gray-600">{lesson.duration}</Text>
        <Text className="text-xs text-gray-600">• {lesson.type}</Text>
      </View>
      <Text className="text-sm text-gray-700 mb-2">{lesson.description}</Text>
      <TouchableOpacity className="self-end bg-gray-100 rounded-md px-4 py-1">
        <Text className="text-sm text-black font-semibold">Review</Text>
      </TouchableOpacity>
    </View>
  );
}
