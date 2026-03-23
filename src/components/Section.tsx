import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';

interface SectionProps {
  title: string;
  children: ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <View className="w-full px-6 mb-8 mt-2">
      <Text className="text-white text-lg font-bold mb-4 text-center">{title}</Text>
      {children}
    </View>
  );
}
