import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';

const API_URL = 'http://192.168.15.7:4000';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const { login } = useAuth();

  const handleAuthentication = async () => {
    // ... (sua função handleAuthentication permanece a mesma)
    const endpoint = isLogin ? '/login' : '/register';
    const url = `${API_URL}${endpoint}`;
    const body = isLogin
      ? { email, password }
      : { email, password, fullName, phoneNumber, role: 'volunteer' };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Ocorreu um erro.');
      }
      if (isLogin) {
        login(data.user);
        Alert.alert('Sucesso!', 'Login realizado com sucesso.');
        if (router.canGoBack()) {
          router.back();
        }
      } else {
        Alert.alert('Sucesso!', 'Conta criada com sucesso! Agora você pode fazer o login.');
        setIsLogin(true);
      }
    } catch (error: any) {
      console.error('Erro de autenticação:', error.message);
      Alert.alert('Erro', error.message);
    }
  };

  // ---> INÍCIO DA CORREÇÃO <---
  // Removemos o SafeAreaView e o KeyboardAvoidingView se torna o componente raiz
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container} // Aplicamos o estilo principal aqui
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>
          {isLogin ? 'Acesso de Membros' : 'Criar Conta'}
        </Text>
        <Text style={styles.subtitle}>
          {isLogin
            ? 'Faça login para acessar a área restrita.'
            : 'Crie uma conta para se tornar um membro.'}
        </Text>

        {!isLogin && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nome Completo"
              value={fullName}
              onChangeText={setFullName}
              placeholderTextColor="#888"
            />
            <TextInput
              style={styles.input}
              placeholder="Número de Telefone"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              placeholderTextColor="#888"
            />
          </>
        )}

        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
          <Text style={styles.buttonText}>{isLogin ? 'Entrar' : 'Cadastrar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.toggleText}>
            {isLogin
              ? 'Ainda não tem uma conta? Cadastre-se'
              : 'Já tem uma conta? Faça login'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    // ---> FIM DA CORREÇÃO <---
  );
}

// ---> ESTILOS ATUALIZADOS <---
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f4f8',
      justifyContent: 'center', // Adicionado para centralizar o conteúdo
      padding: 20, // Adicionado para dar espaçamento
    },
    formContainer: {
      padding: 25,
      backgroundColor: '#fff',
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#314659',
      textAlign: 'center',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginBottom: 30,
    },
    input: {
      height: 50,
      backgroundColor: '#f7f7f7',
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      fontSize: 16,
      color: '#333',
    },
    button: {
      backgroundColor: '#314659',
      paddingVertical: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    toggleButton: {
      marginTop: 20,
      alignItems: 'center',
    },
    toggleText: {
      color: '#007AFF',
      fontSize: 16,
    },
  });