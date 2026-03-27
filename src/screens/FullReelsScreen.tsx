import React, { useState, useRef } from 'react';
import { View, Text, Dimensions, FlatList, Pressable, Image, StatusBar, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useVideoPlayer, VideoView, VideoPlayer } from 'expo-video';

const { width, height } = Dimensions.get('window');

const REELS_DATA = [
  { id: '1', video: require('../../assets/videos/neiff.mp4'), title: 'Dica do Dia: Premier League', user: '@eds_neiff', likes: '15k', comments: '1.2k' },
  { id: '2', video: require('../../assets/videos/apostenotime.mp4'), title: 'Hora de Apostar!', user: '@eds_aposta', likes: '8k', comments: '450' },
  { id: '3', video: require('../../assets/videos/maga.mp4'), title: 'Desafio Pro', user: '@eds_maga', likes: '12k', comments: '980' },
  { id: '4', video: require('../../assets/videos/shrek.mp4'), title: 'Dica do Ogro', user: '@eds_shrek', likes: '20k', comments: '3.5k' },
];

function ReelItem({ item, isActive }: { item: any; isActive: boolean }) {
  const player = useVideoPlayer(item.video, (p) => {
    p.loop = true;
    if (isActive) p.play();
  });

  React.useEffect(() => {
    if (isActive) {
      player.play();
    } else {
      player.pause();
    }
  }, [isActive, player]);

  return (
    <VideoView
      player={player}
      style={{ width, height, position: 'absolute' }}
      contentFit="cover"
      nativeControls={false}
    />
  );
}

export function FullReelsScreen({ onClose }: { onClose: () => void }) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(REELS_DATA[0].id);

  // Configuração para detectar qual item está visível (pelo menos 50% na tela)
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  // Callback acionado quando a visibilidade dos itens muda
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveVideoId(viewableItems[0].item.id);
    }
  }).current;

  return (
    <View className="flex-1 bg-black">
      <StatusBar hidden />
      
      <FlatList
        data={REELS_DATA}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }) => (
          <View style={{ width, height }} className="relative">
            <ReelItem item={item} isActive={item.id === activeVideoId} />

            {/* Top Bar Overlay */}
            <SafeAreaView className="absolute top-0 left-0 right-0 z-10">
               <View className="flex-row items-center justify-between px-6 pt-4">
                  <Pressable onPress={onClose} className="p-2 -ml-2">
                     <Feather name="arrow-left" size={28} color="white" />
                  </Pressable>
                  <Text className="text-white font-bold text-lg">Reels</Text>
                  <View className="w-8" />
               </View>
            </SafeAreaView>

            {/* Right Side Actions */}
            <View className="absolute right-4 bottom-[15%] items-center">
               <View className="items-center mb-6">
                  <Feather name="heart" size={32} color="white" />
                  <Text className="text-white text-xs mt-1">{item.likes}</Text>
               </View>
               <View className="items-center mb-6">
                  <Feather name="message-circle" size={32} color="white" />
                  <Text className="text-white text-xs mt-1">{item.comments}</Text>
               </View>
               <View className="items-center mb-6">
                  <Feather name="send" size={30} color="white" />
               </View>
               <Feather name="more-horizontal" size={28} color="white" />
            </View>

            {/* Bottom Info Overlay */}
            <View className="absolute bottom-[8%] left-6 right-16">
               <View className="flex-row items-center mb-3">
                  <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center border border-white/30 mr-3 overflow-hidden">
                     <Feather name="user" size={20} color="white" />
                  </View>
                  <Text className="text-white font-bold text-base">{item.user}</Text>
                  <Pressable className="ml-4 border border-white px-3 py-1 rounded-md">
                     <Text className="text-white font-bold text-xs uppercase">Seguir</Text>
                  </Pressable>
               </View>
               <Text className="text-white text-sm leading-tight" numberOfLines={2}>
                  {item.title}. Veja as melhores chances de hoje na EDScript! 🔥
               </Text>
               <View className="flex-row items-center mt-4">
                  <Feather name="music" size={14} color="white" />
                  <Text className="text-white text-xs ml-2">Áudio Original • {item.user}</Text>
               </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
