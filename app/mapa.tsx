import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import MapView, { Polyline, Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// 🧮 FUNÇÃO MATEMÁTICA PURA PARA DECODIFICAR A GEOMETRIA DO OSRM
// (Dispensa o uso de qualquer biblioteca externa como mapbox)
function decodePolyline(encoded: string) {
  let points = [];
  let index = 0, len = encoded.length;
  let lat = 0, lng = 0;

  while (index < len) {
    let b, shift = 0, result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lng += dlng;

    points.push({
      latitude: (lat / 1E5),
      longitude: (lng / 1E5)
    });
  }
  return points;
}

export default function MapaScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number }[]>([]);
  const [loading, setLoading] = useState(true);

  // Coordenadas da UNIT e do Parque Shopping
  const originLat = parseFloat((params.originLat as string) || '-9.6419');
  const originLng = parseFloat((params.originLng as string) || '-35.7001');
  const destLat = parseFloat((params.destLat as string) || '-9.6425');
  const destLng = parseFloat((params.destLng as string) || '-35.7022');

  useEffect(() => {
    async function fetchRoute() {
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${originLng},${originLat};${destLng},${destLat}?overview=full`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          // Decodifica a rota usando a função JS pura ali de cima
          const decodedCoords = decodePolyline(data.routes[0].geometry);
          setCoordinates(decodedCoords);
        }
      } catch (error) {
        console.error("Erro ao buscar rota OSRM:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRoute();
  }, [originLat, originLng, destLat, destLng]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0026FF" />
        <Text style={styles.loadingText}>Carregando o mapa das frotas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={{
          latitude: (originLat + destLat) / 2,
          longitude: (originLng + destLng) / 2,
          latitudeDelta: Math.abs(originLat - destLat) * 2 || 0.02,
          longitudeDelta: Math.abs(originLng - destLng) * 2 || 0.02,
        }}
      >
        {/* Marcador do Ônibus */}
        <Marker coordinate={{ latitude: originLat, longitude: originLng }} title="Ônibus 512">
          <View style={styles.busMarker}>
            <Ionicons name="bus" size={18} color="white" />
          </View>
        </Marker>

        {/* Marcador do Destino */}
        <Marker coordinate={{ latitude: destLat, longitude: destLng }} title="Parada Final" />
        
        {/* Desenha a linha da rota direto no mapa do Expo */}
        {coordinates.length > 0 && (
          <Polyline coordinates={coordinates} strokeWidth={5} strokeColor="#0026FF" />
        )}
      </MapView>

      {/* Botão de Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  map: { flex: 1 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F4F4' },
  loadingText: { marginTop: 12, fontSize: 16, color: '#333333', fontWeight: '500' },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#FFFFFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  busMarker: {
    backgroundColor: '#0026FF',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 5,
  }
});