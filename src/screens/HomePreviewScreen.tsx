import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Image, StatusBar, Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, ScrollView, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useVideoPlayer, VideoView } from 'expo-video';
import MaskedView from '@react-native-masked-view/masked-view';
import { BottomNav } from '../components/BottomNav';
import { FullReelsScreen } from './FullReelsScreen';
import { SideMenu } from '../components/SideMenu';
import { PopularesPreviewScreen } from './PopularesPreviewScreen';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.85;
const SPACING = 16;

const carouselItems = [
  { id: '1', img: require('../../assets/carrosel/banner_home.png') },
  { id: '2', img: require('../../assets/carrosel/jogo_fla.png') },
  { id: '3', img: require('../../assets/carrosel/ods_turbo.png') },
];

const gamesItems = [
  { id: '1', img: require('../../assets/carrosel/1.png') },
  { id: '2', img: require('../../assets/carrosel/2.png') },
  { id: '3', img: require('../../assets/carrosel/3.png') },
  { id: '4', img: require('../../assets/carrosel/4.png') },
  { id: '5', img: require('../../assets/carrosel/5.png') },
  { id: '6', img: require('../../assets/carrosel/6.png') },
];

const oddsItems = [
  { id: '1', userCount: 560, sport: 'Futebol', teamA: 'Real Madrid', teamB: 'Liverpool', teamALogo: require('../../assets/bandeiras/real_madrid.png'), teamBLogo: require('../../assets/bandeiras/liverpool.png'), chance: 'ALTA', odd: '3.46', info: 'Hoje • 21:00 • Champions' },
  { id: '2', userCount: 1200, sport: 'Futebol', teamA: 'Chelsea', teamB: 'Port Vale', teamALogo: require('../../assets/bandeiras/chelsea.png'), teamBLogo: require('../../assets/bandeiras/portvale.png'), chance: 'MÉDIA', odd: '2.15', info: 'Amanhã • 16:00 • Amistoso' },
  { id: '3', userCount: 890, sport: 'Basquete', teamA: 'Lakers', teamB: 'Celtics', teamALogo: require('../../assets/bandeiras/lakers.png'), teamBLogo: require('../../assets/bandeiras/celtics.png'), chance: 'ALTA', odd: '1.95', info: 'Hoje • 23:30 • NBA' },
  { id: '4', userCount: 4500, sport: 'Futebol', teamA: 'Náutico', teamB: 'Sport', teamALogo: require('../../assets/bandeiras/nautico.png'), teamBLogo: require('../../assets/bandeiras/sportclub.png'), chance: 'BAIXA', odd: '5.20', info: 'Seg • 20:00 • Clássico' },
  { id: '5', userCount: 2100, sport: 'E-Sports', teamA: 'Furia', teamB: 'Navi', teamALogo: require('../../assets/bandeiras/furia.png'), teamBLogo: require('../../assets/bandeiras/navi.png'), chance: 'ALTA', odd: '1.50', info: 'Dom • 14:00 • CS:GO Major' },
];

// Create a large number of items to simulate infinity
const INF_ODDS = [...Array(500)].map((_, i) => ({
  id: `${i}`,
  realId: oddsItems[i % oddsItems.length].id
}));

const CARD_WIDTH = width * 0.72;
const CARD_MARGIN = 10;
const FULL_CARD_WIDTH = CARD_WIDTH + CARD_MARGIN * 2;
const START_INDEX = 250; // Start in the middle of the infinite list

