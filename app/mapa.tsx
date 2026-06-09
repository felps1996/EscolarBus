import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// Substitua pelo link da sua API do Render (sem a barra no final)
const API_URL = 'https://seu-backend-no-render.onrender.com'; 
// ID de teste do usuário que será o motorista (pegue um ID lá do seu Firestore)
const MOTORISTA_ID = 'Qh01d4zbRC64QJrqV1ad';

export default function Mapa() {
  const mapRef = useRef<MapView>(null);
  
  // Posição inicial centralizada em Maceió/UFAL
  const [localizacao, setLocalizacao] = useState({
    latitude: -9.6658,
    longitude: -35.7350,
  });

  const [simulando, setSimulando] = useState(false);

  // 1. Função para buscar a localização real do banco de dados (Visão do Aluno)
  const buscarLocalizacaoBanco = async () => {
    try {
      const response = await fetch(`${API_URL}/usuarios/${MOTORISTA_ID}/localizacao`);
      if (response.ok) {
        const data = await response.json();
        setLocalizacao({
          latitude: data.latitude,
          longitude: data.longitude,
        });
      }
    } catch (error) {
      console.log('Erro ao buscar localização:', error);
    }
  };

  // 2. Loop para o Aluno ficar atualizando o mapa em tempo real
  useEffect(() => {
    buscarLocalizacaoBanco(); // Busca a primeira vez
    
    const interval = setInterval(() => {
      buscarLocalizacaoBanco();
    }, 3000); // Atualiza a cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  // 3. Função para simular o ônibus andando (Envia dados para a API)
  useEffect(() => {
    let simularInterval: number;

    if (simulando) {
      let novaLat = localizacao.latitude;
      let novaLng = localizacao.longitude;

      simularInterval = setInterval(async () => {
        // Incrementa um valor pequeno para andar em linha diagonal
        novaLat += 0.0002;
        novaLng += 0.0002;

        setLocalizacao({ latitude: novaLat, longitude: novaLng });

        // Envia a nova posição para a API salvar no Firestore
        try {
          await fetch(`${API_URL}/usuarios/localizacao`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              idUsuario: MOTORISTA_ID,
              latitude: novaLat,
              longitude: novaLng
            })
          });
        } catch (error) {
          console.log('Erro ao enviar simulação:', error);
        }
      }, 2000); // Move o ônibus a cada 2 segundos
    }

    return () => clearInterval(simularInterval);
  }, [simulando]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: localizacao.latitude,
          longitude: localizacao.longitude,
          latitudeDelta: 0.01, // Zoom do mapa
          longitudeDelta: 0.01,
        }}
        region={{
          latitude: localizacao.latitude,
          longitude: localizacao.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Marcador do Ônibus na Tela */}
        <Marker
          coordinate={{
            latitude: localizacao.latitude,
            longitude: localizacao.longitude,
          }}
          title="EscolarBus"
          description="Ônibus em movimento"
          pinColor="#F3123C" // Cor em destaque
        />
      </MapView>

      {/* Botão flutuante para ativar a simulação */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, simulando ? styles.btnAtivo : styles.btnInativo]}
          onPress={() => setSimulando(!simulando)}
        >
          <Text style={styles.buttonText}>
            {simulando ? '🛑 Parar Ônibus' : '🚌 Iniciar Movimento do Ônibus'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  btnInativo: {
    backgroundColor: '#007AFF',
  },
  btnAtivo: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});