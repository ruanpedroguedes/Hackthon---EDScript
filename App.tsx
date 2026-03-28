import './global.css';
import React, { useState } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import { LoginScreen } from './src/screens/LoginScreen';
import { ChoiceScreen } from './src/screens/ChoiceScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
// Removed CassinoScreen import
import { HomeScreen } from './src/screens/HomeScreen';
import { SoccerScreen } from './src/screens/SoccerScreen';
import { PopularesScreen } from './src/screens/PopularesScreen';
import { SuporteScreen } from './src/screens/SuporteScreen';
import { BottomNav } from './src/components/BottomNav';
import { HomePreviewScreen } from './src/screens/HomePreviewScreen';
import { PreferenceSelectionScreen } from './src/screens/PreferenceSelectionScreen';
import BetRecommendationScreen from './src/screens/BetRecommendationScreen';

export default function App() {
  const [showPreview, setShowPreview] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentFlow, setCurrentFlow] = useState<'choice' | 'login' | 'register'>('choice');
  const [activeTab, setActiveTab] = useState('Home'); 
  const [homeScreen, setHomeScreen] = useState('Home');
  const [hasSelectedPreference, setHasSelectedPreference] = useState(false);
  const [showBetModal, setShowBetModal] = useState(false);

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

  if (!hasSelectedPreference) {
    return (
      <PreferenceSelectionScreen
        onCassinoAoVivo={() => { setHasSelectedPreference(true); setActiveTab('Home'); setHomeScreen('Cassino'); }}
        onEsportes={() => { setHasSelectedPreference(true); setActiveTab('Esportes'); setHomeScreen('Esportes'); }}
        onCassino={() => { setHasSelectedPreference(true); setActiveTab('Home'); setHomeScreen('Cassino'); }}
        onSair={() => { 
          setHasSelectedPreference(false); 
          setIsLoggedIn(false); 
          setCurrentFlow('choice'); 
          setShowPreview(true); 
        }}
      />
    );
  }

  return (
    <HomePreviewScreen isLoggedIn={true} initialTab={homeScreen} />
  );
}

