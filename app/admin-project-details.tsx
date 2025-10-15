import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const API_URL = 'http://192.168.15.7:4000'; // USE O SEU IP LOCAL AQUI

// 1. Definimos o tipo para um voluntário
type Volunteer = {
  id: number | string;
  fullName: string;
  email: string;
  phoneNumber?: string; // Adicionando o número de telefone
};

// 2. Definimos o tipo para o objeto de projeto completo
type ProjectDetails = {
  id: string;
  title: string;
  pendingVolunteers: Volunteer[];
  approvedVolunteers: Volunteer[];
};

// 3. Tipamos as props do VolunteerCard
type VolunteerCardProps = {
  volunteer: Volunteer;
  onApprove: ((userId: number | string) => void) | null;
  onDelete: ((userId: number | string) => void) | null; // Adicionando a função de deletar
};

const VolunteerCard = ({ volunteer, onApprove, onDelete }: VolunteerCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    return (
      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
        <View style={styles.volunteerCard}>
          <View>
            <Text style={styles.volunteerName}>{volunteer.fullName}</Text>
            <Text style={styles.volunteerInfo}>{volunteer.email}</Text>
            {isExpanded && (
              <View style={styles.expandedInfo}>
                <Text style={styles.volunteerInfo}>Telefone: {volunteer.phoneNumber || 'Não informado'}</Text>
                {/* Adicione outros dados aqui no futuro */}
              </View>
            )}
          </View>
          <View style={styles.buttonContainer}>
            {onApprove && (
              <TouchableOpacity style={styles.approveButton} onPress={() => onApprove(volunteer.id)}>
                <Text style={styles.approveButtonText}>Aprovar</Text>
              </TouchableOpacity>
            )}
            {onDelete && (
                <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(volunteer.id)}>
                    <Text style={styles.deleteButtonText}>Excluir</Text>
                </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
};

export default function AdminProjectDetailsScreen() {
  const { id } = useLocalSearchParams();
  // 4. Tipamos o estado do projeto
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/projects/${id}`);
      const data = await response.json();
      setProject(data);
    } catch (error) {
      console.error("Erro ao buscar detalhes do projeto:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProjectDetails();
    }
  }, [id]);

  const handleApprove = async (userId: number | string) => {
    try {
        const response = await fetch(`${API_URL}/projects/${id}/approve`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
        });
        const updatedProject = await response.json();
        if (!response.ok) throw new Error(updatedProject.message);

        setProject(updatedProject);
        Alert.alert('Sucesso!', 'Voluntário aprovado.');

    } catch (error: any) {
        Alert.alert('Erro', error.message);
    }
  };

  const handleDelete = async (userId: number | string) => {
    try {
        const response = await fetch(`${API_URL}/projects/${id}/reject`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
        });
        const updatedProject = await response.json();
        if (!response.ok) throw new Error(updatedProject.message);

        setProject(updatedProject);
        Alert.alert('Sucesso!', 'Voluntário excluído.');

    } catch (error: any) {
        Alert.alert('Erro', error.message);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (!project) {
    return <Text style={styles.errorText}>Projeto não encontrado.</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>{project.title}</Text>
        
        <Text style={styles.subHeader}>Candidatos Pendentes ({project.pendingVolunteers.length})</Text>
        {project.pendingVolunteers.length > 0 ? (
          project.pendingVolunteers.map(v => <VolunteerCard key={v.id} volunteer={v} onApprove={handleApprove} onDelete={handleDelete} />)
        ) : (
          <Text style={styles.emptyText}>Nenhum candidato pendente.</Text>
        )}

        <Text style={styles.subHeader}>Voluntários Aprovados ({project.approvedVolunteers.length})</Text>
        {project.approvedVolunteers.length > 0 ? (
          project.approvedVolunteers.map(v => <VolunteerCard key={v.id} volunteer={v} onApprove={null} onDelete={handleDelete} />)
        ) : (
          <Text style={styles.emptyText}>Nenhum voluntário aprovado.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f4f8', paddingHorizontal: 15 },
    header: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
    subHeader: { fontSize: 20, fontWeight: 'bold', marginTop: 30, marginBottom: 10, color: '#314659' },
    volunteerCard: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        backgroundColor: '#fff', 
        padding: 15, 
        borderRadius: 8, 
        marginBottom: 10 
    },
    volunteerName: { fontSize: 16, fontWeight: '600' },
    volunteerInfo: { fontSize: 14, color: 'gray', marginTop: 4 },
    approveButton: { backgroundColor: '#28a745', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 5, marginLeft: 5 },
    approveButtonText: { color: 'white', fontWeight: 'bold' },
    deleteButton: { backgroundColor: '#d9534f', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 5, marginLeft: 5 },
    deleteButtonText: { color: 'white', fontWeight: 'bold' },
    emptyText: { textAlign: 'center', color: 'gray', fontStyle: 'italic', marginVertical: 20 },
    errorText: { textAlign: 'center', color: 'red', marginTop: 50 },
    expandedInfo: {
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
    }
});