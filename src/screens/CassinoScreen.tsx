import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, Alert, Animated } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const games = [
  { id: '1', name: 'Gênio da Sorte', provider: 'GAMES GLOBAL', badge: 'NOVO', badgeColor: 'bg-red-500' },
  { id: '2', name: 'Fortune Tiger', provider: 'PG SOFT', badge: 'POPULARES', badgeColor: 'bg-green-500' },
  { id: '3', name: 'Fortune Ox', provider: 'PG SOFT', badge: 'POPULARES', badgeColor: 'bg-green-500' },
  { id: '4', name: 'Dragon Hatch', provider: 'PG SOFT' },
  { id: '5', name: 'Fortune Mouse', provider: 'PG SOFT', badge: 'POPULARES', badgeColor: 'bg-green-500' },
  { id: '6', name: 'Breezin Riches', provider: 'PEARFICTION STUDIOS', badge: 'NOVO', badgeColor: 'bg-green-500' },
];

const categories = ['Todos os jogos', 'Últimos jogados', 'Novidades', 'Populares', 'Slots', 'Ao Vivo'];

export function CassinoScreen({ onBack }: { onBack?: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos os jogos');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        bounciness: 4,
        speed: 12,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Animated.View className="flex-1 bg-[#090B22]" style={{ opacity: fadeAnim, transform: [{ translateX: slideAnim }] }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      >

        <View className="flex-row items-center justify-between px-4 py-2 mt-2">
          <Pressable onPress={onBack || (() => Alert.alert('Menu', 'Abrir menu lateral'))} className="active:opacity-70">
            <Feather name={onBack ? "chevron-left" : "menu"} size={28} color="white" />
          </Pressable>
          <Text className="text-white font-semibold text-xl tracking-tighter">
            <Text className="text-green-500 font-extrabold italic">ES</Text>portes da Sorte
          </Text>
          <View className="w-8" />
        </View>

        <View className="px-4 mt-4">
          <View className="flex-row items-center bg-[#1D2146] rounded-full px-4 py-3 border border-[#2B325A]">
            <Feather name="search" size={20} color="#9CA3AF" />
            <TextInput
              placeholder="Pesquisa"
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-white ml-2 py-0"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus={true}
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')} className="p-1">
                <Feather name="x-circle" size={16} color="#9CA3AF" />
              </Pressable>
            )}
          </View>
        </View>

        <View className="flex-row px-4 mt-6 items-center justify-between">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            className="flex-1 mr-3" 
            contentContainerStyle={{ paddingRight: 10, alignItems: 'center' }}
          >
            {categories.map(cat => (
              <Pressable 
                key={cat}
                onPress={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full border mr-2 items-center justify-center active:opacity-80 ${
                  activeCategory === cat 
                    ? 'bg-[#0B8226] border-green-500' 
                    : 'bg-[#0D1431] border-[#2B325A]'
                }`}
              >
                <Text 
                  className={`font-semibold text-xs whitespace-nowrap ${
                    activeCategory === cat ? 'text-white' : 'text-gray-400'
                  }`} 
                >
                  {cat}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          
          <Pressable 
            onPress={() => Alert.alert('Filtros', 'Opções de filtro em breve')}
            className="flex-row items-center bg-[#2B325A] px-4 py-2 rounded-full active:bg-[#343D6B] h-9"
          >
            <Text className="text-white font-medium mr-1 text-xs">Filtro</Text>
            <Feather name="chevron-down" size={16} color="white" />
          </Pressable>
        </View>

        <View className="flex-row flex-wrap justify-between px-4 mt-8 gap-y-4">
          {filteredGames.length > 0 ? (
            filteredGames.map(game => (
              <Pressable
                key={game.id}
                onPress={() => Alert.alert('Jogar', `Abrindo o jogo ${game.name}...`)}
                className="w-[48%] bg-[#060A1D] rounded-xl overflow-hidden border border-[#1D2146] active:opacity-70"
              >
                <View className="h-28 bg-[#2B325A] items-center justify-center relative">
                  {game.badge && (
                    <View className={`absolute top-0 left-0 ${game.badgeColor} px-2 py-0.5 rounded-br-lg z-10`}>
                      <Text className="text-white text-[9px] font-bold">{game.badge}</Text>
                    </View>
                  )}
                  <Ionicons name="game-controller" size={36} color="#4B5563" />
                </View>
                <View className="p-2 items-center bg-[#070B24] border-t border-[#1D2146]">
                  <Text className="text-white font-bold text-xs text-center" numberOfLines={1}>
                    {game.name}
                  </Text>
                  <Text className="text-gray-400 text-[9px] mt-0.5 text-center uppercase tracking-wide">
                    {game.provider}
                  </Text>
                </View>
              </Pressable>
            ))
          ) : (
            <View className="w-full items-center justify-center mt-10">
              <Text className="text-gray-400 text-center">Nenhum jogo encontrado com "{searchQuery}"</Text>
            </View>
          )}
        </View>

      </ScrollView>
    </Animated.View>
  );
}
