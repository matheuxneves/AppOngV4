import InfoModal from '@/components/InfoModal'; // Importamos o modal
import { useAuth } from '@/contexts/AuthContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { staticProjectData } from '../src/data/staticProjectData';

const API_URL = 'http://192.168.15.7:4000';
const { width } = Dimensions.get('window');

type Volunteer = { id: number | string; fullName: string; };
type Project = {
  id: string;
  title: string;
  description: string;
  status: string;
  objective: string;
  location: string;
  schedule: string;
  approvedVolunteers: Volunteer[];
};

export default function ProjectDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // Estados para o modal
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({ title: '', message: '' });  

  // ---> INÍCIO DA CORREÇÃO <---
  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}/projects/${String(id)}`);
        
        // Verificamos se a resposta da API foi um sucesso (status 2xx)
        if (!response.ok) {
          throw new Error('Falha ao buscar dados do projeto do servidor.');
        }

        const data = await response.json();
        setProject(data);
      } catch (error) { 
        console.error("Erro ao buscar detalhes do projeto:", error);
        setProject(null); // Garantimos que o projeto seja nulo em caso de erro
      } 
      finally { 
        setLoading(false); 
      }
    };
    fetchProjectDetails();
  }, [id]);
  // ---> FIM DA CORREÇÃO <---

  const handleVolunteerPress = async () => {
    if (!user) {
      setModalInfo({ title: 'Acesso Negado', message: 'Você precisa estar logado para se voluntariar.' });
      setModalVisible(true);
      return;
    }
    try {
      const response = await fetch(`${API_URL}/projects/${id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      
      setModalInfo({ title: 'Sucesso!', message: data.message });
      setModalVisible(true);
    } catch (error: any) {
      setModalInfo({ title: 'Atenção', message: error.message });
      setModalVisible(true);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />;
  }

  if (!project) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Projeto não encontrado.</Text>
      </View>
    );
  }

  const gallery = staticProjectData[project.id as keyof typeof staticProjectData]?.gallery || [];
  const statusColor = project.status === 'Concluído' ? '#28a745' : '#ffc107';

  const navigateToGalleryGrid = () => {
    router.push({ 
      pathname: '/gallery-grid', 
      params: { images: JSON.stringify(gallery) } 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        {/* ... (o resto do seu JSX permanece o mesmo) ... */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{project.title}</Text>
          <View style={[styles.statusContainer, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{project.status}</Text>
          </View>
        </View>
        <Text style={styles.description}>{project.description}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Objetivo</Text>
          <Text style={styles.infoText}>{project.objective}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Localização</Text>
          <Text style={styles.infoText}>{project.location}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Cronograma</Text>
          <Text style={styles.infoText}>{project.schedule}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Voluntários Confirmados</Text>
          {project.approvedVolunteers.length > 0 ? (
            project.approvedVolunteers.map((volunteer) => (
              <Text key={volunteer.id} style={styles.infoText}>{volunteer.fullName}</Text>
            ))
          ) : (
            <Text style={styles.infoText}>Ainda não há voluntários confirmados.</Text>
          )}
        </View>
        {gallery.length > 0 && (
          <TouchableOpacity style={styles.infoContainer} onPress={navigateToGalleryGrid}>
            <Text style={styles.infoTitle}>Galeria de Fotos</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryContainer}>
              {gallery.map((imageUri, index) => (
                <Image key={index} source={imageUri} style={styles.galleryImage} />
              ))}
            </ScrollView>
          </TouchableOpacity>
        )}
      </ScrollView>

      {project.status === 'Em andamento' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.volunteerButton} onPress={handleVolunteerPress}>
            <Text style={styles.volunteerButtonText}>Quero ser voluntário</Text>
          </TouchableOpacity>
        </View>
      )}

      
      {/* Renderizamos o Modal no final */}
      <InfoModal
        visible={isModalVisible}
        title={modalInfo.title}
        message={modalInfo.message}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  scrollContentContainer: { padding: 15 },
  loader: { flex: 1, justifyContent: 'center' },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', flexShrink: 1, marginRight: 10 },
  description: { fontSize: 16, color: '#555', marginBottom: 20, textAlign: 'center', lineHeight: 22 },
  infoContainer: { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 15, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  infoTitle: { fontSize: 20, fontWeight: 'bold', color: '#007AFF', marginBottom: 10 },
  infoText: { fontSize: 16, color: '#555', lineHeight: 22, marginBottom: 5 },
  galleryContainer: { marginTop: 10 },
  galleryImage: { width: width * 0.5, height: 150, borderRadius: 8, marginRight: 10, resizeMode: 'cover' },
  errorText: { fontSize: 18, color: 'red', textAlign: 'center', marginTop: 50 },
  buttonContainer: { padding: 15, backgroundColor: '#f0f4f8', borderTopWidth: 1, borderTopColor: '#e0e0e0' },
  volunteerButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignItems: 'center' },
  volunteerButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  statusContainer: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5 },
  statusText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});