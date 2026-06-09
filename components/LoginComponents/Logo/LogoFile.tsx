import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Padrão no Expo, se usar CLI avise!

export function Logo() {
  return (
    <View style={styles.container}>
      {/* Ícone de ônibus como marca d'água ao fundo */}
      <View style={styles.iconBackground}>
        <Ionicons name="bus" size={140} color="rgba(255, 255, 255, 0.04)" />
      </View>
      
      {/* Texto da Logo */}
      <View style={styles.textContainer}>
        <Text style={styles.textWhite}>ESCOLAR</Text>
        <Text style={styles.textYellow}>BUS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
    width: '100%',
    marginVertical: 40,
  },
  iconBackground: {
    position: 'absolute',
    zIndex: 1,
  },
  textContainer: {
    flexDirection: 'row',
    zIndex: 2,
  },
  textWhite: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  textYellow: {
    color: '#FFD600', // Amarelo característico do design
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});