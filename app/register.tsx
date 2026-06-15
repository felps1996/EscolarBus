import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { API_URL } from '../services/api'; // Ajuste o caminho relativo se necessário
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

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function RecuperarSenha() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleRecuperarSenha = async () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, digite seu e-mail.');
      return;
    }

    // Validação básica de formato de e-mail
    const emailValido = /\S+@\S+\.\S+/;
    if (!emailValido.test(email)) {
      Alert.alert('Erro', 'Insira um e-mail válido.');
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch(`${API_URL}/usuarios/esqueci-senha`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await response.json();

      if (response.status === 200) {
        Alert.alert(
          'Sucesso', 
          'Se o e-mail estiver cadastrado, as instruções de redefinição foram enviadas.',
          [{ text: 'Voltar ao Login', onPress: () => router.back() }]
        );
      } else {
        Alert.alert('Aviso', data.erro || 'Não foi possível processar o pedido.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    } finally {
      setCarregando(false);
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

          <View style={styles.headerTextContainer}>
            <Text style={styles.tituloSecundario}>RECUPERAR ACESSO</Text>
          </View>

          <View style={styles.formCard}>
            <Input 
              label="E-MAIL CADASTRADO" 
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu e-mail institucional"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity 
            style={styles.backToLoginButton}
            onPress={() => router.back()} 
          >
            <Text style={styles.backToLoginText}>← Voltar para o Login</Text>
          </TouchableOpacity>

          <Button 
            onPress={handleRecuperarSenha}
            title={carregando ? "ENVIANDO..." : "ENVIAR LINK"} 
            variant="primary" 
            style={styles.actionButton}
            disabled={carregando}
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
  headerTextContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  tituloSecundario: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  formCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  backToLoginButton: {
    alignSelf: 'flex-start',
    marginTop: 16,
    marginLeft: 10,
  },
  backToLoginText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'monospace',
  },
  actionButton: {
    backgroundColor: '#2E354F',
    marginTop: 40,
    height: 64,
    borderRadius: 32,
  },
});