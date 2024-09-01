import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Contato {
  nome: string;
  telefone: string;
  email: string;
  aniversario: string;
  favorito: boolean;
}

interface ListaContatosProps {
  contatos: Contato[];
}

export default function ListaContatos({ contatos }: ListaContatosProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={contatos}
        keyExtractor={(item) => item.email} // Email - chave única
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>Nome: {item.nome}</Text>
            <Text>Telefone: {item.telefone}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Aniversário: {item.aniversario}</Text>
          </View>
        )}
      />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
