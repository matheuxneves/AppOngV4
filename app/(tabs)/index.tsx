import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/LogoOng.png')} 
          style={styles.logo}
        />
        <Text style={styles.title}>Bem-vindo à Rosa dos Ventos!</Text>
        <Text style={styles.subtitle}>Juntos, podemos fazer a diferença.</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentTitle}>Quem Somos?</Text>
        <Text style={styles.contentText}>
         A Rosa dos Ventos é uma entidade criada em 2001 por alunos de Turismo da Escola de Comunicações e Artes da Universidade de São Paulo (ECA-USP).
        </Text>
        <Text style={styles.contentTitle}>Nossa Missão</Text>
        <Text style={styles.contentText}>
          O objetivo principal do projeto é proporcionar lazer por meio de passeios e atividades para pessoas em situação de vulnerabilidade social, especialmente crianças e idosos.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#314659',
    padding: 15,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#99CAD6',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  contentTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 15,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign: 'justify',
  },
});
