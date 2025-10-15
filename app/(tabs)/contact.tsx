import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import InfoModal from '@/components/InfoModal'; // Importamos o novo modal

const openLink = (url: string) => {
  Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
};

export default function ContactScreen() {
  const pixKey = "11968106853";

  // Estados para controlar o modal
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({ title: '', message: '' });

  const handleDonatePress = async () => {
    try {
      await Clipboard.setStringAsync(pixKey);
      setModalInfo({
        title: "Chave PIX Copiada!",
        message: `A chave PIX (Celular) foi copiada para sua área de transferência:\n\n${pixKey}\n\nAgora é só colar no app do seu banco para fazer a doação.`
      });
      setModalVisible(true);
    } catch (error) {
      setModalInfo({
        title: "Erro",
        message: "Não foi possível copiar a chave PIX. Por favor, anote a chave: " + pixKey
      });
      setModalVisible(true);
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Entre em Contato</Text>
          <View style={styles.infoRow}>
            <FontAwesome name="map-marker" size={24} color="#007AFF" />
            <Text style={styles.infoText}>R. da Reitoria, 374 - Butantã, São Paulo - SP, 05508-220</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome name="phone" size={24} color="#007AFF" />
            <Text style={styles.infoText}>(11 94599-0106)</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome name="envelope" size={24} color="#007AFF" />
            <Text style={styles.infoText}>adm@rosadosventos.com</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Siga-nos nas Redes Sociais</Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity onPress={() => openLink('https://www.instagram.com/rosadosventos.usp/')}>
              <FontAwesome name="instagram" size={40} color="#E1306C" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.donateButton} onPress={handleDonatePress}>
          <Text style={styles.donateButtonText}>Faça uma Doação via PIX</Text>
        </TouchableOpacity>
      </ScrollView>

      <InfoModal
        visible={isModalVisible}
        title={modalInfo.title}
        message={modalInfo.message}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  donateButton: {
    backgroundColor: '#28a745',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});