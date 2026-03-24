import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <View className="flex-row items-center justify-between bg-[#060B28] px-4 py-2 border-t border-gray-800 pb-2">
      <Pressable onPress={() => setActiveTab('Cassino')} className="items-center w-16 relative">
        {activeTab === 'Cassino' && <View className="absolute -top-3 w-10 h-1 bg-green-500 rounded-b-md" />}
        <Ionicons name="game-controller-outline" size={24} color={activeTab === 'Cassino' ? 'white' : '#6B7280'} />
        <Text className={`text-[10px] mt-1 ${activeTab === 'Cassino' ? 'text-white font-bold' : 'text-gray-500'}`}>
          Cassino
        </Text>
      </Pressable>

      <Pressable onPress={() => setActiveTab('Esportes')} className="items-center w-16 relative">
        {activeTab === 'Esportes' && <View className="absolute -top-3 w-10 h-1 bg-green-500 rounded-b-md" />}
        <Ionicons name="football-outline" size={24} color={activeTab === 'Esportes' ? 'white' : '#6B7280'} />
        <Text className={`text-[10px] mt-1 ${activeTab === 'Esportes' ? 'text-white font-bold' : 'text-gray-500'}`}>
          Esportes
        </Text>
      </Pressable>

      <View className="items-center justify-center w-16 h-16 rounded-full bg-slate-200 -mt-10 border-4 border-[#0B0F2A] shadow-lg">
        <Text className="text-3xl font-extrabold text-[#0B8226] italic">E</Text>
      </View>

      <Pressable onPress={() => setActiveTab('Populares')} className="items-center w-16 relative">
        {activeTab === 'Populares' && <View className="absolute -top-3 w-10 h-1 bg-green-500 rounded-b-md" />}
        <Ionicons name="flame-outline" size={24} color={activeTab === 'Populares' ? 'white' : '#6B7280'} />
        <Text className={`text-[10px] mt-1 ${activeTab === 'Populares' ? 'text-white font-bold' : 'text-gray-500'}`}>
          Populares
        </Text>
      </Pressable>

      <Pressable onPress={() => setActiveTab('Suporte')} className="items-center w-16 relative">
        {activeTab === 'Suporte' && <View className="absolute -top-3 w-10 h-1 bg-green-500 rounded-b-md" />}
        <Ionicons name="chatbubble-ellipses-outline" size={24} color={activeTab === 'Suporte' ? 'white' : '#6B7280'} />
        <Text className={`text-[10px] mt-1 ${activeTab === 'Suporte' ? 'text-white font-bold' : 'text-gray-500'}`}>
          Suporte
        </Text>
      </Pressable>
    </View>
  );
}
