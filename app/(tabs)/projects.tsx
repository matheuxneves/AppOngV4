import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const API_URL = 'http://192.168.15.7:4000'; // USE O SEU IP LOCAL AQUI

// Definimos o tipo para as propriedades do item do projeto
type ProjectItemProps = {
  id: string;
  title: string;
  description: string;
  status: string;
};

const ProjectItem = ({ id, title, description, status }: ProjectItemProps) => {
  const router = useRouter();
  const statusColor = status === 'Concluído' ? '#28a745' : '#ffc107';

  return (
    <TouchableOpacity onPress={() => router.push({ pathname: '/project-details', params: { id } })} style={styles.projectCard}>
      <View style={styles.projectHeader}>
        <Text style={styles.projectTitle}>{title}</Text>
        <View style={[styles.statusContainer, { backgroundColor: statusColor }]}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
      <Text style={styles.projectDescription}>{description}</Text>
    </TouchableOpacity>
  );
};

export default function ProjectsScreen() {
  // AQUI ESTÁ A CORREÇÃO: Tipamos o estado para ser um array de ProjectItemProps
  const [projects, setProjects] = useState<ProjectItemProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/projects`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <FlatList
      style={styles.container}
      data={projects}
      renderItem={({ item }) => <ProjectItem {...item} />}
      keyExtractor={item => item.id}
      ListHeaderComponent={
        <Text style={styles.header}>Nossos Principais Projetos</Text>
      }
      contentContainerStyle={{ padding: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 20, marginTop: 10 },
  projectCard: { backgroundColor: '#fff', borderRadius: 10, padding: 20, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  projectHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  projectTitle: { fontSize: 20, fontWeight: 'bold', color: '#007AFF', flexShrink: 1, marginRight: 10 },
  projectDescription: { fontSize: 16, lineHeight: 22, color: '#555' },
  statusContainer: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5 },
  statusText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});