import './global.css';
import React, { useState } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import { LoginScreen } from './src/screens/LoginScreen';
import { ChoiceScreen } from './src/screens/ChoiceScreen';
import { CassinoScreen } from './src/screens/CassinoScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { SoccerScreen } from './src/screens/SoccerScreen';
import { PopularesScreen } from './src/screens/PopularesScreen';
import { SuporteScreen } from './src/screens/SuporteScreen';
import { BottomNav } from './src/components/BottomNav';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasChosen, setHasChosen] = useState(false);
  const [activeTab, setActiveTab] = useState('Cassino'); 
  const [homeScreen, setHomeScreen] = useState('Home');

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  if (!hasChosen) {
    return <ChoiceScreen onComplete={() => setHasChosen(true)} />;
  }

  return (
    <View className="flex-1 bg-[#090B22] pt-12">
      <StatusBar barStyle="light-content" backgroundColor="#0B0F2A" />
      <View className="flex-1">
        {activeTab === 'Cassino' && (
           homeScreen === 'Home' ? (
             <HomeScreen onSearchClick={() => setHomeScreen('Cassino')} />
           ) : (
             <CassinoScreen onBack={() => setHomeScreen('Home')} />
           )
        )}
        {activeTab === 'Esportes' && (
          <SoccerScreen onBack={() => {
            setActiveTab('Cassino');
            setHomeScreen('Home');
          }} />
        )}
        {activeTab === 'Populares' && <PopularesScreen />}
        {activeTab === 'Suporte' && <SuporteScreen />}
      </View>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
}
