import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { API_URL } from '../services/api';
import { Alert } from 'react-native';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Logo } from '../components/LoginComponents/Logo/LogoFile';
import { Input } from '../components/LoginComponents/input/LoginInput';
import { Button } from '../components/LoginComponents/button/ButtonLogin';

// Altura total real do display
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function Login() {
  const router = useRouter();

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  // 1. FUNÇÃO HANDLELOGIN LIMPA (Sem repetições)
  const handleLogin = async () => {
    if (!usuario || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha }),
      });

      const data = await response.json();

      if (response.status === 200) {
        Alert.alert('Sucesso', `Bem-vindo, ${data.user.usuario}!`);
        router.replace({
        pathname: '/home',
        params: { username: data.user.usuario }
  });
      } else {
        Alert.alert('Erro de Autenticação', data.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <LinearGradient
      colors={['#0000FF', '#080B1A']}
      style={styles.gradientContainer} 
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={false} 
        >
          <Logo />

          <View style={styles.formCard}>
            <Input 
              label="USUÁRIO" 
              value={usuario}
              onChangeText={setUsuario}
              placeholder="Digite seu usuário"
            />
            
            <Input 
              label="SENHA" 
              value={senha}
              onChangeText={setSenha}
              isPassword
              placeholder="Digite sua senha"
            />
          </View>

          <TouchableOpacity 
            style={styles.forgotPasswordButton}
            onPress={() => router.push('/register')} 
          >
            <Text style={styles.forgotPasswordText}>Esqueci a senha</Text>
          </TouchableOpacity>

          {/* 2. AJUSTE AQUI: Chamando a função diretamente sem chaves extras */}
          <Button 
            onPress={handleLogin}
            title="ENTRAR" 
            variant="primary" 
            style={styles.enterButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: SCREEN_HEIGHT,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: Platform.OS === 'ios' ? 60 : 40, 
    paddingBottom: 40,
  },
  formCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-start',
    marginTop: 16,
    marginLeft: 10,
  },
  forgotPasswordText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'monospace',
  },
  enterButton: {
    backgroundColor: '#2E354F',
    marginTop: 40,
    height: 64,
    borderRadius: 32,
  },
});

