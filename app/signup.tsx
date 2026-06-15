import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// CORREÇÃO 1: Importar a sua instância configurada do firebaseConfig, e remover o 'Auth' genérico
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

import { Logo } from '../components/LoginComponents/Logo/LogoFile';
import { Input } from '../components/LoginComponents/input/LoginInput';
import { Button } from '../components/LoginComponents/button/ButtonLogin';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleCadastro = async () => {
    if (!email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas digitadas não coincidem.');
      return;
    }

    setCarregando(true);

    try {
      // CORREÇÃO 2: Passar a instância 'auth' minúscula como primeiro parâmetro
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), senha);
      
      // 2. Envia o e-mail de verificação nativo do Firebase
      await sendEmailVerification(userCredential.user);

      Alert.alert(
        'Cadastro Realizado!', 
        'Um e-mail de verificação foi enviado. Por favor, cheque sua caixa de entrada antes de logar.',
        [{ text: 'Ir para o Login', onPress: () => router.replace('/') }]
      );
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Erro', 'Este e-mail já está cadastrado.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Erro', 'Formato de e-mail inválido.');
      } else {
        Alert.alert('Erro', 'Não foi possível concluir o cadastro.');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <LinearGradient colors={['#0000FF', '#080B1A']} style={styles.gradientContainer}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} bounces={false}>
          <Logo />

          <View style={styles.headerTextContainer}>
            <Text style={styles.tituloSecundario}>CRIAR CONTA</Text>
          </View>

          <View style={styles.formCard}>
            <Input 
              label="E-MAIL" 
              value={email}
              onChangeText={setEmail}
              placeholder="Seu e-mail institucional"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input 
              label="SENHA" 
              value={senha}
              onChangeText={setSenha}
              isPassword
              placeholder="Escolha uma senha forte"
            />
            <Input 
              label="CONFIRMAR SENHA" 
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              isPassword
              placeholder="Digite a senha novamente"
            />
          </View>

          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backText}>← Já tenho conta</Text>
          </TouchableOpacity>

          <Button 
            onPress={handleCadastro}
            title={carregando ? "CADASTRANDO..." : "REGISTRAR"} 
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
  gradientContainer: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, height: SCREEN_HEIGHT },
  keyboardView: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 30, paddingTop: Platform.OS === 'ios' ? 60 : 40, paddingBottom: 40 },
  headerTextContainer: { alignItems: 'center', marginBottom: 20 },
  tituloSecundario: { color: '#FFFFFF', fontSize: 18, fontFamily: 'monospace', fontWeight: 'bold', letterSpacing: 2 },
  formCard: { width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.06)', borderRadius: 32, padding: 24, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.05)' },
  backButton: { alignSelf: 'flex-start', marginTop: 16, marginLeft: 10 },
  backText: { color: '#FFFFFF', fontSize: 14, fontFamily: 'monospace' },
  actionButton: { backgroundColor: '#2E354F', marginTop: 40, height: 64, borderRadius: 32 }
});