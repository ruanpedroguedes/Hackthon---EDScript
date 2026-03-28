import React, { useEffect, useRef, useState } from 'react';
import { View, Modal, StyleSheet, Animated, Image, Text } from 'react-native';

interface LoadingOverlayProps {
  visible: boolean;
}

const BALLS = [
  require('../../assets/icons/soccer.png'),
  require('../../assets/icons/tennis.png'),
  require('../../assets/icons/basquete.png'),
  require('../../assets/icons/volei.png'),
];

export function LoadingOverlay({ visible }: LoadingOverlayProps) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!visible) return;
    
    let isMounted = true;
    let i = 0;

    const flip = () => {
      // Rotate completely flat (90 degrees) to hide
      Animated.timing(rotateAnim, {
        toValue: 0.5,
        duration: 350,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (!isMounted || !finished) return;
        
        // Swap image while it's completely thin/invisible
        i = (i + 1) % BALLS.length;
        setCurrentIndex(i);
        
        // Reset rotation to the opposite extreme (-90 degrees)
        rotateAnim.setValue(-0.5);
        
        // Rotate back to full frontal view (0 degrees)
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (!isMounted || !finished) return;
          
          // Brief pause before next flip
          setTimeout(flip, 200);
        });
      });
    };

    // Start loop
    flip();

    return () => { 
      isMounted = false; 
      rotateAnim.stopAnimation();
    };
  }, [visible]);

  const rotateY = rotateAnim.interpolate({
    inputRange: [-0.5, 0, 0.5],
    outputRange: ['-90deg', '0deg', '90deg']
  });

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.container}>
        
        {/* Glow Background */}
        <View style={styles.glow} />
        
        {/* Rotating 3D Object */}
        <Animated.Image
          source={BALLS[currentIndex]}
          style={[
            styles.image,
            { transform: [{ rotateY }] }
          ]}
          resizeMode="contain"
        />
        
        {/* Optional text or dots */}
        <Text style={styles.text}>Aguarde, carregando os jogos</Text>
        
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#17C900', // Verde vibrante
    opacity: 0.25,
    shadowColor: '#17C900',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 60,
    elevation: 20, // Simulando glow no Android
  },
  image: {
    width: 90,
    height: 90,
    marginBottom: 20, // Espaçamento pro texto
  },
  text: {
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 20,
    letterSpacing: 0.5,
  }
});
