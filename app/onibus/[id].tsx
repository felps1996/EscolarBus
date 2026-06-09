import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Dimensions, 
  Platform,
  ScrollView,
  Modal
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

// 1. URL da sua API no Render (Altere para a sua URL oficial)
const API_URL = 'https://escolarbus-api.onrender.com'; 

export default function Horarios() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Estado para controlar a exibição do mapa por cima da interface
  const [isMapVisible, setIsMapVisible] = useState(false);

  // Coordenadas iniciais de simulação (Região de Maceió)
  const [region, setRegion] = useState({
    latitude: -9.571307, 
    longitude: -35.753173,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  // Estado que guarda a posição do ônibus (agora alimentado pela API)
  const [busLocation, setBusLocation] = useState({
    latitude: -9.568500,
    longitude: -35.750000,
  });

  // ================= INTEGRANTE DA API DE SIMULAÇÃO =================
  useEffect(() => {
    let interval: number;

    // Função que busca a posição atual calculada pelo backend
    const buscarPosicaoEstrategica = async () => {
      try {
        const response = await fetch(`${API_URL}/api/onibus/posicao`);
        if (response.ok) {
          const data = await response.json();
          setBusLocation({
            latitude: data.latitude,
            longitude: data.longitude
          });
        }
      } catch (error) {
        console.log('Erro ao buscar coordenadas do backend:', error);
      }
    };

    // Só inicia a busca repetitiva se o modal do mapa estiver aberto
    if (isMapVisible) {
      buscarPosicaoEstrategica(); // Busca imediata ao abrir
      
      interval = window.setInterval(() => {
        buscarPosicaoEstrategica();
      }, 1500); // Atualiza o marcador a cada 1.5 segundos
    }

    // Limpa o timer da memória ao fechar o mapa para não vazar processamento
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMapVisible]);

  const pontosInfo = [
    { id: '1', pontoName: 'Ponto: Av. Menino Marcelo VIII', status: 'Status: A caminho', horario: '09:50AM' },
    { id: '2', pontoName: 'Ponto: Lojas Americanas XI', status: 'Status: A caminho', horario: '10:25AM' }
  ];

  return (
    <View style={styles.container}>
      <StatusBar style={isMapVisible ? "dark" : "light"} />

      <View style={styles.blueHeaderBleed} />

      {/* CONTEÚDO DO CABEÇALHO */}
      <View style={styles.headerContent}>
        <View style={styles.headerTopRow}>
          <View>
            <Text style={styles.headerTitle}>HORÁRIOS</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-sharp" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* CORPO PRINCIPAL COM SCROLL */}
      <ScrollView 
        style={styles.body} 
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.busActiveCard}>
          <Text style={styles.busActiveText}>ONIBUS {id || '406'}</Text>
          <Ionicons name="bus" size={26} color="#000000" />
        </View>

        <View style={styles.mainInfoContainer}>
          <Text style={styles.sectionTitle}>Próximo</Text>

          {pontosInfo.map((ponto) => (
            <View key={ponto.id} style={styles.pontoCard}>
              <View style={styles.pontoBadgeHeader}>
                <Text style={styles.pontoBadgeText}>{ponto.pontoName}</Text>
              </View>
              <Text style={styles.statusText}>{ponto.status}</Text>
              <View style={styles.timeBadge}>
                <Text style={styles.timeText}>{ponto.horario}</Text>
              </View>
            </View>
          ))}

          {/* BOTÕES DE AÇÃO INFERIORES */}
          <View style={styles.actionsRow}>
            <TouchableOpacity 
              style={styles.roundButton} 
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={24} color="#000000" />
            </TouchableOpacity>

            {/* BOTÃO DO MAPA */}
            <TouchableOpacity 
              style={styles.roundButton}
              activeOpacity={0.7}
              onPress={() => setIsMapVisible(true)} // Ativa o modal e dispara o useEffect
            >
              <Ionicons name="map-outline" size={24} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.paginationContainer}>
          <View style={[styles.dot, styles.dotInactive]} />
          <View style={[styles.dot, styles.dotActive]} />
        </View>
      </ScrollView>

      {/* ================= MODAL INTERATIVO DO GPS ================= */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMapVisible}
        onRequestClose={() => setIsMapVisible(false)}
      >
        <View style={[StyleSheet.absoluteFillObject, styles.modalOverlay]}>
          <View style={styles.mapContainerCard}>
            
            <MapView
              provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
              style={[StyleSheet.absoluteFillObject, styles.map]}
              initialRegion={region}
              showsUserLocation={true}
              showsMyLocationButton={false}
            >
              {/* Marcador do Ônibus - Coordenadas linkadas dinamicamente à API */}
              <Marker
                coordinate={busLocation}
                title={`Ônibus ${id || '406'}`}
                description="Acompanhando em tempo real"
              >
                <View style={styles.busMarkerContainer}>
                  <Ionicons name="bus" size={20} color="#FFFFFF" />
                </View>
              </Marker>
            </MapView>

            {/* Botão para fechar o Mapa */}
            <TouchableOpacity 
              style={styles.closeMapButton}
              activeOpacity={0.8}
              onPress={() => setIsMapVisible(false)}
            >
              <Ionicons name="close" size={26} color="#000000" />
              <Text style={styles.closeMapText}>Fechar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

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
    top: -100,
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
    paddingBottom: 30,
  },
  busActiveCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 70,
    borderRadius: 35,
    paddingHorizontal: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  busActiveText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 1.5,
  },
  mainInfoContainer: {
    backgroundColor: '#F3F3F3',
    borderRadius: 35,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
    paddingLeft: 5,
  },
  pontoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 16,
    marginBottom: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },
  pontoBadgeHeader: {
    backgroundColor: '#BFD3ED',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 15,
    marginBottom: 12,
  },
  pontoBadgeText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000000',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 12,
    paddingLeft: 4,
  },
  timeBadge: {
    backgroundColor: '#FFF59D',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 5,
  },
  roundButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: '#000000',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotInactive: {
    backgroundColor: '#C0C0C0',
  },
  modalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, 
  },
  mapContainerCard: {
    width: SCREEN_WIDTH * 0.90,
    height: SCREEN_HEIGHT * 0.75,
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    overflow: 'hidden', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative', 
  },
  map: {},
  busMarkerContainer: {
    backgroundColor: '#0000FF',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  closeMapButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1001, 
  },
  closeMapText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});