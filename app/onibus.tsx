import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions, 
  Platform 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Onibus() {

  const router = useRouter();
  // Lista de ônibus baseada no seu Figma
  const linhas = [
    { id: '406', numero: '406' },
    { id: '512', numero: '512' },
    { id: '607', numero: '607' },
    { id: '1002', numero: '1002' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* 1. FUNDO AZUL INFINITO NO TOPO */}
      <View style={styles.blueHeaderBleed} />

      {/* 2. CONTEÚDO DO CABEÇALHO */}
      <View style={styles.headerContent}>
        <View style={styles.headerTopRow}>
          <View>
            <Text style={styles.headerTitle}>PRÓXIMOS</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-sharp" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 3. CORPO DA TELA (BRANCO) */}
      <ScrollView 
        style={styles.body} 
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Barra Estática LINHAS */}
        <View style={styles.staticLabelRow}>
          <Text style={styles.staticLabelText}>LINHAS</Text>
          <Ionicons name="bus" size={24} color="#000" />
        </View>

        {/* Lista de Ônibus */}
        {linhas.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.busButton}
            activeOpacity={0.7}
            onPress={() => router.push(`/onibus/${item.numero}` as any)}
          >
            <Text style={styles.busButtonText}>ONIBUS  {item.numero}</Text>
            <Ionicons name="bus" size={24} color="#000" />
          </TouchableOpacity>
        ))}

        {/* Barra de Progresso/Status no final */}
        <View style={styles.progressBarContainer}>
           <View style={styles.progressBarFill} />
        </View>
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  blueHeaderBleed: {
    position: 'absolute',
    top: -100, // Sangra para cima da Dynamic Island
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.30 + 100,
    backgroundColor: '#0000FF',
    zIndex: 0,
  },
  headerContent: {
    height: SCREEN_HEIGHT * 0.22,
    justifyContent: 'flex-end',
    paddingHorizontal: 25,
    paddingBottom: 25,
    zIndex: 1,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '900',
    fontFamily: Platform.OS === 'ios' ? 'Arial Rounded MT Bold' : 'sans-serif-condensed',
    letterSpacing: 2,
  },
  headerSubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: -5,
    opacity: 0.9,
  },
  settingsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 12,
  },
  body: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    zIndex: 2,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 40,
  },
  staticLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 20,
  },
  staticLabelText: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 4,
    color: '#000',
  },
  busButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F8F8', // Um cinza bem clarinho
    height: 70,
    borderRadius: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    
    // Sombras do Figma
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  busButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    letterSpacing: 1.5,
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#E0EEFF',
    borderRadius: 5,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '45%', // Simulação de progresso
    height: '100%',
    backgroundColor: '#00A3FF',
  },
});