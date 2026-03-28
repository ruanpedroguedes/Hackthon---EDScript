import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BottomNav } from '../components/BottomNav';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Data ────────────────────────────────────────────────────────────────────

const categoryTabs = [
  { label: 'Favoritos', icon: 'star' as const },
  { label: 'Futebol', icon: 'football' as const },
  { label: 'eSPORTS', icon: 'game-controller' as const },
];

const popularSports = [
  { label: 'Basquete', image: require('../../assets/esportes/basquete.png') },
  { label: 'Tênis', image: require('../../assets/esportes/tennis.png') },
  { label: 'Vôlei', image: require('../../assets/esportes/volei.png') },
  { label: 'Luta', image: require('../../assets/esportes/luta.png') },
  { label: 'eSports', image: require('../../assets/esportes/cs.png') },
  { label: 'Fórmula 1', image: require('../../assets/esportes/formula1.png') },
];

const liveMatches = [
  {
    id: '1',
    time: '72:10',
    period: '2ª Parte',
    team1: 'Atlético-MG',
    team1Badge: require('../../assets/esportes/atleticom.png'),
    score1: 3,
    team2: 'São Paulo',
    team2Badge: null, // placeholder — adicione o caminho do escudo
    score2: 0,
    oddsType: 'full', // tem Resultado + Ambas marcam
    odds: [
      { label: 'Empate', value: '21.00' },
      { label: 'São Paulo', value: '100.00' },
      { label: '', value: '6.00', headerLabel: 'Ambas marcam' },
      { label: 'Não', value: '1.14' },
    ],
  },
  {
    id: '2',
    time: '17:27',
    period: '1ª Parte',
    team1: 'Santa Cruz',
    team1Badge: require('../../assets/esportes/santacruz.png'),
    score1: 2,
    team2: 'Retrô',
    team2Badge: require('../../assets/esportes/retro.png'),
    score2: 1,
    oddsType: 'simple',
    odds: [
      { label: 'Santa Cruz', value: '1.78' },
      { label: 'Empate', value: '2.20' },
      { label: 'Retrô', value: '3.14' },
    ],
  },
  {
    id: '3',
    time: '19:32',
    period: '2ª Parte',
    team1: 'Vasco',
    team1Badge: require('../../assets/esportes/vasco.png'),
    score1: 1,
    team2: 'Palmeiras',
    team2Badge: require('../../assets/esportes/palmeiras.png'),
    score2: 3,
    oddsType: 'simple',
    odds: [
      { label: 'Vasco', value: '85.60' },
      { label: 'Empate', value: '21.00' },
      { label: 'Palmeiras', value: '1.02' },
    ],
  },
];

const popularBets = [
  {
    id: '1',
    time: '19:00',
    date: '25/03',
    teams: 'Ceará SC CE - ABC FC',
    result: 'Resultado: Ceará',
    odd: '1.42',
  },
  {
    id: '2',
    time: '22:00',
    date: '25/03',
    teams: 'América de Cali - Llan...',
    result: 'Resultado: Améric...',
    odd: '1.52',
  },
  {
    id: '3',
    time: '18:03',
    date: '25/03',
    teams: 'América RN - Maranhão',
    result: 'Resultado: Améric...',
    odd: '1.73',
  },
  {
    id: '4',
    time: '19:30',
    date: '25/03',
    teams: 'Vitória BA - Botafogo...',
    result: 'Resultado: Vitória BA',
    odd: '1.6',
  },
];

const liveTabs = ['Futebol', 'Basquete', 'eSports'];

// ─── Component ──────────────────────────────────────────────────────────────

