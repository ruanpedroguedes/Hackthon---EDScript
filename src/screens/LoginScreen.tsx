import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, SafeAreaView, StatusBar, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View className="flex-1 bg-[#090B22] justify-center px-6 pt-12">
      <StatusBar barStyle="light-content" backgroundColor="#0B0F2A" />

      <View className="items-center mb-12">
        <Image source={require('../../assets/logos/logo_eds_deitada.png')} className="w-56 h-12 mb-2" resizeMode="contain" />
        <Text className="text-gray-400 text-sm mt-2 tracking-widest uppercase">Login de Acesso</Text>
      </View>

      <View className="bg-[#1D2146] rounded-xl px-4 py-3 mb-4 flex-row items-center border border-[#2B325A]">
        <Feather name="mail" size={20} color="#9CA3AF" />
        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#9CA3AF"
          className="flex-1 text-white ml-3 text-base"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View className="bg-[#1D2146] rounded-xl px-4 py-3 mb-6 flex-row items-center border border-[#2B325A]">
        <Feather name="lock" size={20} color="#9CA3AF" />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#9CA3AF"
          className="flex-1 text-white ml-3 text-base"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <Pressable className="mb-8 items-end">
        <Text className="text-green-500 font-bold text-sm">Esqueceu a senha?</Text>
      </Pressable>

      <Pressable
        onPress={onLogin}
        className="bg-[#0B8226] rounded-xl py-4 items-center active:opacity-80 shadow-lg shadow-green-900"
      >
        <Text className="text-white font-extrabold text-lg">ENTRAR</Text>
      </Pressable>

      <View className="flex-row justify-center mt-8">
        <Text className="text-gray-400 text-sm">Não tem uma conta? </Text>
        <Pressable>
          <Text className="text-green-500 font-bold text-sm">Cadastre-se</Text>
        </Pressable>
      </View>
    </View>
  );
}
