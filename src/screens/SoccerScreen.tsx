import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, Alert, Image } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const matches = [
  { id: '1', team1: 'Athletico PR', team2: 'Coritiba', time: 'Hoje 16:00', odds: ['1.94', '3.33', '4.46'], badges: ['BB', '+1122'] },
  { id: '2', team1: 'Remo', team2: 'Bahia', time: 'Hoje 16:00', odds: ['3.14', '3.28', '2.40'], badges: ['BB', '+1128'] },
  { id: '3', team1: 'Vasco da Gama', team2: 'Grêmio', time: 'Hoje 16:00', odds: ['1.91', '3.58', '4.20'], badges: ['BB', '+1122'] },
  { id: '4', team1: 'Cruzeiro', team2: 'Santos', time: 'Hoje 16:00', odds: ['1.74', '3.58', '5.42'], badges: ['BB', '+1136'] },
];

export function SoccerScreen({ onBack, onBetSelected }: { onBack: () => void; onBetSelected?: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  const [activeSport, setActiveSport] = useState('Futebol');
  const [activeMarket, setActiveMarket] = useState('Resultado');
  const [selectedOdds, setSelectedOdds] = useState<Record<string, number>>({});

  const toggleOdd = (matchId: string, oddIndex: number) => {
    if (selectedOdds[matchId] !== oddIndex && onBetSelected) {
      onBetSelected();
    }
    setSelectedOdds(prev => ({
      ...prev,
      [matchId]: prev[matchId] === oddIndex ? -1 : oddIndex
    }));
  };

  return (
    <View className="flex-1 bg-[#090B22]">
      <View className="px-4 pt-2 pb-4 bg-[#090B22]">
        <View className="flex-row items-center justify-between mt-2">
          <Feather name="menu" size={28} color="white" />
          <Image source={require('../../assets/logos/logo_eds_deitada.png')} className="w-36 h-8" resizeMode="contain" />
          <View className="w-8" />
        </View>
        <View className="mt-4">
          <View className="flex-row items-center bg-[#1D2146] rounded-full px-4 py-3 border border-[#2B325A]">
            <Feather name="search" size={20} color="#9CA3AF" />
            <TextInput
              placeholder="Pesquisa"
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-white ml-2 py-0"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>

        <View className="flex-row items-center justify-between px-4 py-2 mt-2">
          <View className="flex-row items-center">
            <Pressable onPress={onBack} className="mr-3 active:opacity-70">
              <Feather name="chevron-left" size={24} color="white" />
            </Pressable>
            <Text className="text-white text-xl font-bold">Futebol</Text>
          </View>
        </View>

        <View className="flex-row px-4 mt-6 items-center justify-between">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-1 mr-3" contentContainerStyle={{ paddingRight: 10 }}>
            <Pressable onPress={() => setActiveSport('Futebol')} className={`flex-row items-center px-4 py-2 rounded-full border mr-2 ${activeSport === 'Futebol' ? 'bg-[#0B8226] border-green-500' : 'bg-[#0D1431] border-[#2B325A]'}`}>
              <Ionicons name="football" size={14} color={activeSport === 'Futebol' ? 'white' : 'gray'} />
              <Text className={`font-bold ml-1.5 text-xs ${activeSport === 'Futebol' ? 'text-white' : 'text-gray-400'}`}>Futebol</Text>
            </Pressable>
            <Pressable onPress={() => setActiveSport('eFootball')} className={`flex-row items-center px-4 py-2 rounded-full border mr-2 ${activeSport === 'eFootball' ? 'bg-[#0B8226] border-green-500' : 'bg-[#0D1431] border-[#2B325A]'}`}>
              <Ionicons name="game-controller" size={14} color={activeSport === 'eFootball' ? 'white' : 'gray'} />
              <Text className={`font-bold ml-1.5 text-xs ${activeSport === 'eFootball' ? 'text-white' : 'text-gray-400'}`}>eFootball</Text>
            </Pressable>
            <Pressable onPress={() => setActiveSport('Basquete')} className={`flex-row items-center px-4 py-2 rounded-full border mr-2 ${activeSport === 'Basquete' ? 'bg-[#0B8226] border-green-500' : 'bg-[#0D1431] border-[#2B325A]'}`}>
              <Ionicons name="basketball" size={14} color={activeSport === 'Basquete' ? 'white' : '#E58000'} />
              <Text className={`font-bold ml-1.5 text-xs ${activeSport === 'Basquete' ? 'text-white' : 'text-gray-400'}`}>Basquete</Text>
            </Pressable>
            <Pressable onPress={() => setActiveSport('Tênis')} className={`flex-row items-center px-4 py-2 rounded-full border mr-2 ${activeSport === 'Tênis' ? 'bg-[#0B8226] border-green-500' : 'bg-[#0D1431] border-[#2B325A]'}`}>
              <Ionicons name="tennisball" size={14} color={activeSport === 'Tênis' ? 'white' : 'yellow'} />
              <Text className={`font-bold ml-1.5 text-xs ${activeSport === 'Tênis' ? 'text-white' : 'text-gray-400'}`}>Tênis</Text>
            </Pressable>
          </ScrollView>

          <Pressable className="flex-row items-center bg-[#2B325A] px-4 py-2 rounded-full active:bg-[#343D6B] h-9" onPress={() => Alert.alert('Filtro', 'Opções em breve')}>
            <Text className="text-white font-medium mr-1 text-[11px]">Filtro</Text>
            <Feather name="chevron-down" size={16} color="white" />
          </Pressable>
        </View>

        <View className="px-4 mt-8">
          <Text className="text-gray-400 text-sm mb-4">Deslize para mostrar os jogos nas próximas X horas</Text>
          <View className="w-full h-1 bg-[#1D2146] rounded-full relative justify-center">
            <View className="w-6 h-6 bg-white rounded-full absolute -left-1 shadow-md z-10" />
            <View className="w-[10%] h-1 bg-blue-500 rounded-full absolute left-0" />
          </View>
          <View className="flex-row justify-between mt-3 px-1">
            <Text className="text-white text-[10px] font-bold">Todos</Text>
            <Text className="text-blue-400 text-[10px] font-bold">1</Text>
            <Text className="text-blue-400 text-[10px] font-bold">2</Text>
            <Text className="text-blue-400 text-[10px] font-bold">4</Text>
            <Text className="text-blue-400 text-[10px] font-bold">6</Text>
            <Text className="text-blue-400 text-[10px] font-bold">12</Text>
            <Text className="text-blue-400 text-[10px] font-bold">24</Text>
            <Text className="text-blue-400 text-[10px] font-bold">48</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4 mt-8 border-b border-[#1D2146] pb-3" contentContainerStyle={{ paddingRight: 20 }}>
          <View className="relative mr-6">
            <View className="absolute -top-3 right-0 bg-[#E58000] px-1 py-0.5 rounded z-10">
              <Text className="text-[8px] font-bold text-white">Cashout</Text>
            </View>
            <Pressable onPress={() => setActiveMarket('Resultado')} className={`px-4 py-2 rounded-full ${activeMarket === 'Resultado' ? 'bg-[#0B8226]' : 'bg-transparent'}`}>
              <Text className={`font-bold text-sm ${activeMarket === 'Resultado' ? 'text-white' : 'text-gray-400'}`}>Resultado</Text>
            </Pressable>
          </View>

          <View className="relative mr-6 mt-2 ml-2">
            <View className="absolute -top-3 -right-2 bg-[#E58000] px-1 py-0.5 rounded z-10">
              <Text className="text-[8px] font-bold text-white">Cashout</Text>
            </View>
            <Pressable onPress={() => setActiveMarket('Total Gols')} className={`px-4 py-2 rounded-full ${activeMarket === 'Total Gols' ? 'bg-[#0B8226]' : 'bg-transparent'}`}>
              <Text className={`font-bold text-sm ${activeMarket === 'Total Gols' ? 'text-white' : 'text-gray-400'}`}>Total Gols</Text>
            </Pressable>
          </View>

          <View className="relative mr-6 mt-2 ml-4">
            <View className="absolute -top-3 -right-2 bg-[#E58000] px-1 py-0.5 rounded z-10">
              <Text className="text-[8px] font-bold text-white">Cashout</Text>
            </View>
            <Pressable onPress={() => setActiveMarket('Ambas equipes marcam')} className={`px-4 py-2 rounded-full ${activeMarket === 'Ambas equipes marcam' ? 'bg-[#0B8226]' : 'bg-transparent'}`}>
              <Text className={`font-bold text-sm ${activeMarket === 'Ambas equipes marcam' ? 'text-white' : 'text-gray-400'}`}>Ambas equipes marcam</Text>
            </Pressable>
          </View>
        </ScrollView>

        <View className="px-4 mt-6">
          <Pressable
            onPress={() => Alert.alert('Brasil', 'Expandir ligas')}
            className="flex-row items-center justify-between py-2 rounded-lg bg-[#090B22]"
          >
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-green-600 border-2 border-yellow-400 items-center justify-center mr-3">
                <View className="w-3 h-3 bg-blue-600 rounded-full" />
              </View>
              <Text className="text-white text-lg font-bold">Brasil</Text>
            </View>
            <Feather name="chevron-down" size={20} color="white" />
          </Pressable>

          <View className="bg-[#040819] rounded-xl mt-3 overflow-hidden border border-[#1D2146]">
            <View className="flex-row items-center justify-between px-3 py-3 bg-[#0B112B]">
              <View className="flex-row items-center">
                <Feather name="chevron-down" size={16} color="white" className="mr-2" />
                <Text className="text-white font-bold text-xs ml-1">Brasileiro Série A 2026</Text>
              </View>
              <View className="flex-row w-[48%] justify-around">
                <Text className="text-gray-500 font-bold text-[10px]">1</Text>
                <Text className="text-gray-500 font-bold text-[10px]">X</Text>
                <Text className="text-gray-500 font-bold text-[10px]">2</Text>
              </View>
            </View>

            {matches.map((match, i) => (
              <View key={match.id} className={`flex-row items-center justify-between px-3 py-4 ${i < matches.length - 1 ? 'border-b border-[#1D2146]' : ''}`}>

                <View className="flex-1 mr-2">
                  <View className="flex-row items-center mb-1.5">
                    <MaterialCommunityIcons name="shield-half-full" size={14} color="red" />
                    <Text className="text-white font-bold text-xs ml-2" numberOfLines={1}>{match.team1}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons name="shield-star" size={14} color="lightblue" />
                    <Text className="text-white font-bold text-xs ml-2" numberOfLines={1}>{match.team2}</Text>
                  </View>
                  <View className="flex-row items-center mt-3">
                    <Text className="text-gray-400 text-[10px] italic mr-2">{match.time}</Text>
                    <View className="bg-[#00D042] px-1 py-0.5 rounded mr-1">
                      <Text className="text-black font-extrabold text-[8px]">{match.badges[0]}</Text>
                    </View>
                    <View className="bg-[#1D2146] px-1 py-0.5 rounded">
                      <Text className="text-gray-300 font-bold text-[8px]">{match.badges[1]}</Text>
                    </View>
                  </View>
                </View>

                <Pressable className="w-7 h-7 rounded mr-3 items-center justify-center opacity-80" onPress={() => Alert.alert('Stats', 'Estatísticas da partida')}>
                  <Feather name="bar-chart-2" size={16} color="#00D042" />
                </Pressable>

                <View className="flex-row w-[48%] justify-between gap-x-1">
                  <Pressable
                    onPress={() => toggleOdd(match.id, 0)}
                    className={`px-1 py-3.5 rounded flex-1 items-center justify-center active:opacity-70 ${selectedOdds[match.id] === 0 ? 'bg-[#0B8226]' : 'bg-[#151B33]'}`}
                  >
                    <Text className="text-white font-bold text-[11px]">{match.odds[0]}</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => toggleOdd(match.id, 1)}
                    className={`px-1 py-3.5 rounded flex-1 items-center justify-center active:opacity-70 ${selectedOdds[match.id] === 1 ? 'bg-[#0B8226]' : 'bg-[#151B33]'}`}
                  >
                    <Text className="text-white font-bold text-[11px]">{match.odds[1]}</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => toggleOdd(match.id, 2)}
                    className={`px-1 py-3.5 rounded flex-1 items-center justify-center active:opacity-70 ${selectedOdds[match.id] === 2 ? 'bg-[#0B8226]' : 'bg-[#151B33]'}`}
                  >
                    <Text className="text-white font-bold text-[11px]">{match.odds[2]}</Text>
                  </Pressable>
                </View>

              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
