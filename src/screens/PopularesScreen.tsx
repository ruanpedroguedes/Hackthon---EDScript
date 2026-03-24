import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function PopularesScreen() {
  return (
    <View className="flex-1 bg-[#090B22] items-center justify-center">
      <Ionicons name="flame" size={80} color="#E58000" />
      <Text className="text-white text-2xl font-bold mt-6">Tela de Populares</Text>
      <Text className="text-gray-400 mt-2 text-center px-8">
        Aqui ficarão listados os jogos e apostas mais bombadas do momento!
      </Text>
    </View>
  );
}