export function EsportesScreen({ onBack, onTabChange }: { onBack?: () => void; onTabChange?: (tab: string) => void }) {
  const [activeTab, setActiveTab] = useState('Esportes');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (onTabChange) onTabChange(tab);
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Futebol');
  const [activeLiveTab, setActiveLiveTab] = useState('Futebol');
  const [activeBetPage, setActiveBetPage] = useState(0);
  const betScrollRef = useRef<FlatList>(null);

  const handleBetScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const page = Math.round(e.nativeEvent.contentOffset.x / (SCREEN_WIDTH - 32));
    setActiveBetPage(page);
  };

  return (
    <View className="flex-1 bg-[#090B22]">
      {/* ─── Header ────────────────────────────────────────────────── */}
      <View className="px-4 pt-12 pb-2 bg-[#090B22]">
        <View className="flex-row items-center justify-between">
          <Pressable onPress={onBack} className="active:opacity-70">
            <Feather name="menu" size={28} color="white" />
          </Pressable>
          <Image
            source={require('../../assets/logos/logo_eds_deitada.png')}
            className="w-36 h-8"
            resizeMode="contain"
          />
          <View className="w-8" />
        </View>

        {/* Search */}
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

        {/* Category Tabs */}
        <View className="flex-row items-center mt-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-1 mr-3"
            contentContainerStyle={{ paddingRight: 10 }}
          >
            {categoryTabs.map((cat) => (
              <Pressable
                key={cat.label}
                onPress={() => setActiveCategory(cat.label)}
                className={`flex-row items-center px-4 py-2 rounded-full border mr-2 ${activeCategory === cat.label
                    ? 'bg-[#0B8226] border-green-500'
                    : 'bg-[#0D1431] border-[#2B325A]'
                  }`}
              >
                {cat.label === 'Favoritos' ? (
                  <Feather
                    name="star"
                    size={14}
                    color={activeCategory === cat.label ? 'white' : '#9CA3AF'}
                  />
                ) : (
                  <Ionicons
                    name={cat.icon as any}
                    size={14}
                    color={activeCategory === cat.label ? 'white' : '#9CA3AF'}
                  />
                )}
                <Text
                  className={`font-bold ml-1.5 text-xs ${activeCategory === cat.label ? 'text-white' : 'text-gray-400'
                    }`}
                >
                  {cat.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <Pressable className="flex-row items-center bg-[#2B325A] px-4 py-2 rounded-full active:bg-[#343D6B] h-9">
            <Text className="text-white font-medium mr-1 text-[11px]">Filtro</Text>
            <Feather name="chevron-down" size={16} color="white" />
          </Pressable>
        </View>
      </View>

      {/* ─── Scrollable Content ──────────────────────────────────── */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Futebol em Destaque ───────────────────────────────── */}
        <View className="px-4 mt-4">
          <Text className="text-white text-lg font-bold mb-3">Futebol em Destaque</Text>

          {/* Banner do jogo destaque */}
          <View className="rounded-xl overflow-hidden">
            <Image
              source={require('../../assets/esportes/fla_flu.png')}
              className="w-full"
              style={{ height: 200 }}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* ─── Esportes Populares ────────────────────────────────── */}
        <View className="px-4 mt-8">
          <Text className="text-white text-lg font-bold mb-4">Esportes Populares</Text>

          <View className="flex-row flex-wrap justify-between">
            {popularSports.map((sport) => (
              <Pressable
                key={sport.label}
                className="w-[31%] bg-[#0D1431] rounded-xl items-center py-3 mb-3 border border-[#1D2146] active:bg-[#151B33]"
              >
                <Image
                  source={sport.image}
                  className="w-8 h-8 mb-1.5"
                  resizeMode="contain"
                />
                <Text className="text-white text-[11px] font-semibold">{sport.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* ─── Ao Vivo Agora ─────────────────────────────────────── */}
        <View className="mt-8">
          {/* Title */}
          <View className="flex-row items-center px-4 mb-4">
            <View className="flex-row items-center">
              <Ionicons name="radio" size={20} color="white" />
              <Text className="text-white text-lg font-bold ml-2">Ao Vivo Agora</Text>
            </View>
          </View>

          {/* Live Tabs */}
          <View className="flex-row px-4 mb-4">
            {liveTabs.map((tab) => (
              <Pressable
                key={tab}
                onPress={() => setActiveLiveTab(tab)}
                className={`px-5 py-2 rounded-full mr-2 border ${activeLiveTab === tab
                    ? 'bg-[#0B8226] border-green-500'
                    : 'bg-[#0D1431] border-[#2B325A]'
                  }`}
              >
                <Text
                  className={`font-bold text-xs ${activeLiveTab === tab ? 'text-white' : 'text-gray-400'
                    }`}
                >
                  {tab}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Live Match Cards */}
          {liveMatches.map((match) => (
            <View
              key={match.id}
              className="mx-4 mb-4 bg-[#0D1431] rounded-xl border border-[#1D2146] overflow-hidden"
            >
              {/* Match Header — Time & Period */}
              <View className="flex-row items-center px-3 pt-3 pb-1">
                <View className="bg-[#00D042] px-1.5 py-0.5 rounded mr-2">
                  <Text className="text-black text-[9px] font-extrabold">{match.time}</Text>
                </View>
                <Text className="text-gray-400 text-[10px] italic">{match.period}</Text>

                {match.oddsType === 'full' && (
                  <View className="flex-row ml-auto">
                    <Text className="text-gray-500 text-[10px] font-bold mr-8">Resultado</Text>
                    <Text className="text-gray-500 text-[10px] font-bold">Ambas marcam</Text>
                  </View>
                )}
                {match.oddsType === 'simple' && (
                  <Text className="text-gray-500 text-[10px] font-bold ml-auto">Resultado</Text>
                )}
              </View>

              {/* Teams & Scores */}
              <View className="px-3 pb-3 pt-1">
                {/* Team 1 */}
                <View className="flex-row items-center mb-1.5">
                  {match.team1Badge ? (
                    <Image source={match.team1Badge} className="w-5 h-5 mr-2" resizeMode="contain" />
                  ) : (
                    <MaterialCommunityIcons name="shield-half-full" size={16} color="#9CA3AF" style={{ marginRight: 8 }} />
                  )}
                  <Text className="text-white font-bold text-xs flex-1">{match.team1}</Text>
                  <Text className="text-white font-bold text-sm mr-4">{match.score1}</Text>
                </View>
                {/* Team 2 */}
                <View className="flex-row items-center">
                  {match.team2Badge ? (
                    <Image source={match.team2Badge} className="w-5 h-5 mr-2" resizeMode="contain" />
                  ) : (
                    <MaterialCommunityIcons name="shield-star" size={16} color="#9CA3AF" style={{ marginRight: 8 }} />
                  )}
                  <Text className="text-white font-bold text-xs flex-1">{match.team2}</Text>
                  <Text className="text-white font-bold text-sm mr-4">{match.score2}</Text>
                </View>

                {/* Odds Row */}
                <View className="flex-row mt-3 gap-x-1.5">
                  {match.odds.map((odd, idx) => (
                    <Pressable
                      key={idx}
                      className="flex-1 bg-[#151B33] rounded py-2.5 items-center active:bg-[#0B8226]"
                    >
                      {odd.label ? (
                        <Text className="text-gray-500 text-[8px] mb-0.5">{odd.label}</Text>
                      ) : null}
                      <Text className="text-[#00D042] font-bold text-xs">{odd.value}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* ─── Apostas Populares ──────────────────────────────────── */}
        <View className="mt-4">
          <View className="flex-row items-center px-4 mb-4">
            <Ionicons name="flame" size={20} color="#FF6B00" />
            <Text className="text-white text-lg font-bold ml-2">Apostas Populares</Text>
          </View>

          {/* Bets Grid — 2x2 per page */}
          <FlatList
            ref={betScrollRef}
            data={[0]} // pages
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleBetScroll}
            scrollEventThrottle={200}
            keyExtractor={(_, i) => i.toString()}
            renderItem={() => (
              <View style={{ width: SCREEN_WIDTH - 32, marginHorizontal: 16 }}>
                <View className="flex-row flex-wrap justify-between">
                  {popularBets.map((bet) => (
                    <Pressable
                      key={bet.id}
                      className="w-[48.5%] bg-[#0D1431] rounded-lg border border-[#1D2146] p-2.5 mb-2.5 active:bg-[#151B33]"
                    >
                      <View className="flex-row justify-between items-start mb-1.5">
                        <View>
                          <Text className="text-white text-[10px] font-bold">{bet.time}</Text>
                          <Text className="text-gray-500 text-[9px]">{bet.date}</Text>
                        </View>
                        <View className="bg-[#151B33] rounded px-2 py-1">
                          <Text className="text-[#00D042] font-bold text-xs">{bet.odd}</Text>
                        </View>
                      </View>
                      <Text className="text-white text-[10px] font-semibold mb-0.5" numberOfLines={1}>
                        {bet.teams}
                      </Text>
                      <View className="flex-row items-center">
                        <Ionicons name="football" size={10} color="#9CA3AF" />
                        <Text className="text-gray-400 text-[9px] ml-1" numberOfLines={1}>
                          {bet.result}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}
          />

          {/* Pagination Dots */}
          <View className="flex-row justify-center mt-3">
            {[0, 1, 2, 3, 4, 5, 6].map((dot) => (
              <View
                key={dot}
                className={`w-1.5 h-1.5 rounded-full mx-1 ${activeBetPage === dot ? 'bg-[#00D042]' : 'bg-[#2B325A]'
                  }`}
              />
            ))}
          </View>
        </View>

        {/* ─── Ver Mais Esportes CTA ─────────────────────────────── */}
        <View className="px-4 mt-8 mb-6">
          <Pressable className="rounded-full overflow-hidden active:opacity-80">
            <LinearGradient
              colors={['#00C853', '#00B248', '#009E3D']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="py-4 items-center rounded-full"
            >
              <Text className="text-white font-bold text-base">Ver Mais Esportes</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>

      {/* ─── Bottom Nav ──────────────────────────────────────────── */}
      <BottomNav activeTab={activeTab} setActiveTab={handleTabChange} />
    </View>
  );
}
