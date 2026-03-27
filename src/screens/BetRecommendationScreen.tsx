import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Props {
  onBack?: () => void;
  visible?: boolean;
}

const BetRecommendationScreen = ({ onBack, visible = true }: Props) => {
  const handleClose = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>
              Quem aposta como você,{'\n'}apostou aqui também
            </Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>x</Text>
            </TouchableOpacity>
          </View>

          {/* Match Info */}
          <View style={styles.matchInfoContainer}>
            {/* Team 1 */}
            <View style={styles.teamContainer}>
              <Image
                source={require('../../assets/bandeiras/retrofc.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.teamName}>Retrô FC</Text>
            </View>

            {/* Center (Match status) */}
            <View style={styles.centerInfo}>
              <Text style={styles.liveText}>AO VIVO</Text>
              <Text style={styles.timeText}>9:51 2ºT</Text>
              <Text style={styles.scoreText}>0  X  0</Text>
            </View>

            {/* Team 2 */}
            <View style={styles.teamContainer}>
              <Image
                source={require('../../assets/bandeiras/salgueiro.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.teamName}>Salgueiro</Text>
            </View>
          </View>

          {/* Bet Options */}
          <View style={styles.betOptionsContainer}>
            <View style={styles.betColumn}>
              <Text style={styles.betLabel}>Casa</Text>
              <TouchableOpacity style={styles.betButton}>
                <Text style={styles.oddValue}>1.80</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.betColumn}>
              <Text style={styles.betLabel}>Empate</Text>
              <TouchableOpacity style={styles.betButton}>
                <Text style={styles.oddValue}>2.34</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.betColumn}>
              <Text style={styles.betLabel}>Fora</Text>
              <TouchableOpacity style={styles.betButton}>
                <Text style={styles.oddValue}>3.12</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: '#0A0A3A', // Dark background (slightly lighter than main)
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#EAEAEA', // Subtle white border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 24, // Space for the close button
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 24,
    height: 24,
    backgroundColor: '#2A2A2A',
    borderRadius: 6, // Slightly rounded, more rectangular based on some designs
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2, // Fine-tuning vertical alignment
    textAlign: 'center',
  },
  matchInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  teamContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  teamName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  centerInfo: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveText: {
    color: '#32CD32', // lime green
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  timeText: {
    color: '#32CD32', // lime green
    fontSize: 12,
    marginBottom: 6,
  },
  scoreText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  betOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  betColumn: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  betLabel: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  betButton: {
    backgroundColor: '#3949ab', // dark blue/purple
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  oddValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BetRecommendationScreen;
