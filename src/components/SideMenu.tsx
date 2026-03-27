import React from 'react';
import { View, Text, ScrollView, Pressable, Image, TextInput, Modal, Dimensions } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface SideMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onTabSelect: (tab: string) => void;
}

export function SideMenu({ isVisible, onClose, onTabSelect }: SideMenuProps) {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 flex-row">
        {/* Sidebar Content */}
        <View className="w-[85%] bg-[#02023D] pt-12 pb-6">
          <View className="flex-row items-center justify-between px-4 mb-6">
            <Image 
              source={require('../../assets/logos/logo_eds_deitada.png')} 
              className="w-32 h-8" 
              resizeMode="contain" 
            />
            <Pressable onPress={onClose} className="p-1">
              <Feather name="x" size={28} color="white" />
            </Pressable>
          </View>

          {/* Search Bar */}
          <View className="px-4 mb-6">
            <View className="flex-row items-center border border-white/20 rounded-full px-4 py-2 bg-white/5">
              <Feather name="search" size={20} color="white" />
              <TextInput 
                placeholder="Pesquisa" 
                placeholderTextColor="rgba(255,255,255,0.5)"
                className="text-white ml-3 flex-1 h-10"
              />
            </View>
          </View>

          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {/* Categorias Section */}
            <View className="px-4 mb-8">
              <Text className="text-white text-lg font-bold mb-4">Categorias</Text>
              <View className="flex-row justify-between">
                {[
                  { name: 'Esportes', icon: 'soccer' },
                  { name: 'Ao Vivo', icon: 'play-circle-outline' },
                  { name: 'Cassino', icon: 'slot-machine-outline' },
                  { name: 'Cassino ao Vivo', icon: 'dice-5-outline' }
                ].map((cat, i) => (
                  <Pressable 
                    key={i} 
                    className="items-center w-[22%]"
                    onPress={() => {
                      if (cat.name === 'Esportes' || cat.name === 'Cassino') {
                        onTabSelect(cat.name);
                        onClose();
                      }
                    }}
                  >
                    <View className="w-14 h-14 bg-white/10 rounded-xl items-center justify-center mb-1">
                      <MaterialCommunityIcons name={cat.icon as any} size={28} color="white" />
                    </View>
                    <Text className="text-white text-[10px] text-center font-medium">{cat.name}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Banner Section */}
            <View className="px-4 mb-4 gap-y-3 items-start">
              {[1, 2, 3, 4].map((num) => (
                <Image 
                  key={num}
                  source={
                    num === 1 ? require('../../assets/menu/1.png') :
                    num === 2 ? require('../../assets/menu/2.png') :
                    num === 3 ? require('../../assets/menu/3.png') :
                    require('../../assets/menu/4.png')
                  } 
                  className="w-[70%] h-16" 
                  resizeMode="contain" 
                  style={{ alignSelf: 'flex-start' }}
                />
              ))}
            </View>

            {/* List Sections */}
            <SectionHeader title="Esportes" />
            <ListItem icon="calendar" title="Eventos do Dia" />
            <ListItem 
              icon="trending-up" 
              title="Populares" 
              onPress={() => {
                onTabSelect('Populares');
                onClose();
              }} 
            />
            <ListItem icon="divide-circle" title="Bolão da Sorte" />
            <ListItem icon="monitor" title="Virtuais" />
            <ListItem icon="activity" title="Resultados ao Vivo" />
            <ListItem icon="bar-chart-2" title="Estatísticas" />

            <SectionHeader title="Cassino" />
            <ListItem icon="grid" title="Todos os jogos" />
            <ListItem 
              icon="star" 
              title="Populares" 
              onPress={() => {
                onTabSelect('Populares');
                onClose();
              }} 
            />
            <ListItem icon="zap" title="Novo" />
            <ListItem icon="layers" title="Video Slots" />
            <ListItem icon="target" title="Crash Games" />
            <ListItem icon="send" title="Aviator" />
            <ListItem icon="circle" title="Bingo Ao Vivo" />

            <SectionHeader title="Para você" />
            <ListItem icon="percent" title="Promoções" />
            <ListItem icon="heart" title="Favoritos" />
            <ListItem icon="book-open" title="Tutorial Jogos" />
            <ListItem icon="message-circle" title="Suporte" />
            
            <View className="flex-row items-center justify-between px-4 py-4 border-b border-white/10">
              <View className="flex-row items-center">
                <Text className="text-white text-[15px] font-medium ml-3">Português</Text>
              </View>
              <Feather name="chevron-right" size={20} color="white" />
            </View>

          </ScrollView>
        </View>

        {/* Backdrop to close */}
        <Pressable 
          onPress={onClose} 
          className="flex-1 bg-black/40"
        />
      </View>
    </Modal>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <View className="px-4 py-4 mt-2">
      <Text className="text-white text-xl font-bold">{title}</Text>
    </View>
  );
}

function ListItem({ icon, title, onPress }: { icon: string, title: string, onPress?: () => void }) {
  return (
    <Pressable 
      className="flex-row items-center px-4 py-4 border-b border-white/5 active:bg-white/5"
      onPress={onPress}
    >
      <Feather name={icon as any} size={20} color="white" />
      <Text className="text-white text-[15px] font-medium ml-4">{title}</Text>
    </Pressable>
  );
}
