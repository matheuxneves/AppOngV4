import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Nossa História</Text>
        <Text style={styles.text}>
          A Rosa dos Ventos, desde sua criação, já realizou passeios com crianças em situação de vulnerabilidade social para diversos lugares. Sempre pensando na democratização do acesso ao lazer para tal público.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Como Realizamos</Text>
        <Text style={styles.subtitle}></Text>
        <Text style={styles.text}>
          1 - O primeiro passo é selecionarmos uma ONG ou instituição para fecharmos parceria. Nossa viagem juntos dura 1 ano!
        </Text>
        <Text style={styles.subtitle}></Text>
        <Text style={styles.text}>
          2 - O segundo passo é partirmos para conhecer o público pertencente à instituição, realizando a primeira visita! Essa visita é importante para, além de conhecermos os rostinhos que passaremos um bom tempo trabalhando em conjunto, também nos prepararmos para o próximo passo!
        </Text>
        <Text style={styles.subtitle}></Text>
        <Text style={styles.text}>
          3 - O terceiro passo é, com a coleta de informações da visita, pensarmos e planejarmos um passeio com base no perfil do público.
        </Text>
        <Text style={styles.subtitle}></Text>
        <Text style={styles.text}>
          4 - Feito o planejamento do passeio? Partimos para o penúltimo passo: a realização do passeio.
        </Text>
        <Text style={styles.subtitle}></Text>
        <Text style={styles.text}>
          Mas não acaba por aí! Ainda há uma última parte que é a recolha de feedback e nosso último encontro para encerrarmos nossa jornada com chave de ouro!
        </Text>
      </View>
    </ScrollView>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
});
