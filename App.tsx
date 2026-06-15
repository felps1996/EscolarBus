import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <View>
      <StatusBar style="auto" />
      {/* O Slot renderiza automaticamente a rota atual da pasta app (começando pelo app/index.tsx) */}
      <Slot />
    </View>
  );
}
