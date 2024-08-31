import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Contato {
    nome: string;
    telefone: string;
    email: string;
}

export default function FormularioContato({ contatos, setContatos }: any) {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');

    const navigation = useNavigation();

    const adicionarContato = () => {
        const novoContato = { nome, telefone, email };
        setContatos([...contatos, novoContato]);
        setNome('');
        setTelefone('');
        setEmail('');
        navigation.navigate('ListaContatos');
    };

    const irParaListaContatos = () => {
        navigation.navigate('ListaContatos');
      };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                placeholder="Nome"
                onChangeText={setNome}
                value={nome}
            />
            <TextInput style={styles.input}
                placeholder="Telefone"
                onChangeText={setTelefone}
                value={telefone}
                keyboardType="phone-pad"
            />
            <TextInput style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
            />
            <Button title="Adicionar Contato" onPress={adicionarContato} />
            <View style={styles.buttonContainer}>
                <Button title="Ver Contatos" onPress={irParaListaContatos} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 'auto',
        marginBottom: 10,
    },
});