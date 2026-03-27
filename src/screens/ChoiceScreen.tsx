import React from 'react';
import { View, Text, Pressable, StatusBar, Image, SafeAreaView, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface ChoiceScreenProps {
  onSelectLogin: () => void;
  onSelectRegister: () => void;
  onBack: () => void;
}

export function ChoiceScreen({ onSelectLogin, onSelectRegister, onBack }: ChoiceScreenProps) {
  return (
    <View className="flex-1 bg-[#02023D] px-6 pt-12">
      <StatusBar barStyle="light-content" backgroundColor="#02023D" />
      
      <View className="flex-row items-center justify-between mt-12">
        <Pressable onPress={onBack} className="p-2">
          <Feather name="chevron-left" size={28} color="white" />
        </Pressable>
        <Image 
          source={require('../../assets/logos/logo_eds_deitada.png')} 
          className="w-40 h-10" 
          resizeMode="contain" 
        />
        <View className="w-10" />
      </View>

      <View className="items-center mt-10 mb-6">
        <Image 
          source={require('../../assets/logos/japossuicadastro.png')} 
          className="w-full h-40" 
          resizeMode="contain" 
        />
      </View>

      <View className="flex-row justify-between flex-1 max-h-[380px]">
        <Pressable 
          onPress={onSelectLogin}
          className="w-[48%] rounded-[30px] overflow-hidden bg-white"
          style={{ elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4 }}
        >
          <View className="flex-1 items-center pt-6">
            <Text className="text-[#0007C9] text-3xl font-black italic">SIM</Text>
            <Text className="text-[#0007C9] text-lg font-bold italic mt-1">Entrar no app</Text>
            <View className="mt-2 w-full flex-1">
              <Image 
                source={require('../../assets/logos/fotogeniologin.png')} 
                className="w-full h-full" 
                resizeMode="contain" 
              />
            </View>
          </View>
        </Pressable>

        <Pressable 
          onPress={onSelectRegister}
          className="w-[48%] rounded-[30px] overflow-hidden"
          style={{ elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4 }}
        >
          <LinearGradient colors={['#000000', '#0007C9']} style={{ flex: 1 }}>
            <View className="flex-1 items-center pt-6">
              <Text className="text-white text-3xl font-black italic">NÃO</Text>
              <Text className="text-white text-lg font-bold italic mt-1 text-center">Criar meu perfil</Text>
              <View className="mt-2 w-full flex-1">
                <Image 
                  source={require('../../assets/logos/fotocoelhologin.png')} 
                  className="w-full h-full" 
                  resizeMode="contain" 
                />
              </View>
            </View>
          </LinearGradient>
        </Pressable>
      </View>

      <View className="mt-auto mb-20 items-center">
        <Pressable className="flex-row items-center">
          <Text className="text-white text-[13px] underline mr-2">
            Possui alguma dúvida? Entre em contato com nosso suporte
          </Text>
          <Image 
            source={require('../../assets/icons/chat_homepreview.png')} 
            className="w-5 h-5" 
            resizeMode="contain" 
          />
        </Pressable>
      </View>
    </View>
  );
}
