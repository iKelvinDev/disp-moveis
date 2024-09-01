import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

interface Contato {
  nome: string;
  telefone: string;
  email: string;
  aniversario: string;
  favorito: boolean;
}

interface FavoritosProps {
  contatos: Contato[];
}

export default function Favoritos({ contatos }: FavoritosProps) {
  const contatosFavoritos = contatos.filter(contato => contato.favorito);

  return (
    <View style={styles.container}>
      <FlatList
        data={contatosFavoritos}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>Nome: {item.nome}</Text>
            <Text>Telefone: {item.telefone}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Aniversário: {item.aniversario}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
