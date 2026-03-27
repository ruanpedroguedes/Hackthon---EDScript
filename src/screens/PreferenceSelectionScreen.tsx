import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions, 
  StatusBar 
} from 'react-native';

const { width } = Dimensions.get('window');

interface Props {
  onCassinoAoVivo?: () => void;
  onEsportes?: () => void;
  onCassino?: () => void;
  onSair?: () => void;
}

const OptionCard = ({ label, icon, onPress, iconStyle }: any) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
    <View style={styles.cardIconContainer}>
       <Image source={icon} style={[styles.cardIcon, iconStyle]} resizeMode="contain" />
    </View>
    <Text style={styles.cardLabel}>{label}</Text>
  </TouchableOpacity>
);

const OptionCardCluster = ({ label, onPress }: any) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
    <View style={styles.clusterContainer}>
      <View style={styles.clusterRow}>
        <Image source={require('../../assets/soccer/volei.png')} style={styles.clusterIcon} resizeMode="contain" />
        <Image source={require('../../assets/soccer/handebol.png')} style={styles.clusterIcon} resizeMode="contain" />
      </View>
      <View style={styles.clusterRow}>
        <Image source={require('../../assets/soccer/beisebol.png')} style={styles.clusterIcon} resizeMode="contain" />
        <Image source={require('../../assets/soccer/basquete.png')} style={styles.clusterIcon} resizeMode="contain" />
      </View>
    </View>
    <Text style={styles.cardLabel}>{label}</Text>
  </TouchableOpacity>
);

export function PreferenceSelectionScreen({
  onCassinoAoVivo,
  onEsportes,
  onCassino,
  onSair,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#02023D" />
      
      {/* Header */}
      <View style={styles.header}>
        <Image 
          source={require('../../assets/logos/logo_eds_deitada.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Title Box */}
      <View style={styles.titleContainerWrapper}>
        <View style={styles.titleBox}>
          <Text style={styles.titleMain}>O QUE VOCÊ MAIS GOSTA DE APOSTAR?</Text>
          <Text style={styles.subtitle}>Escolha para personalizar sua experiência</Text>
        </View>
      </View>

      {/* Options Grid */}
      <View style={styles.gridContainer}>
        <View style={styles.gridRow}>
           <OptionCard 
             label="Cassino Ao Vivo" 
             icon={require('../../assets/soccer/cartas.png')}
             onPress={onCassinoAoVivo}
           />
           <OptionCardCluster
             label="Esportes"
             onPress={onEsportes}
           />
        </View>
        <View style={styles.gridRow}>
           <OptionCard 
             label="Cassino" 
             icon={require('../../assets/soccer/jackpot-machine.png')}
             onPress={onCassino}
           />
           <OptionCard 
             label="Sair" 
             icon={require('../../assets/soccer/logout.png')}
             onPress={onSair}
             iconStyle={{ width: 45, height: 45 }}
           />
        </View>
      </View>

      {/* Footer Support */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.supportButton}>
          <Text style={styles.supportText}>
            Possui alguma dúvida? Entre em contato com nosso suporte
          </Text>
          <Image 
            source={require('../../assets/icons/chat_homepreview.png')} 
            style={styles.supportIcon}
            resizeMode="contain" 
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02023D', 
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    width: 160,
    height: 40,
  },
  titleContainerWrapper: {
    alignItems: 'center',
    marginBottom: 30,
  },
  titleBox: {
    backgroundColor: 'rgba(0, 10, 80, 0.5)',
    borderWidth: 1.5,
    borderColor: '#0084FF', 
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#00D1FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  titleMain: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900', 
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  subtitle: {
    color: '#D1D1D1',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#03004F',
    borderRadius: 12,
    width: (width - 48) / 2, 
    aspectRatio: 1, 
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardIcon: {
    width: 55,
    height: 55,
  },
  cardLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  clusterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    width: 60,
  },
  clusterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 2,
  },
  clusterIcon: {
    width: 26,
    height: 26,
    marginHorizontal: 4,
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 30,
    alignItems: 'center',
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  supportText: {
    color: '#FFFFFF',
    fontSize: 12,
    textDecorationLine: 'underline',
    marginRight: 8,
  },
  supportIcon: {
    width: 18,
    height: 18,
  },
});
