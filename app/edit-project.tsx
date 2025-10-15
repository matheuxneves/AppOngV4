import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const API_URL = 'http://192.168.15.7:4000';

export default function EditProjectScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Pega o ID do projeto da rota

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [objective, setObjective] = useState('');
  const [location, setLocation] = useState('');
  const [schedule, setSchedule] = useState('');
  const [status, setStatus] = useState('Em andamento');

  // Busca os dados do projeto quando a tela carrega
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`${API_URL}/projects/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        
        setTitle(data.title);
        setDescription(data.description);
        setObjective(data.objective);
        setLocation(data.location);
        setSchedule(data.schedule);
        setStatus(data.status);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados do projeto.');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleUpdateProject = async () => {
    try {
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, objective, location, schedule, status }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      
      Alert.alert('Sucesso!', 'Projeto atualizado com sucesso!');
      router.back();
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Editar Projeto</Text>
        
        <TextInput style={styles.input} placeholder="Título" value={title} onChangeText={setTitle} />
        <TextInput style={[styles.input, styles.multilineInput]} placeholder="Descrição" value={description} onChangeText={setDescription} multiline />
        <TextInput style={[styles.input, styles.multilineInput]} placeholder="Objetivo" value={objective} onChangeText={setObjective} multiline />
        <TextInput style={styles.input} placeholder="Localização" value={location} onChangeText={setLocation} />
        <TextInput style={styles.input} placeholder="Cronograma" value={schedule} onChangeText={setSchedule} />
        
        <Text style={styles.label}>Status do Projeto</Text>
        <View style={styles.statusContainer}>
            <TouchableOpacity onPress={() => setStatus('Em andamento')} style={[styles.statusButton, status === 'Em andamento' && styles.statusButtonActive]}>
                <Text style={styles.statusButtonText}>Em Andamento</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStatus('Concluído')} style={[styles.statusButton, status === 'Concluído' && styles.statusButtonActive]}>
                <Text style={styles.statusButtonText}>Concluído</Text>
            </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleUpdateProject}>
          <Text style={styles.buttonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  scrollContainer: { padding: 20 },
  header: { fontSize: 26, fontWeight: 'bold', color: '#314659', textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: '#fff', borderColor: '#ddd', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, fontSize: 16, color: '#333', minHeight: 50 },
  multilineInput: { height: 100, textAlignVertical: 'top', paddingTop: 15 },
  label: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 10, marginTop: 10 },
  statusContainer: { flexDirection: 'row', marginBottom: 20 },
  statusButton: { flex: 1, padding: 15, borderRadius: 8, backgroundColor: '#e9ecef', alignItems: 'center', marginHorizontal: 5 },
  statusButtonActive: { backgroundColor: '#007AFF' },
  statusButtonText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  button: { backgroundColor: '#28a745', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});