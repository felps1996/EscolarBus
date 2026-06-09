import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../theme/ colors';

// Definimos as variantes possíveis para o botão usando tipos literais do TS
type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
}

export function Button({ title, variant = 'primary', style, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        variant === 'secondary' ? styles.containerSecondary : styles.containerPrimary,
        style,
      ]}
      {...rest}
    >
      <Text 
        style={[
          styles.title,
          variant === 'secondary' ? styles.titleSecondary : styles.titlePrimary
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    borderRadius: 28, // Formato pílula arredondado do Figma
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  containerPrimary: {
    backgroundColor: COLORS.gray_input, // Cor do botão ENTRAR
  },
  containerSecondary: {
    backgroundColor: COLORS.card_white, // Botões da tela de opções
    // Efeito de sombra leve para o padrão iOS/Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
  titlePrimary: {
    color: COLORS.text_light,
  },
  titleSecondary: {
    color: COLORS.text_dark,
  },
});