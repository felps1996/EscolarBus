import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Mock de dados simulando o que viria integrado com a API
const PARADAS_ONIBUS = [
  {
    id: '1',
    ponto: 'Ponto: Parque Shopping Maceió',
    status: 'Status: Em trânsito',
    horario: '11:10 AM',
  },
  {
    id: '2',
    ponto: 'Ponto: UNIT - Cruz das Almas',
    status: 'Status: Próxima Parada',
    horario: '11:35 AM',
  },
];

export default function HorariosBusScreen() {
  const router = useRouter();

  const handleOpenMap = () => {
    // Redireciona para a tela do mapa passando os parâmetros de rota do OSRM
    router.push({
      pathname: '/mapa',
      params: { 
        busId: '512',
        // Coordenadas de exemplo: Parque Shopping até a UNIT
        originLat: '-9.6419',
        originLng: '-35.7001',
        destLat: '-9.6425',
        destLng: '-35.7022'
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 🟦 HEADER AZUL COM "HORÁRIOS" */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>HORÁRIOS</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-sharp" size={24} color="#0026FF" />
        </TouchableOpacity>
      </View>

      {/* 🚌 INDICADOR DO ÔNIBUS ATUAL */}
      <View style={styles.busIndicatorContainer}>
        <View style={styles.busCard}>
          <Text style={styles.busText}>ONIBUS 512</Text>
          <FontAwesome5 name="bus" size={22} color="black" />
        </View>
      </View>

      {/* 📄 CARD PRINCIPAL DE PRÓXIMOS */}
      <View style={styles.mainCard}>
        <Text style={styles.mainCardTitle}>Próximo</Text>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
          {PARADAS_ONIBUS.map((item) => (
            <View key={item.id} style={styles.stopCard}>
              <View style={styles.pontoBadge}>
                <Text style={styles.pontoText}>{item.ponto}</Text>
              </View>
              <Text style={styles.statusText}>{item.status}</Text>
              <View style={styles.timeBadge}>
                <Text style={styles.timeText}>{item.horario}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* 🔘 BOTÕES FLUTUANTES DEAÇÃO (VOLTAR E MAPA) */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.circleButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleButton} onPress={handleOpenMap}>
            <Ionicons name="map-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ∙∙ PAGINAÇÃO INFERIOR */}
      <View style={styles.paginationContainer}>
        <View style={[styles.dot, styles.dotInactive]} />
        <View style={[styles.dot, styles.dotActive]} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#0026FF',
    height: 140,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  settingsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 14,
  },
  busIndicatorContainer: {
    paddingHorizontal: 24,
    marginTop: -25,
    zIndex: 10,
  },
  busCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  busText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  mainCard: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 35,
    padding: 24,
    paddingBottom: 16,
  },
  mainCardTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  scrollContainer: {
    flex: 1,
  },
  stopCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
  },
  pontoBadge: {
    backgroundColor: '#C5D4EB',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginBottom: 8,
  },
  pontoText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
  },
  statusText: {
    fontSize: 15,
    color: '#000000',
    marginVertical: 4,
    paddingLeft: 4,
  },
  timeBadge: {
    backgroundColor: '#FFF9A6',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 6,
  },
  timeText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  circleButton: {
    backgroundColor: '#FFFFFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#000000',
  },
  dotInactive: {
    backgroundColor: '#CCCCCC',
  },
});