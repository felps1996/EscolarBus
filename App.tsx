import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from './theme/ colors';
import { Login } from './app/login';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Login/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue_primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