export function HomePreviewScreen({ 
  onLoginClick,
  onDirectLogin,
  onDirectRegister
}: { 
  onLoginClick: () => void;
  onDirectLogin: () => void;
  onDirectRegister: () => void;
}) {
  const [activeTab, setActiveTab] = useState('Home');
  const [activeIndex, setActiveIndex] = useState(1);
  const [gamesIndex, setGamesIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const gamesListRef = useRef<FlatList>(null);
  const oddsListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(START_INDEX * FULL_CARD_WIDTH)).current;
  const [oddsIndex, setOddsIndex] = useState(START_INDEX);
  const [showReels, setShowReels] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const previewPlayer = useVideoPlayer(require('../../assets/videos/neiff.mp4'), (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  // Top Hero Carousel Timer (4s)
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= carouselItems.length) {
        nextIndex = 0;
      }
      setActiveIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  // Bottom Games Carousel Timer (8s)
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = gamesIndex + 1;
      if (nextIndex >= gamesItems.length) {
        nextIndex = 0;
      }
      setGamesIndex(nextIndex);
      gamesListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 8000);
    return () => clearInterval(interval);
  }, [gamesIndex]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (ITEM_WIDTH + SPACING));
    if (index !== activeIndex && index >= 0 && index < carouselItems.length) {
      setActiveIndex(index);
    }
  };

  const navLeft = () => {
    const prev = activeIndex > 0 ? activeIndex - 1 : carouselItems.length - 1;
    setActiveIndex(prev);
    flatListRef.current?.scrollToIndex({ index: prev, animated: true });
  }

  const navRight = () => {
    const next = activeIndex < carouselItems.length - 1 ? activeIndex + 1 : 0;
    setActiveIndex(next);
    flatListRef.current?.scrollToIndex({ index: next, animated: true });
  }

  const moveGames = (dir: 'left' | 'right') => {
    let next;
    if (dir === 'left') {
      next = gamesIndex > 0 ? gamesIndex - 1 : gamesItems.length - 1;
    } else {
      next = gamesIndex < gamesItems.length - 1 ? gamesIndex + 1 : 0;
    }
    setGamesIndex(next);
    gamesListRef.current?.scrollToIndex({ index: next, animated: true });
  }

  const moveOdds = (dir: 'left' | 'right') => {
    let next = dir === 'left' ? oddsIndex - 1 : oddsIndex + 1;
    setOddsIndex(next);
    oddsListRef.current?.scrollToOffset({
      offset: next * FULL_CARD_WIDTH,
      animated: true
    });
  }

  if (showReels) {
    return <FullReelsScreen onClose={() => setShowReels(false)} />;
  }

  return (
    <View className="flex-1 bg-[#02023D]">
      <StatusBar barStyle="light-content" backgroundColor="#02023D" />

      {/* Side Menu */}
      <SideMenu 
        isVisible={isMenuVisible} 
        onClose={() => setIsMenuVisible(false)} 
        onTabSelect={setActiveTab}
      />

      {activeTab === 'Home' ? (
        <View className="flex-1 pt-12">
          {/* Header (Menu, Logo, Entrar) */}
          <View className="flex-row items-center justify-between px-4 py-3">
            <Pressable className="active:opacity-70" onPress={() => setIsMenuVisible(true)}>
              <Feather name="menu" size={28} color="white" />
            </Pressable>

            <Image
              source={require('../../assets/logos/logo_eds_deitada.png')}
              className="w-32 h-8"
              resizeMode="contain"
            />

            <Pressable
              className="bg-white px-4 py-1.5 rounded-[20px] active:opacity-80"
              onPress={() => onLoginClick()}
            >
              <Text className="text-[#242424] font-bold text-[13px]">Entrar</Text>
            </Pressable>
          </View>

          {/* Search Bar */}
          <View className="px-4 mt-2">
            <View className="flex-row items-center border border-white/30 rounded-[20px] px-4 py-2.5 bg-white/5">
              <Feather name="search" size={20} color="white" />
              <Text className="text-white/60 ml-3 text-sm">Pesquisa</Text>
            </View>
          </View>

          <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
            {/* 1. Top Carousel (Full Width) */}
            <View className="px-4 mt-6">
              <View className="h-[180px] relative">
                <FlatList
                  ref={flatListRef}
                  data={carouselItems}
                  keyExtractor={(item) => item.id}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onMomentumScrollEnd={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.x / (width - 32));
                    setOddsIndex(index);
                  }}
                  renderItem={({ item }) => (
                    <Pressable 
                      style={{ width: width - 36, height: '100%', marginRight: 4 }}
                      onPress={() => onLoginClick()}
                    >
                      <Image
                        source={item.img}
                        className="w-full h-full rounded-[25px]"
                        resizeMode="cover"
                      />
                    </Pressable>
                  )}
                />
                
                {/* Navigation Arrows for Hero Carousel */}
                <View className="absolute top-[40%] -left-2 -right-2 flex-row justify-between" pointerEvents="box-none">
                  <Pressable
                    className="w-7 h-9 bg-[#17C900] items-center justify-center rounded-r-md active:opacity-70"
                    onPress={() => {
                      if (oddsIndex > 0) {
                        const next = oddsIndex - 1;
                        setOddsIndex(next);
                        flatListRef.current?.scrollToOffset({ offset: next * (width - 32), animated: true });
                      }
                    }}
                  >
                    <Feather name="chevron-left" size={20} color="black" />
                  </Pressable>
                  <Pressable
                    className="w-7 h-9 bg-[#17C900] items-center justify-center rounded-l-md active:opacity-70"
                    onPress={() => {
                      if (oddsIndex < carouselItems.length - 1) {
                        const next = oddsIndex + 1;
                        setOddsIndex(next);
                        flatListRef.current?.scrollToOffset({ offset: next * (width - 32), animated: true });
                      }
                    }}
                  >
                    <Feather name="chevron-right" size={20} color="black" />
                  </Pressable>
                </View>

                {/* Pagination Dots for Hero Carousel */}
                <View className="flex-row justify-center mt-3 gap-x-1.5">
                  {carouselItems.map((_, i) => (
                    <View 
                      key={i} 
                      className={`w-2 h-2 rounded-full ${i === oddsIndex % carouselItems.length ? 'bg-[#17C900]' : 'bg-gray-600'}`} 
                    />
                  ))}
                </View>
              </View>
            </View>

            {/* 2. Atividades Principais */}
            <View className="flex-row justify-between px-4 mt-8 mb-6">
              <Pressable className="items-center w-[23%]" onPress={() => onLoginClick()}>
                <Image source={require('../../assets/atv_principais/coelho.png')} className="w-[82px] h-[82px] rounded-full" resizeMode="cover" />
                <Text className="text-white font-semibold text-[11px] mt-2 text-center leading-tight">Prêmio diário</Text>
              </Pressable>
              <Pressable className="items-center w-[23%]" onPress={() => onLoginClick()}>
                <Image source={require('../../assets/atv_principais/bau.png')} className="w-[82px] h-[82px] rounded-full" resizeMode="cover" />
                <Text className="text-white font-semibold text-[11px] mt-2 text-center leading-tight">Baú</Text>
              </Pressable>
              <Pressable className="items-center w-[23%]" onPress={() => onLoginClick()}>
                <Image source={require('../../assets/atv_principais/bola_de_futebol.png')} className="w-[82px] h-[82px] rounded-full" resizeMode="cover" />
                <Text className="text-white font-semibold text-[11px] mt-2 text-center leading-tight">Supper Odds</Text>
              </Pressable>
              <Pressable className="items-center w-[23%]" onPress={() => onLoginClick()}>
                <Image source={require('../../assets/atv_principais/porquinho.png')} className="w-[82px] h-[82px] rounded-full" resizeMode="cover" />
                <Text className="text-white font-semibold text-[11px] mt-2 text-center leading-tight">Missões</Text>
              </Pressable>
            </View>

            {/* 3. Shorts + Winners Row */}
            <View className="flex-row px-4 mt-2 mb-8 h-[220px]">
              {/* Left: Reel Card (Responsive Width) */}
              <Pressable 
                className="w-[32%] h-full bg-black rounded-[25px] items-center justify-center border border-white/20 mr-3 overflow-hidden"
                onPress={() => setShowReels(true)}
              >
                <VideoView
                  player={previewPlayer}
                  style={{ width: '100%', height: '100%', position: 'absolute' }}
                  contentFit="cover"
                  nativeControls={false}
                />
                <View className="items-center z-10 bg-black/30 p-2 rounded-xl">
                   <Feather name="play-circle" size={32} color="white" opacity={0.8} />
                   <Text className="text-white font-bold text-[10px] mt-1 shadow-sm text-center">Video 1</Text>
                </View>
              </Pressable>

              {/* Right: Winner Card (Responsive flex-1) */}
              <LinearGradient
                colors={['#000000', '#0007C9']}
                style={{ borderRadius: 10 }}
                className="flex-1 h-full p-4 items-center border border-white/10"
              >
                {/* Header: Bolt + Title (Centered) */}
                <View className="flex-row items-center justify-center mb-1 w-full flex-wrap">
                  <Feather name="zap" size={14} color="white" style={{ marginRight: 6 }} />
                  <Text className="text-white font-bold text-[12px] text-center" numberOfLines={1}>
                    Alguém acabou de ganhar
                  </Text>
                </View>

                {/* Prize Amount (Centered & Large) */}
                <View className="flex-row items-end justify-center mb-2">
                  <Text className="text-[#00FF00] font-bold text-[14px] mr-1 mb-1">R$</Text>
                  <Text className="text-[#00FF00] font-bold text-[26px] tracking-tighter" numberOfLines={1}>100.000.000</Text>
                </View>

                {/* Separator Line */}
                <View className="w-[90%] h-[1px] bg-white/20 mb-3" />
                
                {/* Info Section (Left-aligned or Centered if narrow) */}
                <View className="w-full">
                  <View className="flex-row items-center mb-1">
                    <Text className="text-white text-[11px] font-bold">No Bac-Bo</Text>
                    <View className="ml-1.5 bg-[#17C900] w-3 h-3 rounded-sm flex-row flex-wrap p-[1px] justify-between">
                       <View className="w-[3px] h-[3px] bg-black rounded-full" />
                       <View className="w-[3px] h-[3px] bg-black rounded-full" />
                       <View className="w-[3px] h-[3px] bg-black rounded-full" />
                       <View className="w-[3px] h-[3px] bg-black rounded-full" />
                    </View>
                  </View>
                  
                  <View className="flex-row items-center mb-2">
                    <Image source={require('../../assets/icons/chat_homepreview.png')} className="w-4 h-4 mr-2" resizeMode="contain" />
                    <Text className="text-white text-[11px] font-bold">User23156 sacou há 5 min</Text>
                  </View>

                  <Text className="text-white text-[10px]">
                    Já pagamos <Text className="font-bold">R$242.000.000</Text> hoje
                  </Text>
                </View>

                {/* Action Button (Centered at bottom) */}
                <Pressable
                  className="bg-white w-full py-2.5 rounded-full items-center justify-center active:bg-gray-200 mt-auto"
                  onPress={() => onLoginClick()}
                >
                  <Text className="text-black font-black text-[12px]">QUERO TENTAR AGORA</Text>
                </Pressable>
              </LinearGradient>
            </View>

            {/* Jogos em Alta Section */}
            <View className="mt-4 mb-2 px-0">
              <Text className="text-white text-[22px] font-bold px-5 mb-4">Jogos em Alta</Text>

              <View className="relative flex-row items-center">
                {/* Left Arrow */}
                <Pressable
                  onPress={() => moveGames('left')}
                  className="absolute left-1 z-10 active:opacity-50"
                >
                  <Feather name="chevron-left" size={32} color="white" />
                </Pressable>

                <FlatList
                  ref={gamesListRef}
                  data={gamesItems}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <Pressable 
                      style={{ width: 150, marginLeft: index === 0 ? 35 : 10, marginRight: index === gamesItems.length - 1 ? 35 : 0 }}
                      onPress={() => onLoginClick()}
                    >
                      <Image
                        source={item.img}
                        className="w-full h-[110px] rounded-[10px]"
                        resizeMode="cover"
                      />
                    </Pressable>
                  )}
                />

                {/* Right Arrow */}
                <Pressable
                  onPress={() => moveGames('right')}
                  className="absolute right-1 z-10 active:opacity-50"
                >
                  <Feather name="chevron-right" size={32} color="white" />
                </Pressable>
              </View>
            </View>

            {/* Live Game Card - "ACONTECENDO AGORA" */}
            <View className="px-4 mt-6 mb-4 items-center">
              <LinearGradient
                colors={['#000000', '#0007C9']}
                locations={[0.02, 1.0]}
                style={{
                  width: '100%',
                  minHeight: 180,
                  borderRadius: 15,
                  padding: 16,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.4,
                  shadowRadius: 4,
                  elevation: 6,
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.1)'
                }}
              >
                <View className="items-center mt-4 mb-4">
                  <Text className="text-[#17C900] font-bold text-[18px] tracking-widest text-center">ACONTECENDO AGORA</Text>
                  <Text className="text-white font-medium text-[14px] mt-1 text-center px-4">Sport venceu o Naútico em 4 dos últimos 5 jogos</Text>
                </View>

                <View className="flex-row items-end justify-between px-2 mb-4">
                  <View className="items-center flex-1">
                    <Image
                      source={require('../../assets/bandeiras/sportclub.png')}
                      className="w-16 h-16 mb-2"
                      resizeMode="contain"
                    />
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13, marginBottom: 8, textAlign: 'center' }}>Casa</Text>
                    <Pressable
                      className="bg-white/10 px-4 py-2 rounded-lg active:opacity-70"
                      onPress={onLoginClick}
                    >
                      <Text className="text-white font-bold">1.80</Text>
                    </Pressable>
                  </View>

                  <View className="pb-3 px-1">
                    <Text className="text-white font-bold">X</Text>
                  </View>

                  <View className="items-center flex-1">
                    <View className="h-16 mb-2" />
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13, marginBottom: 8, textAlign: 'center' }}>Empate</Text>
                    <Pressable
                      className="bg-white/10 px-4 py-2 rounded-lg active:opacity-70"
                      onPress={onLoginClick}
                    >
                      <Text className="text-white font-bold">2.34</Text>
                    </Pressable>
                  </View>

                  <View className="pb-3 px-1">
                    <Text className="text-white font-bold">X</Text>
                  </View>

                  <View className="items-center flex-1">
                    <Image
                      source={require('../../assets/bandeiras/nautico.png')}
                      className="w-16 h-16 mb-2"
                      resizeMode="contain"
                    />
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13, marginBottom: 8, textAlign: 'center' }}>Fora</Text>
                    <Pressable
                      className="bg-white/10 px-4 py-2 rounded-lg active:opacity-70"
                      onPress={onLoginClick}
                    >
                      <Text className="text-white font-bold">2.85</Text>
                    </Pressable>
                  </View>
                </View>
              </LinearGradient>
            </View>

            <View className="mt-5 items-center">
              <Text className="text-white font-bold text-[22px]">SUPER ODDS</Text>
              <Text className="text-white font-medium text-[14px] mt-1 opacity-90">As melhores oportunidades em destaque</Text>
            </View>

            {/* Odds Scaling Carousel Section */}
            <View className="mt-4 mb-2 relative flex-row items-center">
              {/* Odds Left Arrow */}
              <Pressable
                onPress={() => moveOdds('left')}
                className="absolute left-1 z-10 active:opacity-50"
              >
                <Feather name="chevron-left" size={32} color="white" />
              </Pressable>

              <Animated.FlatList
                ref={oddsListRef}
                data={INF_ODDS}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={FULL_CARD_WIDTH}
                decelerationRate="fast"
                initialScrollIndex={START_INDEX}
                getItemLayout={(_, index) => ({
                  length: FULL_CARD_WIDTH,
                  offset: FULL_CARD_WIDTH * index,
                  index,
                })}
                contentContainerStyle={{
                  paddingHorizontal: (width - FULL_CARD_WIDTH) / 2,
                  paddingVertical: 20
                }}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  {
                    useNativeDriver: true, listener: (e: any) => {
                      const x = e.nativeEvent.contentOffset.x;
                      const idx = Math.round(x / FULL_CARD_WIDTH);
                      if (idx !== oddsIndex) setOddsIndex(idx);
                    }
                  }
                )}
                renderItem={({ item, index }) => {
                  const data = oddsItems[parseInt(item.realId) - 1];
                  const inputRange = [
                    (index - 1) * FULL_CARD_WIDTH,
                    index * FULL_CARD_WIDTH,
                    (index + 1) * FULL_CARD_WIDTH,
                  ];

                  const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.85, 1.05, 0.85],
                    extrapolate: 'clamp',
                  });

                  const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.6, 1, 0.6],
                    extrapolate: 'clamp',
                  });

                  const isSpecial = data.chance === 'ALTA';

                  return (
                    <Animated.View
                      style={{
                        width: CARD_WIDTH,
                        height: 250,
                        marginHorizontal: CARD_MARGIN,
                        transform: [{ scale }],
                        opacity,
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 20,
                        borderWidth: 2,
                        borderColor: '#0007C9',
                        overflow: 'hidden',
                        shadowColor: '#0007C9',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 5,
                      }}
                    >
                      <LinearGradient
                        colors={['rgba(255,255,255,0.1)', 'rgba(2, 2, 61, 0.4)']}
                        style={{ flex: 1, padding: 14 }}
                      >
                        {/* Header: Status dot + User count */}
                        <View className="flex-row items-center justify-between mb-3">
                          <View className="flex-row items-center">
                            <View className="w-2 h-2 rounded-full bg-[#17C900] mr-2" />
                            <Text style={{ color: '#17C900', fontSize: 12, fontWeight: 'bold' }}>{data.userCount} <Text style={{ fontWeight: 'normal' }}>pessoas apostaram</Text></Text>
                          </View>
                          <View className="bg-[#17C900] px-2 py-0.5 rounded-md">
                            <Text className="text-[#02023D] text-[10px] font-bold">{data.sport}</Text>
                          </View>
                        </View>

                        {/* Match Info */}
                        <View className="flex-row items-center justify-between mb-2 mt-1 px-1">
                          <View className="items-center flex-1">
                            <View className="w-14 h-14 items-center justify-center mb-1">
                              {data.teamALogo ? (
                                <Image source={data.teamALogo} className="w-12 h-12" resizeMode="contain" />
                              ) : (
                                <Feather name="shield" size={32} color="white" opacity={0.5} />
                              )}
                            </View>
                            <Text className="text-white font-bold text-[11px] text-center" numberOfLines={1}>{data.teamA}</Text>
                          </View>

                          <Text className="text-white/60 font-medium text-[11px] mx-2">VS</Text>

                          <View className="items-center flex-1">
                            <View className="w-14 h-14 items-center justify-center mb-1">
                              {data.teamBLogo ? (
                                <Image source={data.teamBLogo} className="w-12 h-12" resizeMode="contain" />
                              ) : (
                                <Feather name="shield" size={32} color="white" opacity={0.5} />
                              )}
                            </View>
                            <Text className="text-white font-bold text-[11px] text-center" numberOfLines={1}>{data.teamB}</Text>
                          </View>
                        </View>

                        {/* Time Info & Divider */}
                        <View className="items-center mb-3">
                          <Text className="text-white/50 text-[10px]">{data.info}</Text>
                          <View className="w-full h-[0.5px] bg-white/20 mt-2" />
                        </View>

                        {/* Chance Badge */}
                        <View className="items-center mb-3">
                          <View className="w-full bg-[#17C900]/10 py-1.5 rounded-md items-center border border-[#17C900]/20">
                            <Text className="text-[#17C900] text-[11px] font-bold">Chance de Retorno: {data.chance}</Text>
                          </View>
                        </View>

                        {/* Bottom Odd Box - Glass White */}
                        <Pressable
                          onPress={onLoginClick}
                          className="bg-white/10 rounded-xl py-2 items-center justify-center border border-white/20 active:opacity-80"
                        >
                          <Text className="text-white font-bold text-[18px] leading-tight">{data.odd}</Text>
                          <Text className="text-white/70 font-medium text-[11px]">{data.teamA}</Text>
                        </Pressable>

                      </LinearGradient>
                    </Animated.View>
                  );
                }}
              />

              {/* Odds Right Arrow */}
              <Pressable
                onPress={() => moveOdds('right')}
                className="absolute right-1 z-10 active:opacity-50"
              >
                <Feather name="chevron-right" size={32} color="white" />
              </Pressable>
            </View>
          </ScrollView>
        </View>
      ) : activeTab === 'Populares' ? (
        <PopularesPreviewScreen 
          onLoginClick={onLoginClick} 
          onDirectLogin={onDirectLogin}
          onDirectRegister={onDirectRegister}
          onMenuClick={() => setIsMenuVisible(true)} 
        />
      ) : (
        /* Fallback for other tabs like Cassino, Esportes for now */
        <View className="flex-1 items-center justify-center">
          <Text className="text-white text-lg">Work in Progress</Text>
          <Pressable 
            onPress={() => setActiveTab('Home')}
            className="mt-4 bg-[#17C900] px-6 py-2 rounded-full"
          >
            <Text className="text-black font-bold">Voltar para Home</Text>
          </Pressable>
        </View>
      )}

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
}
