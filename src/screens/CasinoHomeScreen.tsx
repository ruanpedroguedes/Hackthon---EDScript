import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Pressable,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const GRID_COLS = 3;
const SPACING = 12;
const PADDING_HORIZONTAL = 16;
const CAROUSEL_ITEM_WIDTH = width * 0.42;
const GRID_ITEM_WIDTH = (width - PADDING_HORIZONTAL * 2 - SPACING * (GRID_COLS - 1)) / GRID_COLS;

const ICONS = {
  todos: require('../../assets/icons/slotmachine.png'),
  favoritos: require('../../assets/icons/estrela.png'),
  novo: require('../../assets/icons/new.png'),
  fastGames: require('../../assets/icons/raio3d.png'),
  instantGames: require('../../assets/icons/cronometro.png'),
  roleta: require('../../assets/icons/roleta3d.png'),
  bingo: require('../../assets/icons/bingo.png'),
  blackjack: require('../../assets/icons/cartas.png'),
  fortune: require('../../assets/icons/saco-de-dinheiro.png'),
  crash: require('../../assets/icons/fogete.png'),
  jogosExclusivos: require('../../assets/icons/dinheiro.png'),
  torneios: require('../../assets/icons/trofeu.png'),
  lottery: require('../../assets/icons/bola8.png'),
};

const CATEGORIES = [
  { id: 'todos', label: 'Todos os Jogos', icon: ICONS.todos },
  { id: 'favoritos', label: 'Favoritos', icon: ICONS.favoritos },
  { id: 'exclusivos', label: 'Jogos Exclusivos', icon: ICONS.jogosExclusivos },
  { id: 'torneios', label: 'Torneios', icon: ICONS.torneios },
  { id: 'novo', label: 'Novo', icon: ICONS.novo },
  { id: 'lottery', label: 'Lotery', icon: ICONS.lottery },
  { id: 'fast', label: 'Fast Games', icon: ICONS.fastGames },
  { id: 'instant', label: 'Instant Games', icon: ICONS.instantGames },
  { id: 'roleta', label: 'Roleta', icon: ICONS.roleta },
  { id: 'blackjack', label: 'Black Jack', icon: ICONS.blackjack },
  { id: 'fortune', label: 'Fortune', icon: ICONS.fortune },
  { id: 'crash', label: 'Crash Games', icon: ICONS.crash },
  { id: 'bingo', label: 'Video Bingo', icon: ICONS.bingo },
];

const CAROUSEL_IMAGES = [
  require('../../assets/cassino/imagem1.png'),
  require('../../assets/cassino/imagem2.png'),
  require('../../assets/cassino/imagem3.png'),
  require('../../assets/cassino/imagem4.png'),
  require('../../assets/cassino/imagem5.png'),
  require('../../assets/cassino/imagem6.png'),
  require('../../assets/cassino/imagem7.png'),
  require('../../assets/cassino/imagem8.png'),
  require('../../assets/cassino/imagem9.png'),
];

const GAME_IMAGES = [
  require('../../assets/cassino/download 64.png'),
  require('../../assets/cassino/download 65.png'),
  require('../../assets/cassino/download 66.png'),
  require('../../assets/cassino/download 67.png'),
  require('../../assets/cassino/download 68.png'),
  require('../../assets/cassino/download 69.png'),
  require('../../assets/cassino/download 70.png'),
  require('../../assets/cassino/download 71.png'),
  require('../../assets/cassino/download 72.png'),
  require('../../assets/cassino/download 73.png'),
  require('../../assets/cassino/download 74.png'),
  require('../../assets/cassino/download 75.png'),
  require('../../assets/cassino/download 76.png'),
  require('../../assets/cassino/download 77.png'),
  require('../../assets/cassino/download 78.png'),
  require('../../assets/cassino/download 79.png'),
  require('../../assets/cassino/download 80.png'),
  require('../../assets/cassino/download 81.png'),
  require('../../assets/cassino/download 82.png'),
  require('../../assets/cassino/download 83.png'),
  require('../../assets/cassino/download 84.png'),
  require('../../assets/cassino/download 85.png'),
  require('../../assets/cassino/download 86.png'),
  require('../../assets/cassino/download 87.png'),
  require('../../assets/cassino/download 88.png'),
  require('../../assets/cassino/download 89.png'),
  require('../../assets/cassino/download 90.png'),
  require('../../assets/cassino/download 91.png'),
  require('../../assets/cassino/download 92.png'),
  require('../../assets/cassino/download 93.png'),
];

