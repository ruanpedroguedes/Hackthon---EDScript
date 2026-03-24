import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function SuporteScreen() {
  return (
    <View className="flex-1 bg-[#090B22] items-center justify-center">
      <Ionicons name="chatbubbles" size={80} color="#0B8226" />
      <Text className="text-white text-2xl font-bold mt-6">Tela de Suporte</Text>
      <Text className="text-gray-400 mt-2 text-center px-8">
        Fale com nosso time de atendimento 24h para tirar suas dúvidas.
      </Text>
    </View>
  );
}
