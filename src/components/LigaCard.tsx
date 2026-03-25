import React from 'react';
import { View, Text, Image, ImageSourcePropType, Pressable } from 'react-native';

interface LigaCardProps {
  name: string;
  imageSource?: ImageSourcePropType;
  isSelected?: boolean;
  onPress?: () => void;
}

export function LigaCard({ name, imageSource, isSelected, onPress }: LigaCardProps) {
  return (
    <Pressable onPress={onPress} className="items-center w-[30%] mb-4 active:opacity-70">
      <View 
        className={`w-16 h-16 bg-[#1c1c4c] rounded-full items-center justify-center overflow-hidden mb-2 border-2 ${isSelected ? 'border-[#17C900]' : 'border-transparent'}`}
      >
         {imageSource ? (
           <Image source={imageSource} className="w-12 h-12" resizeMode="contain" />
         ) : (
           <Text className="text-white font-bold text-lg">{name.substring(0, 2).toUpperCase()}</Text>
         )}
      </View>
      <Text className={`text-xs text-center font-medium leading-tight ${isSelected ? 'text-[#17C900]' : 'text-white'}`}>{name}</Text>
    </Pressable>
  );
}
