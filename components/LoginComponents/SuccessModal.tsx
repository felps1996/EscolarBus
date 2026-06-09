import React from 'react';
import { Modal, View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
}

export function SuccessModal({ visible, onClose }: SuccessModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          {/* O BlurView cria o efeito de desfoque no fundo */}
          <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
          
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark" size={50} color="#4CAF50" />
            </View>
            
            <Text style={styles.text}>CADASTRO REALIZADO!</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 250,
    height: 250,
    backgroundColor: 'rgba(30, 30, 30, 0.2)', // Cinza escuro semi-transparente
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // Sombra do card
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#20d326c0',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1.2,
  },
});