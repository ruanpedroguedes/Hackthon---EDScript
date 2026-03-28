import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Image, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { LoadingOverlay } from '../components/LoadingOverlay';

interface LoginScreenProps {
  onBack: () => void;
  onRegisterClick: () => void;
  onLogin: () => void;
}

export function LoginScreen({ onBack, onRegisterClick, onLogin }: LoginScreenProps) {
  const [formData, setFormData] = useState({
    login: '',
    senha: '',
  });
  const [stayConnected, setStayConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = () => {
    setIsLoading(true);
    // Simulating 2 seconds loading for backend auth
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 2000);
  };

  const InputField = ({ label, placeholder, value, onChangeText, secureTextEntry = false }: any) => (
    <View className="mb-3">
      <Text className="text-white font-bold mb-1 uppercase text-[11px]">{label} *</Text>
      <View className="bg-white rounded-[12px] px-4 py-2 h-[48px] justify-center">
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#02023D"
          className="text-[#02023D] text-sm font-bold"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-[#02023D]" style={{ flex: 1, backgroundColor: '#02023D' }}>
      <StatusBar barStyle="light-content" />
      <LoadingOverlay visible={isLoading} />
      
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-10 pb-3">
        <Pressable onPress={onBack} className="p-2">
          <Feather name="chevron-left" size={28} color="white" />
        </Pressable>
        
        <Image 
          source={require('../../assets/logos/logo_eds_deitada.png')} 
          className="w-32 h-8" 
          resizeMode="contain" 
        />

        <View className="flex-row bg-[#02023D] border border-white/20 rounded-full overflow-hidden h-[34px] w-[130px]">
          <Pressable onPress={onRegisterClick} className="flex-1 bg-white items-center justify-center">
            <Text className="text-[#02023D] font-bold text-[11px]">Cadastro</Text>
          </Pressable>
          <Pressable className="flex-1 bg-[#091054] items-center justify-center">
            <Text className="text-white font-bold text-[11px]">Login</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Banner */}
        <View className="px-4 mt-2">
          <Image
            source={require('../../assets/login/login.png')}
            style={{ width: '100%', height: 170, borderRadius: 25 }}
            resizeMode="cover"
          />
        </View>

        {/* Form Title */}
        <View className="px-4 mt-4 mb-3">
          <Text className="text-white text-lg font-bold">Preencha todos os campos</Text>
        </View>

        {/* Inputs */}
        <View className="px-4">
          <InputField 
            label="LOGIN" 
            placeholder="USUÁRIO, CPF, E-MAIL OU TELEFONE" 
            value={formData.login}
            onChangeText={(t: string) => setFormData({...formData, login: t})}
          />
          <InputField 
            label="SENHA" 
            placeholder="Ex: Olamundo.1234" 
            secureTextEntry 
            value={formData.senha}
            onChangeText={(t: string) => setFormData({...formData, senha: t})}
          />
        </View>

        {/* Options */}
        <View className="px-4 mt-2">
          <Pressable 
            onPress={() => setStayConnected(!stayConnected)}
            className="flex-row items-center mb-6"
          >
            <View className={`w-5 h-5 border border-white/40 rounded mr-2 items-center justify-center ${stayConnected ? 'bg-[#17C900]' : ''}`}>
               {stayConnected && <Feather name="check" size={14} color="black" />}
            </View>
            <Text className="text-white text-xs">Mantenha-me conectado</Text>
          </Pressable>

          <Pressable className="items-center">
            <Text className="text-white text-sm">
              Esqueceu sua <Text className="font-bold">senha?</Text>
            </Text>
          </Pressable>
        </View>

        {/* Login Button */}
        <View className="px-4 mt-8">
          <Pressable 
            onPress={handleLoginSubmit}
            className="bg-[#17C900] py-4 rounded-[15px] items-center active:opacity-80"
          >
            <Text className="text-black font-black text-lg uppercase">Entrar</Text>
          </Pressable>
        </View>

        {/* Footer */}
        <View className="mt-12 items-center px-6">
          <Pressable className="flex-row items-center border-t border-white/10 pt-6 w-full justify-center">
            <Text className="text-white text-[10px] underline mr-2">
              Possui alguma dúvida? Entre em contato com nosso suporte
            </Text>
            <Feather name="message-circle" size={16} color="white" />
          </Pressable>
        </View>

      </ScrollView>
    </View>
  );
}
