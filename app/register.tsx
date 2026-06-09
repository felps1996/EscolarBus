import React, { useState } from 'react';
import { Alert } from 'react-native';
import { API_URL } from '../services/api';
import { 
  StyleSheet, 
  View, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Logo } from '../components/LoginComponents/Logo/LogoFile';
import { Input } from '../components/LoginComponents/input/LoginInput';
import { Button } from '../components/LoginComponents/button/ButtonLogin';
import { SuccessModal } from '../components/LoginComponents/SuccessModal';

// Usamos 'screen' em vez de 'window' para pegar a dimensão bruta do hardware
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('screen');

export default function Register() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const handleCadastro = async () => {
    // Substitua pelo IP da sua máquina na rede local
    const SEU_IP_LOCAL = "10.220.30.224"; 

    try {
      const response = await fetch(`${API_URL}/cadastro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: usuario,
          senha: senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Se a API retornou 201 (Sucesso), abre o seu modal cinza do Figma!
        setModalVisible(true);
      } else {
        // Se deu erro (usuário duplicado, etc), exibe o alerta
        Alert.alert("Erro no cadastro", data.error || "Algo deu errado.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro de Conexão", "Não foi possível conectar ao servidor backend.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* A BALA DE PRATA: Este bloco azul ignora regras e vaza para fora do topo da tela */}
      <View style={styles.blueBleedOut} />

      {/* Cabeçalho onde a Logo vai ficar (flutuando acima do bloco azul) */}
      <View style={styles.headerContent}>
        <Logo />
      </View>

      {/* Corpo branco que cobre o restante da tela para baixo */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.whiteBody}>
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={styles.formCard}>
              <Input 
                label="Usuário" 
                variant="light"
                value={usuario}
                onChangeText={setUsuario}
                placeholder="Digite o seu utilizador"
              />
              
              <Input 
                label="Senha" 
                variant="light"
                value={senha}
                onChangeText={setSenha}
                isPassword
                placeholder="Digite a sua senha"
              />
            </View>
          <TouchableOpacity> 
            <Button 
              title="CADASTRAR" 
              variant="secondary"
              onPress={handleCadastro}
              style={styles.registerButton}
            />
            </TouchableOpacity> 

            <SuccessModal 
                visible={modalVisible} 
                onClose={() => setModalVisible(false)} 
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // O fundo principal agora é branco
  },
  // O TRUQUE:
  blueBleedOut: {
    position: 'absolute',
    top: -150, // Puxa o bloco 150 pixels para FORA do limite superior da tela. Cobre qualquer buraco!
    left: 0,
    right: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.35 + 150, // Aumentamos a altura para compensar o que foi puxado para cima
    backgroundColor: '#0000FF',
    zIndex: 0,
  },
  headerContent: {
    height: SCREEN_HEIGHT * 0.18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 10 : 10, // Empurra a logo para ficar visível abaixo do relógio
    zIndex: 1,
  },
  keyboardView: {
    flex: 1,
    zIndex: 2,
  },
  whiteBody: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 35,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    backgroundColor: '#FFFFFF',
  },
  formCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 6,
    marginBottom: 35,
  },
  registerButton: {
    backgroundColor: '#FFFFFF',
    height: 60,
    borderRadius: 30,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 5,
  },
});