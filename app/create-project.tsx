import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

const API_URL = 'http://192.168.15.7:4000'; // USE O SEU IP LOCAL AQUI

export default function CreateProjectScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [objective, setObjective] = useState('');
  const [location, setLocation] = useState('');
  const [schedule, setSchedule] = useState('');
  
  const handleCreateProject = async () => {
    // Validação simples para garantir que os campos não estão vazios
    if (!title || !description || !objective || !location || !schedule) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          objective,
          location,
          schedule,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ocorreu um erro ao criar o projeto.');
      }

      Alert.alert('Sucesso!', 'Novo projeto criado com sucesso!');
      router.back(); // Volta para a tela de admin
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Criar Novo Projeto</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Título do Projeto"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#888"
        />
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Descrição do Projeto"
          value={description}
          onChangeText={setDescription}
          placeholderTextColor="#888"
          multiline
        />
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Objetivo"
          value={objective}
          onChangeText={setObjective}
          placeholderTextColor="#888"
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Localização"
          value={location}
          onChangeText={setLocation}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Cronograma (Ex: Início: DD/MM/AAAA - Fim: DD/MM/AAAA)"
          value={schedule}
          onChangeText={setSchedule}
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.button} onPress={handleCreateProject}>
          <Text style={styles.buttonText}>Salvar Projeto</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#314659',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top', // Para Android
    paddingTop: 15, // Para iOS
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});