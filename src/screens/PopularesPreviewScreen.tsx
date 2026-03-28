import React, { useState } from 'react';
import { View, Text, Pressable, Image, StatusBar, ScrollView, TextInput, FlatList, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface PopularesPreviewScreenProps {
  onLoginClick: () => void;
  onDirectLogin: () => void;
  onDirectRegister: () => void;
  onMenuClick: () => void;
  isLoggedIn?: boolean;
}

export function PopularesPreviewScreen({
  onLoginClick,
  onDirectLogin,
  onDirectRegister,
  onMenuClick,
  isLoggedIn = false,
}: PopularesPreviewScreenProps) {
  const [activeCategory, setActiveCategory] = useState('Jogos populares');

  const filterTabs = [
    { id: '1', label: 'Jogos populares' },
    { id: '2', label: 'partidas populares' },
    { id: '3', label: 'apostas populares' },
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

      {/* Filter Chips Section */}
      <View className="flex-row px-4 mt-6 items-center justify-between">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-1 mr-3"
          contentContainerStyle={{ paddingRight: 10, alignItems: 'center' }}
        >
          {filterTabs.map((tab) => (
            <Pressable
              key={tab.id}
              onPress={() => setActiveCategory(tab.label)}
              className={`px-4 py-2 rounded-full border mr-2 items-center justify-center active:opacity-80 ${activeCategory === tab.label
                ? 'bg-[#0B8226] border-green-500'
                : 'bg-[#0D1431] border-[#2B325A]'
                }`}
            >
              <Text
                className={`font-semibold text-xs whitespace-nowrap ${activeCategory === tab.label ? 'text-white' : 'text-gray-400'
                  }`}
              >
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Pressable
          onPress={onLoginClick}
          className="flex-row items-center bg-[#2B325A] px-4 py-2 rounded-full active:bg-[#343D6B] h-9"
        >
          <Text className="text-white font-medium mr-1 text-xs">Filtro</Text>
          <Feather name="chevron-down" size={16} color="white" />
        </Pressable>
      </View>

      {/* Content Area */}
      <ScrollView className="flex-1 mt-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Aviator Banner */}
        <Pressable className="px-4 mt-2 active:opacity-90" onPress={onLoginClick}>
          <Image
            source={require('../../assets/populares/aviator_banner.png')}
            className="w-full h-[180px] rounded-2xl"
            resizeMode="cover"
          />
        </Pressable>

        {/* Action Buttons / Play Button Conditional */}
        {!isLoggedIn ? (
          <View style={{ flexDirection: 'row', paddingHorizontal: 16, marginTop: 15, justifyContent: 'center', gap: 12 }}>
            {/* Entrar e Jogar (Solid Dark Gradient) */}
            <Pressable
              onPress={onDirectLogin}
              style={({ pressed }) => ({
                flex: 1,
                borderRadius: 6,
                overflow: 'hidden',
                opacity: pressed ? 0.9 : 1,
              })}
            >
              <LinearGradient
                colors={['#000000', '#07008C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  height: 42,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: 'white', fontWeight: '900', fontSize: 15, textAlign: 'center' }}>Entrar e Jogar</Text>
              </LinearGradient>
            </Pressable>

            {/* Criar Conta (Solid Green) */}
            <Pressable
              onPress={onDirectRegister}
              style={({ pressed }) => ({
                flex: 1,
                borderRadius: 6,
                opacity: pressed ? 0.9 : 1,
              })}
            >
              <View
                style={{
                  backgroundColor: '#17C900',
                  height: 42,
                  borderRadius: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '900',
                    fontSize: 15,
                    textAlign: 'center',
                    textShadowColor: 'rgba(0, 0, 0, 0.25)',
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 2
                  }}
                >
                  Criar Conta
                </Text>
              </View>
            </Pressable>
          </View>
        ) : (
          <View style={{ paddingHorizontal: 16, marginTop: 15 }}>
            <Pressable
              style={({ pressed }) => ({
                borderRadius: 8,
                opacity: pressed ? 0.9 : 1,
                width: '100%',
              })}
            >
              <View
                style={{
                  backgroundColor: '#17C900',
                  height: 48,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '900',
                    fontSize: 16,
                    textAlign: 'center',
                    textShadowColor: 'rgba(0, 0, 0, 0.25)',
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 2,
                    textTransform: 'uppercase'
                  }}
                >
                  Jogar
                </Text>
              </View>
            </Pressable>
          </View>
        )}

        {/* Divider */}
        <View style={{ marginHorizontal: 16, marginTop: 20, height: 1, backgroundColor: 'rgba(255,255,255,0.15)' }} />


        {/* Populares em Cassino Title */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 20, marginBottom: 8 }}>
          <Image
            source={require('../../assets/icons/fire2.png')}
            style={{ width: 28, height: 28, marginRight: 6 }}
            resizeMode="contain"
          />
          <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}>Populares em Cassino</Text>
        </View>

        {/* Games Carousel */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
          {[
            require('../../assets/populares/pop1.png'),
            require('../../assets/populares/pop2.png'),
            require('../../assets/populares/pop3.png'),
            require('../../assets/populares/pop4.png'),
          ].map((img, index) => (
            <Pressable
              key={index}
              style={{ width: 130, height: 160, marginRight: 10, borderRadius: 12, overflow: 'hidden' }}
              onPress={onLoginClick}
            >
              <Image
                source={img}
                style={{ width: '100%', height: '100%', borderRadius: 12 }}
                resizeMode="contain"
              />
            </Pressable>
          ))}
        </ScrollView>

        {/* Divider */}
        <View style={{ marginHorizontal: 16, marginTop: 4, height: 1, backgroundColor: 'rgba(255,255,255,0.15)' }} />

        {/* Em Alta Hoje Title */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 16 }}>
          <Image
            source={require('../../assets/icons/setaverde.png')}
            style={{ width: 24, height: 24, marginRight: 6 }}
            resizeMode="contain"
          />
          <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}>Em Alta Hoje</Text>
        </View>

        {/* Trending Games Carousel */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, marginTop: 8 }}>
          {[
            require('../../assets/carrosel/trend1.png'),
            require('../../assets/carrosel/trend2.png'),
            require('../../assets/carrosel/trend3.png'),
            require('../../assets/carrosel/trend4.png'),
          ].map((img, index) => (
            <Pressable
              key={index}
              style={{ width: 130, height: 160, marginRight: 10, borderRadius: 12, overflow: 'hidden' }}
              onPress={onLoginClick}
            >
              <Image
                source={img}
                style={{ width: '100%', height: '100%', borderRadius: 12 }}
                resizeMode="contain"
              />
            </Pressable>
          ))}
        </ScrollView>

        {/* Divider */}
        <View style={{ marginHorizontal: 16, marginTop: 4, height: 1, backgroundColor: 'rgba(255,255,255,0.15)' }} />

        {/* Apostas Ao Vivo Title */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 16 }}>
          <Image
            source={require('../../assets/icons/radar.png')}
            style={{ width: 24, height: 24, marginRight: 6 }}
            resizeMode="contain"
          />
          <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}>Apostas Ao Vivo</Text>
        </View>

        {/* Glass Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, marginTop: 16 }}
        >
          {[
            { id: 1, icon: require('../../assets/icons/futebol.png'), label: 'Futebol' },
            { id: 2, icon: require('../../assets/icons/roleta.png'), label: 'Roleta' },
            { id: 3, icon: require('../../assets/icons/blackjack.png'), label: 'Blackjack' },
          ].map((item) => (
            <Pressable
              key={item.id}
              onPress={onLoginClick}
              style={({ pressed }) => ({
                opacity: pressed ? 0.8 : 1
              })}
            >
              <LinearGradient
                colors={['rgba(0,0,0,0.2)', 'rgba(0,7,201,0.2)']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: 147,
                  height: 58,
                  marginRight: 10,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.15)',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  overflow: 'hidden'
                }}
              >
                <Image
                  source={item.icon}
                  style={{ width: 28, height: 28, marginRight: 8 }}
                  resizeMode="contain"
                />
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{item.label}</Text>
              </LinearGradient>
            </Pressable>
          ))}
        </ScrollView>

        {/* Divider below Glass Cards */}
        <View style={{ marginHorizontal: 16, marginTop: 20, height: 1, backgroundColor: 'rgba(255,255,255,0.15)' }} />

        {/* Flanked Title */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, paddingHorizontal: 16 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.1)' }} />
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, marginHorizontal: 15 }}>
            {isLoggedIn ? 'Jogos Onlines' : 'Desbloqueie Jogos Exclusivos!'}
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.1)' }} />
        </View>

        {/* Games Image */}
        <View style={{ alignItems: 'center', marginTop: 10, paddingHorizontal: 16 }}>
          <Image
            source={isLoggedIn
              ? require('../../assets/populares/desbloqueados.png')
              : require('../../assets/populares/bloqueados.png')
            }
            style={{ width: '100%', height: 220 }}
            resizeMode="contain"
          />
        </View>

        {/* Button Section */}
        <View style={{ paddingHorizontal: 20, marginTop: 16, alignItems: 'center', marginBottom: 30 }}>
          <Pressable
            style={{
              backgroundColor: '#17C900',
              width: '100%',
              paddingVertical: 10,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={onLoginClick}
          >
            <Text style={{ color: '#02023D', fontWeight: 'bold', fontSize: 18 }}>
              {isLoggedIn ? 'Mostrar Mais' : 'Desbloquear'}
            </Text>
          </Pressable>
          <Text style={{ color: 'white', fontWeight: '500', fontSize: 13, marginTop: 8 }}>
            {isLoggedIn ? 'Mostrar 30 de 2886 Jogos' : 'Desbloquear mais de 2889 jogos'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
