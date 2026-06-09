import React from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  isPassword?: boolean;
  variant?: 'dark' | 'light'; // Adicionado para suportar o ecrã branco
}

export function Input({ label, isPassword = false, variant = 'dark', ...rest }: InputProps) {
  const isLight = variant === 'light';

  return (
    <View style={styles.container}>
      {/* Altera a cor da label conforme a variante */}
      <Text style={[styles.label, isLight && styles.labelLight]}>{label}</Text>
      
      <TextInput
        style={[styles.input, isLight ? styles.inputLight : styles.inputDark]}
        placeholderTextColor={isLight ? '#A0A0A0' : 'rgba(255, 255, 255, 0.4)'}
        secureTextEntry={isPassword}
        autoCapitalize={isPassword ? 'none' : 'sentences'}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginBottom: 8,
    letterSpacing: 1.5,
    color:'#ffffff',
  },
  labelDark: {
    color: '#FFFFFF',
  },
  labelLight: {
    color: '#121212', // Texto escuro para o ecrã branco do Figma
  },
  input: {
    width: '100%',
    height: 54,
    borderRadius: 27,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  inputDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: '#FFFFFF',
  },
  inputLight: {
    backgroundColor: '#F5F5F5', // Fundo sutilmente cinza para destacar no card branco
    color: '#121212',
  },
});