export function CasinoHomeScreen() {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [activeTab, setActiveTab] = useState('Todos os Jogos');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* HEADER */}
          <View style={styles.header}>
            <Pressable style={styles.menuButton}>
              <Feather name="menu" size={28} color="white" />
            </Pressable>
            <Image 
              source={require('../../assets/logos/logo_eds_deitada.png')} 
              style={styles.logo} 
              resizeMode="contain" 
            />
            <View style={{ width: 28 }} />
          </View>

          {/* SEARCH BAR */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Feather name="search" size={20} color="#9CA3AF" />
              <TextInput
                style={styles.searchInput}
                placeholder="Pesquisa"
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* CATEGORY NAVIGATION (HORIZONTAL SCROLL) */}
          <View style={styles.categoriesContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.categoriesContent}
            >
              {CATEGORIES.map(cat => {
                const isActive = activeCategory === cat.id;
                return (
                  <Pressable key={cat.id} onPress={() => setActiveCategory(cat.id)}>
                    <LinearGradient
                      colors={isActive ? ['#0B8226', '#0B8226'] : ['#1D2146', '#0D1431']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={[
                        styles.categoryPill,
                        isActive && styles.categoryPillActive
                      ]}
                    >
                      <Image source={cat.icon} style={styles.categoryIcon} resizeMode="contain" />
                      <Text style={[styles.categoryLabel, isActive && styles.categoryLabelActive]}>
                        {cat.label}
                      </Text>
                    </LinearGradient>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          {/* FEATURED SECTION */}
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Cassino em Destaque</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.carouselContent}
              snapToInterval={CAROUSEL_ITEM_WIDTH + SPACING}
              decelerationRate="fast"
            >
              {CAROUSEL_IMAGES.map((img, index) => (
                <View key={index} style={styles.carouselCard}>
                  <Image source={img} style={styles.carouselImage} resizeMode="cover" />
                  <Pressable style={styles.carouselButton}>
                    <Text style={styles.carouselButtonText}>JOGAR</Text>
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* GAMES SECTION */}
          <View style={styles.gamesSection}>
            <View style={styles.tabsContainer}>
              {['Todos os Jogos', 'Recentes', 'Novidades'].map((tab, idx) => (
                <Pressable key={tab} onPress={() => setActiveTab(tab)} style={styles.tabItem}>
                  <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                    {tab} {idx === 0 ? '🎰' : idx === 1 ? '🕒' : '🆕'}
                  </Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.gridContainer}>
              {GAME_IMAGES.map((img, idx) => (
                <Pressable key={idx} style={styles.gridItem}>
                  <Image source={img} style={styles.gridImage} resizeMode="cover" />
                </Pressable>
              ))}
            </View>

            {/* LOAD MORE */}
            <Pressable style={styles.loadMoreButton}>
              <Text style={styles.loadMoreText}>Mostrar mais Jogos</Text>
              <Text style={styles.loadMoreSubText}>Mostrar 30 de 2836 jogos</Text>
            </Pressable>
          </View>

        </ScrollView>



      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#090B22',
  },
  container: {
    flex: 1,
    backgroundColor: '#090B22',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingTop: 12,
    paddingBottom: 8,
  },
  menuButton: {
    padding: 4,
  },
  logo: {
    width: 140,
    height: 32,
  },
  searchContainer: {
    paddingHorizontal: PADDING_HORIZONTAL,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1D2146',
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#2B325A',
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    marginLeft: 12,
    fontSize: 14,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesContent: {
    paddingHorizontal: PADDING_HORIZONTAL,
    gap: 12,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#2B325A',
  },
  categoryPillActive: {
    borderColor: '#0B8226',
  },
  categoryIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  categoryLabel: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '600',
  },
  categoryLabelActive: {
    color: '#FFF',
  },
  featuredSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: PADDING_HORIZONTAL,
    marginBottom: 12,
  },
  carouselContent: {
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  carouselCard: {
    width: CAROUSEL_ITEM_WIDTH,
    height: CAROUSEL_ITEM_WIDTH * 0.6,
    marginRight: SPACING,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1D2146',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  carouselButton: {
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    backgroundColor: '#0000FF', // Generic bright blue for JOGAR button
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  carouselButtonText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  gamesSection: {
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  tabItem: {
    paddingVertical: 6,
  },
  tabText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFF',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING,
  },
  gridItem: {
    width: GRID_ITEM_WIDTH,
    height: GRID_ITEM_WIDTH,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1D2146',
    marginBottom: 8,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  loadMoreButton: {
    backgroundColor: '#0B8226',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  loadMoreText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadMoreSubText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    marginTop: 4,
  },

});
