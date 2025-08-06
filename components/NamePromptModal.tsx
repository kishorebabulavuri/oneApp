// components/NamePromptModal.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

export default function NamePromptModal({ onNameSaved }: { onNameSaved: (name: string) => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    (async () => {
      const storedName = await AsyncStorage.getItem('username');
      if (!storedName) {
        setIsVisible(true);
      } else {
        onNameSaved(storedName);
      }
    })();
  }, []);

  const handleSave = async () => {
    if (name.trim()) {
      await AsyncStorage.setItem('username', name);
      setIsVisible(false);
      onNameSaved(name);
    }
  };

  return (
    <Modal isVisible={isVisible} animationIn="fadeInUp" avoidKeyboard>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View className="bg-white p-6 rounded-2xl shadow-xl items-center">
          <Text className="text-2xl font-bold mb-4 text-center">👋 Hey there!</Text>
          <Text className="text-gray-700 text-base mb-4 text-center">What s your name?</Text>
          <TextInput
            className="w-full p-3 mb-4 text-center border-b-2 border-green-500"
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            autoFocus
          />
          <TouchableOpacity
            className="bg-indigo-600 active:bg-indigo-700 px-6 py-3 rounded-full"
            onPress={handleSave}
          >
            <Text className="text-white font-bold">Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}