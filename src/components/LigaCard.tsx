import React from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';

interface LigaCardProps {
  name: string;
  imageSource?: ImageSourcePropType;
}

export function LigaCard({ name, imageSource }: LigaCardProps) {
  return (
    <View className="items-center w-[30%] mb-4">
      <View className="w-16 h-16 bg-white rounded-full items-center justify-center overflow-hidden mb-2">
         {imageSource ? (
           <Image source={imageSource} className="w-10 h-10" resizeMode="contain" />
         ) : (
           <Text className="text-[#0B0F2A] font-bold text-lg">{name.substring(0, 2).toUpperCase()}</Text>
         )}
      </View>
      <Text className="text-white text-xs text-center font-medium leading-tight">{name}</Text>
    </View>
  );
}
