import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Avatar } from 'react-native-paper';
import { IDeputado } from './interfaces/IDeputado';

function DeputadoCard({ deputado }: { deputado: IDeputado }) {
    return (
        <Card style={styles.card}>
            <Card.Content style={styles.content}>
                <View style={styles.header}>
                    <Avatar.Image 
                        source={{ uri: deputado.urlFoto }} 
                        size={50} 
                        style={styles.avatar} 
                    />
                    <View style={styles.info}>
                        <Title>{deputado.nome}</Title>
                        <Paragraph>{deputado.siglaPartido} - {deputado.siglaUf}</Paragraph>
                    </View>
                </View>
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        borderRadius: 8,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        marginRight: 10,
    },
    info: {
        flex: 1,
    },
});

export default DeputadoCard;