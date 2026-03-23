import './global.css';
import React from 'react';
import { View, Text, ScrollView, Pressable, StatusBar, SafeAreaView } from 'react-native';
import { LigaCard } from './src/components/LigaCard';
import { Section } from './src/components/Section';
import { Button } from './src/components/Button';

// Dados para a lista de ligas
const ligas = [
  { id: '1', name: 'Brasileirão', image: require('./assets/soccer/brasileirao.png') },
  { id: '2', name: 'Libertadores', image: require('./assets/soccer/libertadores.png') },
  { id: '3', name: 'Champions League', image: require('./assets/soccer/champions.png') },
  { id: '4', name: 'Série A Itália', image: require('./assets/soccer/serieA.png') },
  { id: '5', name: 'Europa League', image: require('./assets/soccer/europa_league_no_bg 1.png') },
  { id: '6', name: 'Conference League', image: require('./assets/soccer/conferenceleague.png') },
  { id: '7', name: 'Premier League', image: require('./assets/soccer/premirerleague.png') },
  { id: '8', name: '1ª Liga de Portugal', image: require('./assets/soccer/1ligadeportugal.png') },
  { id: '9', name: 'La Liga', image: require('./assets/soccer/laliga.png') },
  { id: '10', name: 'Bundesliga', image: require('./assets/soccer/bundesliga.png') },
  { id: '11', name: 'Ligue 1', image: require('./assets/soccer/ligue1.png') },
  { id: '12', name: 'Copa do Rei', image: require('./assets/soccer/copadorei.png') },
];


const outrosEsportes = [
  { id: '1', name: 'Basquete', image: require('./assets/soccer/basquete.png') },
  { id: '2', name: 'Vôlei', image: require('./assets/soccer/volei.png') },
  { id: '3', name: 'Tênis', image: require('./assets/soccer/tenis.png') },
];

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-[#0B0F2A]">
      <StatusBar barStyle="light-content" backgroundColor="#0B0F2A" />
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 60, paddingTop: 20, alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        
        {/* 1. Header simulando um logo */}
        <View className="mb-10 items-center">
          <Text className="text-white font-semibold text-2xl tracking-tighter">
            <Text className="text-green-500 font-extrabold italic">ES</Text>portes da Sorte
          </Text>
        </View>

        {/* 2. Título principal */}
        <View className="px-6 items-center mb-8 w-full">
          <Text className="text-white text-2xl font-bold text-center mb-2">
            Quais ligas você mais gosta de apostar?
          </Text>
          <Text className="text-gray-400 text-sm text-center">
            Escolha para personalizar sua experiência
          </Text>
        </View>

        {/* 3. Seção Futebol */}
        <Section title="Futebol">
          <View className="flex-row flex-wrap justify-between w-full">
            {ligas.map(liga => (
              <LigaCard key={liga.id} name={liga.name} imageSource={(liga as any).image} />
            ))}
          </View>
        </Section>

        {/* 4. Seção Secundária */}
        <Section title="Você também pode gostar">
          <View className="flex-row justify-between w-full">
            {outrosEsportes.map(esporte => (
              <LigaCard key={esporte.id} name={esporte.name} imageSource={(esporte as any).image} />
            ))}
          </View>
        </Section>

        {/* 5. Link adicional */}
        <Pressable className="mt-4 mb-8">
          <Text className="text-gray-300 font-medium underline">
            Selecionar outra modalidade de aposta
          </Text>
        </Pressable>

        {/* 6. Botão Principal (CTA) */}
        <View className="w-full px-6">
          <Button title="Começar a apostar" onPress={() => console.log('Começou!')} />
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}
