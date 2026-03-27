import React, { useRef, useEffect } from 'react';
import { View, Text, Pressable, Image, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const TAB_COUNT = 5;
const TAB_WIDTH = width / TAB_COUNT;

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const indicatorAnim = useRef(new Animated.Value(0)).current;

  // Mapa de posições das abas (0 a 4)
  const tabMap: Record<string, number> = {
    'Home': 0,
    'Cassino': 1,
    'Esportes': 3,
    'Populares': 4,
    'Suporte': 4, // Suporte fica na mesma vertical de Populares
  };

  useEffect(() => {
    const targetTab = tabMap[activeTab] ?? 0;
    Animated.spring(indicatorAnim, {
      toValue: targetTab * TAB_WIDTH + (TAB_WIDTH / 2) - 20, // 20 é metade da largura da barra (40/2)
      useNativeDriver: true,
      friction: 8,
      tension: 50
    }).start();
  }, [activeTab]);

  return (
    <View className="bg-[#060B28] border-t border-gray-800 pb-2">
      {/* Linha Verde Deslizante */}
      <Animated.View 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 40,
          height: 3,
          backgroundColor: '#17C900',
          borderRadius: 3,
          transform: [{ translateX: indicatorAnim }],
          zIndex: 10
        }}
      />

      <View className="flex-row items-center justify-between px-2 py-2">
        {/* 1. Home */}
        <Pressable onPress={() => setActiveTab('Home')} className="items-center w-16">
          <Ionicons name="home-outline" size={24} color={activeTab === 'Home' ? 'white' : '#6B7280'} />
          <Text className={`text-[10px] mt-1 ${activeTab === 'Home' ? 'text-white font-bold' : 'text-gray-500'}`}>
            Home
          </Text>
        </Pressable>

        {/* 2. Cassino */}
        <Pressable onPress={() => setActiveTab('Cassino')} className="items-center w-16">
          <Ionicons name="game-controller-outline" size={24} color={activeTab === 'Cassino' ? 'white' : '#6B7280'} />
          <Text className={`text-[10px] mt-1 ${activeTab === 'Cassino' ? 'text-white font-bold' : 'text-gray-500'}`}>
            Cassino
          </Text>
        </Pressable>

        {/* 3. Logo E (Centro) */}
        <Pressable 
          onPress={() => setActiveTab('Home')}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: '#E2E8F0',
            marginTop: -28,
            borderWidth: 4,
            borderColor: '#0B0F2A',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 8,
            overflow: 'hidden'
          }}
        >
          <Image source={require('../../assets/logos/eds_e.png')} style={{ width: 40, height: 40 }} resizeMode="contain" />
        </Pressable>

        {/* 4. Esportes */}
        <Pressable onPress={() => setActiveTab('Esportes')} className="items-center w-16">
          <Ionicons name="football-outline" size={24} color={activeTab === 'Esportes' ? 'white' : '#6B7280'} />
          <Text className={`text-[10px] mt-1 ${activeTab === 'Esportes' ? 'text-white font-bold' : 'text-gray-500'}`}>
            Esportes
          </Text>
        </Pressable>

        {/* 5. Populares + Suporte */}
        <View className="items-center w-16 relative">
          <Pressable 
            onPress={() => setActiveTab('Suporte')}
            style={{ position: 'absolute', top: -65, zIndex: 100, alignItems: 'center' }}
          >
            <LinearGradient
              colors={['#0007C9', '#02023D']}
              style={{ 
                width: 44, 
                height: 44, 
                borderRadius: 22, 
                alignItems: 'center', 
                justifyContent: 'center', 
                borderWidth: 1, 
                borderColor: 'rgba(255,255,255,0.2)',
                shadowColor: '#0007C9',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.5,
                shadowRadius: 6,
                elevation: 12
              }}
            >
              <Ionicons name="chatbubble-ellipses-outline" size={22} color="white" />
            </LinearGradient>
            <Text className="text-white text-[8px] mt-1 font-bold shadow-sm">Suporte</Text>
          </Pressable>

          <Pressable onPress={() => setActiveTab('Populares')} className="items-center w-full">
            <Ionicons name="flame-outline" size={24} color={activeTab === 'Populares' ? 'white' : '#6B7280'} />
            <Text className={`text-[10px] mt-1 ${activeTab === 'Populares' ? 'text-white font-bold' : 'text-gray-500'}`}>
              Populares
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
