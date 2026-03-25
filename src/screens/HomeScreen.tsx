import React from 'react';
import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

const categories = ['Todos os jogos', 'Últimos jogados', 'Novidades', 'Populares', 'Slots', 'Ao Vivo'];

export function HomeScreen({ onSearchClick }: { onSearchClick: () => void }) {
  return (
    <View className="flex-1 bg-[#090B22]">
      <View className="flex-row items-center justify-between px-4 py-2 mt-2">
        <Pressable className="active:opacity-70">
          <Feather name="menu" size={28} color="white" />
        </Pressable>
        <Image source={require('../../assets/logos/logo_eds_deitada.png')} className="w-36 h-8" resizeMode="contain" />
        <View className="w-8" />
      </View>

      <View className="px-4 mt-4">
        <Pressable
          onPress={onSearchClick}
          className="flex-row items-center bg-[#1D2146] rounded-full px-4 py-3 border border-[#2B325A] active:opacity-80"
        >
          <Feather name="search" size={20} color="#9CA3AF" />
          <Text className="text-[#9CA3AF] ml-2">Pesquisa</Text>
        </Pressable>
      </View>

      <View className="flex-row px-4 mt-6 items-center justify-between">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-1 mr-3"
          contentContainerStyle={{ paddingRight: 10, alignItems: 'center' }}
        >
          {categories.map((cat, i) => (
            <View key={cat} className={`px-4 py-2 rounded-full border mr-2 ${i === 0 ? 'bg-[#0B8226] border-green-500' : 'bg-[#0D1431] border-[#2B325A]'}`}>
              <Text className={`font-semibold text-xs ${i === 0 ? 'text-white' : 'text-gray-400'}`}>{cat}</Text>
            </View>
          ))}
        </ScrollView>

        <Pressable className="flex-row items-center bg-[#2B325A] px-4 py-2 rounded-full opacity-80 h-9">
          <Text className="text-white font-medium mr-1 text-xs">Filtro</Text>
          <Feather name="chevron-down" size={16} color="white" />
        </Pressable>
      </View>

      <View className="flex-1 items-center justify-center px-6 mt-10">
        <Text className="text-white text-2xl font-bold text-center">Conteúdo da Home</Text>
        <Text className="text-gray-400 mt-2 text-center">
          (Em andamento)
        </Text>
      </View>
    </View>
  );
}
