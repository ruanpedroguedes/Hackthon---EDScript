import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <View className="flex-row items-center justify-between bg-[#060B28] px-2 py-2 border-t border-gray-800 pb-2">
      {/* 1. Home (Onde era Cassino) */}
      <Pressable onPress={() => setActiveTab('Home')} className="items-center w-16 relative">
        {activeTab === 'Home' && <View className="absolute -top-3 w-10 h-0.5 bg-[#17C900] rounded-b-md" />}
        <Ionicons name="home-outline" size={24} color={activeTab === 'Home' ? 'white' : '#6B7280'} />
        <Text className={`text-[10px] mt-1 ${activeTab === 'Home' ? 'text-white font-bold' : 'text-gray-500'}`}>
          Home
        </Text>
      </Pressable>

      {/* 2. Cassino (Onde era Esportes) */}
      <Pressable onPress={() => setActiveTab('Cassino')} className="items-center w-16 relative">
        {activeTab === 'Cassino' && <View className="absolute -top-3 w-10 h-0.5 bg-[#17C900] rounded-b-md" />}
        <Ionicons name="game-controller-outline" size={24} color={activeTab === 'Cassino' ? 'white' : '#6B7280'} />
        <Text className={`text-[10px] mt-1 ${activeTab === 'Cassino' ? 'text-white font-bold' : 'text-gray-500'}`}>
          Cassino
        </Text>
      </Pressable>

      {/* 3. Logo E (Centro - Restaurando bola branca) */}
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

      {/* 4. Esportes (Onde era Populares) */}
      <Pressable onPress={() => setActiveTab('Esportes')} className="items-center w-16 relative">
        {activeTab === 'Esportes' && <View className="absolute -top-3 w-10 h-0.5 bg-[#17C900] rounded-b-md" />}
        <Ionicons name="football-outline" size={24} color={activeTab === 'Esportes' ? 'white' : '#6B7280'} />
        <Text className={`text-[10px] mt-1 ${activeTab === 'Esportes' ? 'text-white font-bold' : 'text-gray-500'}`}>
          Esportes
        </Text>
      </Pressable>

      {/* 5. Populares (Onde era Suporte) + Suporte Flutuando MAIS ACIMA */}
      <View className="items-center w-16 relative">
        {/* Suporte Flutuante (Bolinha azul gradiente) - Posição final top: -65 */}
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
          {activeTab === 'Populares' && <View className="absolute -top-3 w-10 h-0.5 bg-[#17C900] rounded-b-md" />}
          <Ionicons name="flame-outline" size={24} color={activeTab === 'Populares' ? 'white' : '#6B7280'} />
          <Text className={`text-[10px] mt-1 ${activeTab === 'Populares' ? 'text-white font-bold' : 'text-gray-500'}`}>
            Populares
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
