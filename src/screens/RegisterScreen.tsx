import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Image, StatusBar, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface RegisterScreenProps {
  onBack: () => void;
  onLoginClick: () => void;
  onSuccess: () => void;
}

export function RegisterScreen({ onBack, onLoginClick, onSuccess }: RegisterScreenProps) {
  const [formData, setFormData] = useState({
    cpf: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    celular: '',
  });

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
    <SafeAreaView className="flex-1 bg-[#02023D]">
      <StatusBar barStyle="light-content" />
      
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
          <Pressable className="flex-1 bg-[#091054] items-center justify-center">
            <Text className="text-white font-bold text-[11px]">Cadastro</Text>
          </Pressable>
          <Pressable onPress={onLoginClick} className="flex-1 bg-white items-center justify-center">
            <Text className="text-[#02023D] font-bold text-[11px]">Login</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Banner */}
        <View className="px-4 mt-2">
          <LinearGradient
            colors={['#000000', '#0007C9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0.5 }}
            className="rounded-[25px] overflow-hidden p-6 flex-row"
            style={{ minHeight: 180 }}
          >
            <View className="flex-1 justify-center z-10">
              <Image 
                source={require('../../assets/logos/bemvindo.png')} 
                className="w-48 h-24 mb-4" 
                resizeMode="contain" 
              />
              <Text className="text-white font-black italic text-[16px] leading-[22px]">
                Você sabia que na Esportes da Sorte liberamos giros grátis todos os dias?
              </Text>
            </View>
            <View className="absolute right-[-20px] bottom-[-10px] w-[180px] h-[180px]">
               <Image 
                source={require('../../assets/logos/fotocoelhologin.png')} 
                className="w-full h-full" 
                resizeMode="contain" 
              />
            </View>
          </LinearGradient>
        </View>

        {/* Form Title */}
        <View className="px-4 mt-4 mb-3">
          <Text className="text-white text-lg font-bold">Preencha todos os campos</Text>
        </View>

        {/* Inputs */}
        <View className="px-4">
          <InputField 
            label="CPF" 
            placeholder="Ex: 111.111.111-11" 
            value={formData.cpf}
            onChangeText={(t: string) => setFormData({...formData, cpf: t})}
          />
          <InputField 
            label="E-MAIL" 
            placeholder="Ex: usuario@gmail.com" 
            value={formData.email}
            onChangeText={(t: string) => setFormData({...formData, email: t})}
          />
          <InputField 
            label="SENHA" 
            placeholder="Ex: Olamundo.1234" 
            secureTextEntry 
            value={formData.senha}
            onChangeText={(t: string) => setFormData({...formData, senha: t})}
          />
          <InputField 
            label="CONFIRMAR SENHA" 
            placeholder="Ex: Olamundo.1234" 
            secureTextEntry 
            value={formData.confirmarSenha}
            onChangeText={(t: string) => setFormData({...formData, confirmarSenha: t})}
          />
          <InputField 
            label="NÚMERO DE CELULAR" 
            placeholder="Ex: +55 (99) 99999-9999" 
            value={formData.celular}
            onChangeText={(t: string) => setFormData({...formData, celular: t})}
          />
        </View>

        {/* Register Button - Based on design, usually at the bottom */}
        <View className="px-4 mt-4">
          <Pressable 
            onPress={onSuccess}
            className="bg-[#17C900] py-4 rounded-[15px] items-center active:opacity-80"
          >
            <Text className="text-black font-black text-lg">CADASTRAR</Text>
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
    </SafeAreaView>
  );
}
