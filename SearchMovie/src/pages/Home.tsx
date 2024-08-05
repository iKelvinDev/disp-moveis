import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, Button, Text, View, Image, TouchableOpacity } from 'react-native';
import { IMovie } from '../components/IMovie';

const API_KEY = ''; // Adicionar API key
const API = `http://www.omdbapi.com/?apikey=${API_KEY}`;

const Home = () => {
    const [title, setTitle] = useState<string>('');
    const [movie, setMovie] = useState<IMovie | null>(null);

    const getMovie = async (title: string) => {
        if (!title) return;

        try {
            const res = await fetch(`${API}&t=${encodeURIComponent(title)}`);
            const data: IMovie = await res.json();

            if (data.Response === "True") {
                setMovie(data);
            } else {
                setMovie(null);
            }
        } catch (err) {
            console.error(err);
            setMovie(null);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Text style={styles.titleapp}>Search Movie</Text>

            <TextInput
                style={styles.input}
                placeholder="Digite o título do filme"
                value={title}
                onChangeText={setTitle}
            />
            <TouchableOpacity style={styles.button} onPress={() => getMovie(title)}>
                <Text style={styles.buttonText}>Pesquisar</Text>
            </TouchableOpacity>

            {movie && movie.Response === "True" && (
                <View style={styles.card}>
                    <Image
                        source={{ uri: movie.Poster }}
                        style={styles.poster}
                    />
                    <Text style={styles.text}>Titulo: {movie.Title}</Text>
                    <Text style={styles.text}>Ano: {movie.Year}</Text>
                    <Text style={styles.text}>Gênero: {movie.Genre}</Text>
                    <Text style={styles.text}>Diretor: {movie.Director}</Text>
                    <Text style={styles.text}>Atores: {movie.Actors}</Text>

                    <View style={styles.space} />

                    <Text style={styles.text}>Plot: {movie.Plot}</Text>
                </View>
            )}

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        marginBottom: 20,
        padding: 10,
        borderWidth: 1.5,
        borderColor: '#cccc',
        borderRadius: 20,
    },
    card: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    poster: {
        width: 200,
        height: 300,
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        marginBottom: 6,
    },
    space: {
        height: 15,
    },
    button: {
        backgroundColor: '#595959',
        padding: 10,
        borderRadius: 20,
        width: '30%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffff',
        fontSize: 16,
    },
    titleapp: {
        fontSize: 24,
        marginBottom: 15,

    }
});

export default Home;
