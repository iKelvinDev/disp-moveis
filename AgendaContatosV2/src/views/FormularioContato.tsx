import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorageService from '../storage/AsyncStorageService';

interface Contato {
    nome: string;
    telefone: string;
    email: string;
    aniversario: string;
    favorito: boolean;
}

export default function FormularioContato({ contatos, setContatos }: any) {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [aniversario, setAniversario] = useState('');
    const [favorito, setFavorito] = useState(false);
    const navigation = useNavigation();

    const adicionarContato = async () => {
        const emailExistente = contatos.some((contato: Contato) => contato.email === email);
        if (emailExistente) {
            alert("Esse e-mail já está cadastrado.");
            return;
        }

        const novoContato = { nome, telefone, email, aniversario, favorito };
        const novosContatos = [...contatos, novoContato];
        setContatos(novosContatos);
        await AsyncStorageService.saveContacts(novosContatos);
        
        setNome('');
        setTelefone('');
        setEmail('');
        setAniversario('');
        setFavorito(false);
        navigation.navigate('Lista', { screen: 'ListaContatos' });
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Nome" onChangeText={setNome} value={nome} />
            <TextInput style={styles.input} placeholder="Telefone" onChangeText={setTelefone} value={telefone} keyboardType="phone-pad" />
            <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email} keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="Aniversário" onChangeText={setAniversario} value={aniversario} />
            <View style={styles.switchContainer}>
                <Text>Favorito</Text>
                <Switch value={favorito} onValueChange={setFavorito} />
            </View>
            <Button title="Adicionar Contato" onPress={adicionarContato} />
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
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
});
