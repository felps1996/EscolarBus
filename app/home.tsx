import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 
import { useLocalSearchParams } from 'expo-router';

export default function Home() {
  const router = useRouter();

  const { username } = useLocalSearchParams<{ username: string }>();
  
  // Lista de botões para renderizar de forma limpa
  const menuItems = [
    { id: 'onibus', title: 'ÔNIBUS', icon: 'bus-outline', route: '/onibus' },
    { id: 'aluno', title: 'ALUNO', icon: 'person-outline', route: '/aluno' },
    { id: 'admin', title: 'ADMINISTRADORES', icon: 'shield-checkmark-outline', route: '/admin' },
    { id: 'settings', title: 'SETTINGS', icon: 'settings-outline', route: '/settings' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Cabeçalho sutil da Home */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
        Olá, {username ? username : 'Usuário'}!
      </Text>
      <Text style={styles.subtitleText}>
        Bem-vindo ao EscolarBus.
      </Text>
        <Text style={styles.subTitle}>Selecione uma opção para navegar</Text>
      </View>

      {/* Grid de Botões Estilo Pílula */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.pillButton}
            activeOpacity={0.7}
            onPress={() => router.push(item.route as any)}
          >
            <View style={styles.iconWrapper}>
              <Ionicons name={item.icon as any} size={29} color="#0000FF" />
            </View>
            <Text style={styles.buttonText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Fundo totalmente branco do Figma
  },
  header: {
    paddingHorizontal: 30,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#121212',
  },
  subTitle: {
    fontSize: 18,
    color: '#707070',
    fontWeight: 'bold',
    marginTop: 12,
  },
  subtitleText: {
    fontSize: 16,
    color: 'rgba(26, 26, 26, 0.69)',
    marginTop: 8,
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 20, // Espaçamento uniforme entre os botões
  },
  pillButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 74, // Botão alto e imponente como no design
    borderRadius: 37, // Metade da altura para virar uma pílula perfeita
    paddingHorizontal: 24,
    
    // Sombras expressivas do Figma (Neomorfismo leve)
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4, // Fallback Android
  },
  iconWrapper: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#E6E6FF', // Fundo azul bem clarinho para o ícone sumir no peso visual
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  buttonText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#121212',
    letterSpacing: 1.2,
  },
});