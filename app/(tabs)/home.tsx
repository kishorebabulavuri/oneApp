// app/(tabs)/home.tsx
import Achievements from '@/components/home/Achievements';
import CourseProgress from '@/components/home/CourseProgress';
import QuickStart from '@/components/home/QuickStart';
import StreakPointsCard from '@/components/home/StreakPoints';
import WelcomeSearch from '@/components/home/WelcomeSearch';


import { ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-[#f1f5f9]">
      <WelcomeSearch />
      <StreakPointsCard />
      <QuickStart />
      <CourseProgress />
      <Achievements />

      {/* Add rest of your components here like SearchBar, StreakCards, etc. */}
    </ScrollView>
  );
}
