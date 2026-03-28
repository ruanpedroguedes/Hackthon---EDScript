import React, { useState } from 'react';
import { View, Text, Pressable, Image, StatusBar, ScrollView, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface CassinoPreviewScreenProps {
  onLoginClick: () => void;
  onDirectLogin: () => void;
  onDirectRegister: () => void;
  onMenuClick: () => void;
  isLoggedIn?: boolean;
}

export function CassinoPreviewScreen({
  onLoginClick,
  onDirectLogin,
  onDirectRegister,
  onMenuClick,
  isLoggedIn = false,
}: CassinoPreviewScreenProps) {
  const [activeTab, setActiveTab] = useState('Todos os Jogos');

  const navTabs = [
    { id: '1', label: 'Todos os Jogos' },
    { id: '2', label: 'Recentes' },
    { id: '3', label: 'Novidades' },
  ];

  return (
    <View className="flex-1 bg-[#02023D] pt-12" style={{ flex: 1, backgroundColor: '#02023D' }}>
      <StatusBar barStyle="light-content" backgroundColor="#02023D" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <Pressable className="active:opacity-70" onPress={onMenuClick}>
          <Feather name="menu" size={28} color="white" />
        </Pressable>

        <Image
          source={require('../../assets/logos/logo_eds_deitada.png')}
          className="w-36 h-10"
          resizeMode="contain"
        />

        {!isLoggedIn ? (
          <Pressable
            className="bg-white px-5 py-2 rounded-[20px] active:opacity-80"
            onPress={onLoginClick}
          >
            <Text className="text-[#02023D] font-extrabold text-[14px]">Entrar</Text>
          </Pressable>
        ) : (
          <View className="w-8" />
        )}
      </View>

      {/* Search Bar */}
      <View className="px-5 mt-4">
        <View className="flex-row items-center border border-white/40 rounded-[25px] px-5 py-3 bg-white/5">
          <Feather name="search" size={22} color="white" />
          <Text className="text-white/60 ml-4 text-sm font-medium">Pesquisa</Text>
        </View>
      </View>

      <ScrollView className="flex-1 mt-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Cassino em Destaque */}
        <View className="px-4 mt-2">
          <Text className="text-white text-lg font-bold mb-3">Cassino em Destaque</Text>
          <Pressable className="active:opacity-90 w-full" onPress={onLoginClick}>
            <Image
              source={require('../../assets/cassino/banner_5mil.png')}
              style={{ width: '100%', height: 160, borderRadius: 16 }}
              resizeMode="cover"
            />
          </Pressable>
          {/* Pagination Indicators */}
          <View className="flex-row justify-center mt-3 gap-x-1.5">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <View 
                key={i} 
                className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-[#17C900]' : 'bg-white/20'}`} 
              />
            ))}
          </View>
        </View>

        {/* Filter Tabs */}
        <View className="mt-6 px-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: 'center' }}
          >
            {navTabs.map((tab) => (
              <Pressable
                key={tab.id}
                onPress={() => setActiveTab(tab.label)}
                className={`flex-row items-center justify-center px-4 py-2 rounded-full border mr-3 active:opacity-80 ${activeTab === tab.label
                  ? 'bg-[#050099] border-[#0A0AA0]'
                  : 'bg-transparent border-[#2B325A]'
                  }`}
              >
                <Text
                  className={`font-bold text-[13px] text-center ${activeTab === tab.label ? 'text-white' : 'text-gray-300'
                    }`}
                >
                  {tab.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Slots Populares */}
        <View className="mt-8 px-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-[17px] font-bold">Slots Populares</Text>
            <Pressable onPress={onLoginClick}>
              <Text className="text-gray-400 text-xs">Ver Mais &gt;</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              require('../../assets/carrosel/trend1.png'),
              require('../../assets/carrosel/trend2.png'),
              require('../../assets/carrosel/trend3.png'),
            ].map((img, idx) => (
              <Pressable
                key={idx}
                style={{ width: 140, height: 90, marginRight: 12, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#1D2146' }}
                onPress={onLoginClick}
              >
                <Image
                  source={img}
                  style={{ width: '100%', height: '100%', borderRadius: 12 }}
                  resizeMode="cover"
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Cassino Ao Vivo */}
        <View className="mt-8">
          <View className="flex-row items-center px-4 mb-4">
            <Ionicons name="flame" size={20} color="white" />
            <Text className="text-white text-[17px] font-bold ml-2">Cassino Ao Vivo</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
            {[
              require('../../assets/cassino/rolletalive.png'),
              require('../../assets/cassino/blackjack_live.png'),
              require('../../assets/cassino/baccarat_live.png'),
            ].map((img, idx) => (
              <Pressable
                key={idx}
                style={{ width: 140, height: 90, marginRight: 12, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#1D2146' }}
                onPress={onLoginClick}
              >
                <Image
                  source={img}
                  style={{ width: '100%', height: '100%', borderRadius: 12 }}
                  resizeMode="cover"
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Jogos Rápidos */}
        <View className="mt-8 px-4">
          <View className="flex-row items-center mb-4">
            <Ionicons name="flame" size={20} color="white" />
            <Text className="text-white text-[17px] font-bold ml-2">Jogos Rápidos</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Pressable 
              onPress={onLoginClick} 
              style={{ flex: 1, height: 65, borderRadius: 12, overflow: 'hidden' }}
            >
              <LinearGradient
                colors={['#050050', '#02002A']}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#2B325A', borderRadius: 12 }}
              >
                <Image
                  source={require('../../assets/cassino/aviator_sem_fundo.png')}
                  style={{ width: '80%', height: '80%' }}
                  resizeMode="contain"
                />
              </LinearGradient>
            </Pressable>
            <Pressable 
              onPress={onLoginClick} 
              style={{ flex: 1, height: 65, borderRadius: 12, overflow: 'hidden' }}
            >
              <LinearGradient
                colors={['#050050', '#02002A']}
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#2B325A', borderRadius: 12 }}
              >
                <Image
                  source={require('../../assets/cassino/foguete.png')}
                  style={{ width: 35, height: 35, marginRight: 8 }}
                  resizeMode="contain"
                />
                <View>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13, fontStyle: 'italic' }}>Crash</Text>
                  <View style={{ backgroundColor: '#17C900', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginTop: 2, alignSelf: 'flex-start' }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 10 }}>x12.5</Text>
                  </View>
                </View>
              </LinearGradient>
            </Pressable>
          </View>
        </View>

        {/* Jogos Clássicos */}
        <View className="mt-8">
          <View className="flex-row items-center px-4 mb-4">
            <Ionicons name="flame" size={20} color="white" />
            <Text className="text-white text-[17px] font-bold ml-2">Jogos Clássicos</Text>
          </View>
          
          {/* Locked Grid (Reused from Populares) */}
          <View style={{ alignItems: 'center', paddingHorizontal: 16 }}>
            <Image
              source={require('../../assets/populares/bloqueados.png')}
              style={{ width: '100%', height: 260 }}
              resizeMode="contain"
            />
          </View>

          {/* Button Section */}
          <View style={{ paddingHorizontal: 20, marginTop: 16, alignItems: 'center', marginBottom: 20 }}>
            <Pressable
              style={{
                backgroundColor: '#17C900',
                width: '100%',
                paddingVertical: 12,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={onLoginClick}
            >
              <Text style={{ color: '#02023D', fontWeight: '900', fontSize: 15 }}>Mostrar mais Jogos</Text>
            </Pressable>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>
              Desbloqueie mais de 2895 Jogos
            </Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
