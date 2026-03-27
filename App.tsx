import './global.css';
import React, { useState } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import { LoginScreen } from './src/screens/LoginScreen';
import { ChoiceScreen } from './src/screens/ChoiceScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { CassinoScreen } from './src/screens/CassinoScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { SoccerScreen } from './src/screens/SoccerScreen';
import { PopularesScreen } from './src/screens/PopularesScreen';
import { SuporteScreen } from './src/screens/SuporteScreen';
import { BottomNav } from './src/components/BottomNav';
import { HomePreviewScreen } from './src/screens/HomePreviewScreen';

export default function App() {
  const [showPreview, setShowPreview] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentFlow, setCurrentFlow] = useState<'choice' | 'login' | 'register'>('choice');
  const [activeTab, setActiveTab] = useState('Home'); 
  const [homeScreen, setHomeScreen] = useState('Home');

  if (showPreview) {
    return (
      <HomePreviewScreen 
        onLoginClick={() => setShowPreview(false)} 
        onDirectLogin={() => {
          setShowPreview(false);
          setCurrentFlow('login');
        }}
        onDirectRegister={() => {
          setShowPreview(false);
          setCurrentFlow('register');
        }}
      />
    );
  }

  if (!isLoggedIn) {
     if (currentFlow === 'choice') {
       return (
         <ChoiceScreen 
           onSelectLogin={() => setCurrentFlow('login')}
           onSelectRegister={() => setCurrentFlow('register')}
           onBack={() => setShowPreview(true)}
         />
       );
     }
     if (currentFlow === 'register') {
       return (
         <RegisterScreen 
           onBack={() => setCurrentFlow('choice')}
           onLoginClick={() => setCurrentFlow('login')}
           onSuccess={() => {
             setIsLoggedIn(true);
           }}
         />
       );
     }
     if (currentFlow === 'login') {
       return (
         <LoginScreen 
           onBack={() => setCurrentFlow('choice')}
           onRegisterClick={() => setCurrentFlow('register')}
           onLogin={() => setIsLoggedIn(true)} 
         />
       );
     }
  }

  return (
    <View className="flex-1 bg-[#090B22] pt-12">
      <StatusBar barStyle="light-content" backgroundColor="#0B0F2A" />
      <View className="flex-1">
        {activeTab === 'Home' && (homeScreen === 'Home' ? 
          <HomeScreen onSearchClick={() => setHomeScreen('Cassino')} /> : 
          <CassinoScreen onBack={() => setHomeScreen('Home')} />
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
