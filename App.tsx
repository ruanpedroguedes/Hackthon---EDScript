import './global.css';
import React from 'react';
import { View, Text, ScrollView, Pressable, StatusBar, SafeAreaView } from 'react-native';
import { LigaCard } from './src/components/LigaCard';
import { Section } from './src/components/Section';
import { Button } from './src/components/Button';

// Dados para a lista de ligas
const ligas = [
  { id: '1', name: 'Brasileirão' },
  { id: '2', name: 'Libertadores' },
  { id: '3', name: 'Champions League' },
  { id: '4', name: 'Série A Itália' },
  { id: '5', name: 'Europa League' },
  { id: '6', name: 'Conference League' },
  { id: '7', name: 'Premier League' },
  { id: '8', name: '1ª Liga de Portugal' },
  { id: '9', name: 'La Liga' },
  { id: '10', name: 'Bundesliga' },
  { id: '11', name: 'Ligue 1' },
  { id: '12', name: 'Copa do Rei' },
];

const outrosEsportes = [
  { id: '1', name: 'Basquete' },
  { id: '2', name: 'Vôlei' },
  { id: '3', name: 'Tênis' },
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
              <LigaCard key={liga.id} name={liga.name} />
            ))}
          </View>
        </Section>

        {/* 4. Seção Secundária */}
        <Section title="Você também pode gostar">
          <View className="flex-row justify-between w-full">
            {outrosEsportes.map(esporte => (
              <LigaCard key={esporte.id} name={esporte.name} />
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
