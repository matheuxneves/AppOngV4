import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';

import ConfirmationModal from '@/components/ConfirmationModal'; 

const API_URL = 'http://192.168.15.7:4000';

type AdminProjectItemProps = {
  id: string;
  title: string;
  status: string;
  onDelete: (id: string, title: string) => void;
};

const AdminProjectItem = ({ id, title, status, onDelete }: AdminProjectItemProps) => {
  const router = useRouter();
  return (
    <View style={styles.projectCard}>
      <TouchableOpacity 
        style={styles.projectTitleContainer}
        onPress={() => router.push({ pathname: '/admin-project-details', params: { id } })}
      >
        <Text style={styles.projectTitle}>{title}</Text>
        <Text style={{ color: status === 'Concluído' ? '#28a745' : '#ffc107' }}>{status}</Text>
      </TouchableOpacity>

      {/* --- BOTÕES DE AÇÃO --- */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push({ pathname: '/edit-project', params: { id } })}>
          <FontAwesome name="pencil" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(id, title)}>
          <FontAwesome name="trash" size={24} color="#d9534f" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function AdminScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<AdminProjectItemProps[]>([]);
  const [loading, setLoading] = useState(true);

    // 2. Adicione estados para controlar o modal
  const [isModalVisible, setModalVisible] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<{ id: string; title: string } | null>(null);


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

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchProjects();
    } else {
      setLoading(false);
    }
  }, [user]);

  // 3. A função handleDelete agora apenas abre o modal
  const handleDelete = (id: string, title: string) => {
    setProjectToDelete({ id, title });
    setModalVisible(true);
  };

  // 4. A nova função confirmDeletion executa a exclusão
  const confirmDeletion = async () => {
    if (!projectToDelete) return;

    try {
      const response = await fetch(`${API_URL}/projects/${projectToDelete.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Falha ao excluir o projeto.');
      }
      setProjects(prevProjects => prevProjects.filter(p => p.id !== projectToDelete.id));
      // Usamos o Alert aqui apenas para feedback de sucesso/erro, que é menos crítico
      Alert.alert('Sucesso!', 'Projeto excluído com sucesso.');
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    } finally {
      // Fecha o modal e limpa os dados
      setModalVisible(false);
      setProjectToDelete(null);
    }
  };

  
  if (user?.role !== 'admin') {
    return (
        <View style={styles.accessDeniedContainer}>
            <FontAwesome name="lock" size={48} color="#d9534f" />
            <Text style={styles.accessDeniedTitle}>Acesso Negado</Text>
            <Text style={styles.accessDeniedText}>
            Esta área é restrita para administradores do sistema.
            </Text>
        </View>
    );
  }

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={projects}
        // ---> A CORREÇÃO ESTÁ AQUI <---
        renderItem={({ item }) => <AdminProjectItem {...item} onDelete={handleDelete} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 15 }}
        ListHeaderComponent={ <Text style={styles.header}>Gerenciar Projetos</Text> }
      />
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => router.push('/create-project')}
      >
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>

      {/* 5. Renderize o modal condicionalmente */}
      {projectToDelete && (
        <ConfirmationModal
          visible={isModalVisible}
          title="Confirmar Exclusão"
          message={`Você tem certeza que deseja excluir o projeto "${projectToDelete.title}"?`}
          onCancel={() => {
            setModalVisible(false);
            setProjectToDelete(null);
          }}
          onConfirm={confirmDeletion}
          confirmButtonText="Excluir"
        />
      )}
    </View>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  header: { fontSize: 26, fontWeight: 'bold', color: '#314659', textAlign: 'center', marginBottom: 20 },
  projectCard: { backgroundColor: '#fff', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 3 },
  projectTitleContainer: { flex: 1, marginRight: 10 },
  projectTitle: { fontSize: 18, fontWeight: '600' },

  actionsContainer: {flexDirection: 'row'},
  actionButton: {padding: 10, marginLeft: 10},

  deleteButton: { padding: 10 },
  accessDeniedContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8', padding: 20 },
  accessDeniedTitle: { fontSize: 24, fontWeight: 'bold', color: '#d9534f', marginTop: 20, marginBottom: 10 },
  accessDeniedText: { fontSize: 16, color: '#555', textAlign: 'center' },
 
  // Estilo para o botão flutuante
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 2 },
  },
});