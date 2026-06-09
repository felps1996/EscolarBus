import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        // 1. Mantém o header nativo oculto para usar o seu design do Figma
        headerShown: false, 
        
        // 2. Força a ativação do gesto de arrastar para voltar
        gestureEnabled: true, 
        
        // 3. Define que o sentido do movimento é horizontal
        gestureDirection: 'horizontal', 
        
        // 4. Força o Android a fazer a transição lateral idêntica à do iOS
        animation: Platform.OS === 'android' ? 'slide_from_right' : 'default',
        
        // Opcional: Garante que o fundo das transições não mostre um flash cinza
        contentStyle: { backgroundColor: '#FFFFFF' }
      }}
    >
      {/* Definição explícita das suas rotas atuais */}
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="home" />
      <Stack.Screen name="onibus" />
      <Stack.Screen name="onibus/[id]" />
    </Stack> 
  );
}