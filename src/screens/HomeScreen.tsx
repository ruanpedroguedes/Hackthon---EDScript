import React from 'react';
import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

const categories = ['Todos os jogos', 'Últimos jogados', 'Novidades', 'Populares', 'Slots', 'Ao Vivo'];

export function HomeScreen({ onSearchClick, onBetSelected }: { onSearchClick: () => void; onBetSelected?: () => void }) {
  const mockMatches = [
    { id: '1', team1: 'Real Madrid', team2: 'Liverpool', time: 'Hoje 21:00', odds: ['3.46', '2.50', '2.10'] },
    { id: '2', team1: 'Chelsea', team2: 'Juventus', time: 'Amanhã 16:00', odds: ['2.15', '3.10', '2.80'] },
  ];
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

      <ScrollView className="flex-1 mt-6 px-4" showsVerticalScrollIndicator={false}>
        <Text className="text-white text-lg font-bold mb-4">Em Destaque</Text>
        
        {mockMatches.map((match) => (
          <View key={match.id} className="bg-[#1D2146] rounded-xl p-4 mb-4 border border-[#2B325A]">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-white font-bold text-sm px-2 flex-1 text-center" numberOfLines={1}>{match.team1}</Text>
              <Text className="text-[#00D1FF] text-xs font-black">X</Text>
              <Text className="text-white font-bold text-sm px-2 flex-1 text-center" numberOfLines={1}>{match.team2}</Text>
            </View>
            <Text className="text-gray-400 text-[10px] uppercase font-bold text-center mb-3">
              {match.time}
            </Text>

            <View className="flex-row justify-between">
              <Pressable
                onPress={onBetSelected}
                className="flex-[0.31] bg-[#2B325A] py-2.5 rounded-lg items-center active:opacity-70"
              >
                <Text className="text-white font-bold text-sm">{match.odds[0]}</Text>
                <Text className="text-gray-400 text-[9px] uppercase mt-0.5">Casa</Text>
              </Pressable>
              <Pressable
                onPress={onBetSelected}
                className="flex-[0.31] bg-[#2B325A] py-2.5 rounded-lg items-center active:opacity-70"
              >
                <Text className="text-white font-bold text-sm">{match.odds[1]}</Text>
                <Text className="text-gray-400 text-[9px] uppercase mt-0.5">Empate</Text>
              </Pressable>
              <Pressable
                onPress={onBetSelected}
                className="flex-[0.31] bg-[#2B325A] py-2.5 rounded-lg items-center active:opacity-70"
              >
                <Text className="text-white font-bold text-sm">{match.odds[2]}</Text>
                <Text className="text-gray-400 text-[9px] uppercase mt-0.5">Fora</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
