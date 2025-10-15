import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext'; // Importando nosso hook

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
  };

  // Se o usuário não estiver logado, redireciona para o login.
  if (!user) {
    router.replace('/login');
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          // Usando um placeholder para a foto de perfil
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
          style={styles.avatar}
        />
        {/* Mostra o nome completo do usuário */}
        <Text style={styles.name}>{user.fullName}</Text>

        {/* Informações de contato */}
        <View style={styles.contactInfo}>
          <View style={styles.infoRow}>
            <FontAwesome name="envelope" size={20} color="#555" />
            <Text style={styles.infoText}>{user.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome name="phone" size={20} color="#555" />
            <Text style={styles.infoText}>{user.phoneNumber}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  profileContainer: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#314659',
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  contactInfo: {
    marginTop: 20,
    alignItems: 'flex-start',
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 18,
    color: '#555',
    marginLeft: 15,
  },
  logoutButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});