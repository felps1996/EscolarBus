import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView
} from 'react-native';

export default function RecuperarSenha({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [carregando, setCarregando] = useState(false);

  const lidarComRecuperacao = async () => {
    if (!email.trim()) {
      Alert.alert('Campo Obrigatório', 'Por favor, digite o seu e-mail.');
      return;
    }

    // Validação simples de formato de e-mail
    const emailValido = /\S+@\S+\.\S+/;
    if (!emailValido.test(email)) {
      Alert.alert('E-mail Inválido', 'Por favor, insira um endereço de e-mail válido.');
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch('https://escolarbus-api.onrender.com/api/usuarios/esqueci-senha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        Alert.alert(
          'E-mail Enviado', 
          'Se o e-mail informado estiver cadastrado, você receberá as instruções para redefinir sua senha em instantes.',
          [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
        );
      } else {
        Alert.alert('Aviso', dados.erro || 'Não foi possível processar a solicitação no momento.');
      }
    } catch (error) {
      Alert.alert('Erro de Conexão', 'Não foi possível conectar ao servidor. Verifique sua internet.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.cardHeader}>
          <Text style={styles.emojiBus}>🚌</Text>
          <Text style={styles.titulo}>Recuperar Senha</Text>
          <Text style={styles.subtitulo}>
            Digite o e-mail associado à sua conta do EscolarBus para receber um link de redefinição de segurança.
          </Text>
        </View>

        <View style={styles.formulario}>
          <Text style={styles.label}>E-mail Institucional ou Pessoal</Text>
          <TextInput
            style={styles.input}
            placeholder="exemplo@email.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity 
            style={[styles.botao, carregando && styles.botaoDesabilitado]} 
            onPress={lidarComRecuperacao}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.botaoTexto}>Enviar Link de Recuperação</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.botaoVoltar} 
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.botaoVoltarTexto}>Lembrei a senha? Fazer Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  emojiBus: {
    fontSize: 54,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 12,
  },
  formulario: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingVertical: 48,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#007AFF', // Azul padrão ou a cor de destaque do seu app
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  botaoDesabilitado: {
    backgroundColor: '#A0CFFF',
  },
  botaoTexto: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoVoltar: {
    marginTop: 16,
    alignItems: 'center',
  },
  botaoVoltarTexto: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
});