import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// IMPORTAÇÕES DO FIREBASE CLIENT
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { Logo } from '../components/LoginComponents/Logo/LogoFile';
import { Input } from '../components/LoginComponents/input/LoginInput';
import { Button } from '../components/LoginComponents/button/ButtonLogin';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    setCarregando(true);

    try {
      // 1. Autenticação direta com o Firebase Auth Client SDK
      const userCredential = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), senha);
      const user = userCredential.user;

      // 2. Validação de segurança: Bloqueia o acesso se o e-mail não foi verificado
      if (!user.emailVerified) {
        Alert.alert(
          'E-mail não verificado', 
          'Por favor, acesse sua caixa de entrada e confirme seu e-mail antes de efetuar o login no sistema.'
        );
        setCarregando(false);
        return;
      }

      // 3. Sucesso: Redireciona para a Home passando o e-mail ou o displayName do usuário
      Alert.alert('Sucesso', 'Bem-vindo ao EscolarBus!');
      router.replace({
        pathname: '/home',
        params: { username: user.displayName || user.email }
      });

    } catch (error: any) {
      console.error(error);
      
      // Tratamento dos códigos de erro nativos do Firebase Auth
      if (
        error.code === 'auth/invalid-credential' || 
        error.code === 'auth/user-not-found' || 
        error.code === 'auth/wrong-password'
      ) {
        Alert.alert('Erro de Autenticação', 'E-mail ou senha incorretos.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Erro', 'O formato do e-mail digitado é inválido.');
      } else if (error.code === 'auth/user-disabled') {
        Alert.alert('Erro', 'Esta conta foi desativada por um administrador.');
      } else {
        Alert.alert('Erro', 'Não foi possível conectar ao serviço de autenticação.');
      }
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

          <View style={styles.formCard}>
            <Input 
              label="E-MAIL" 
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <Input 
              label="SENHA" 
              value={senha}
              onChangeText={setSenha}
              isPassword
              placeholder="Digite sua senha"
            />
          </View>

          {/* Links organizados lado a lado nas extremidades da tela */}
          <View style={styles.linksContainer}>
            <TouchableOpacity 
              style={styles.forgotPasswordButton}
              onPress={() => router.push('/register')} 
            >
              <Text style={styles.forgotPasswordText}>Esqueci a senha</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.signUpButton}
              onPress={() => router.push('/signup')} 
            >
              <Text style={styles.signUpText}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>

          <Button 
            onPress={handleLogin}
            title={carregando ? "CARREGANDO..." : "ENTRAR"} 
            variant="primary" 
            style={styles.enterButton}
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
  formCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 16,
    paddingHorizontal: 10,
  },
  forgotPasswordButton: {},
  forgotPasswordText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'monospace',
  },
  signUpButton: {},
  signUpText: {
    color: '#007AFF', 
    fontSize: 16,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  enterButton: {
    backgroundColor: '#2E354F',
    marginTop: 40,
    height: 64,
    borderRadius: 32,
  },
});