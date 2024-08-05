import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { IMovie } from './IMovie';

interface MovieProps {
    movie: IMovie;
}

const Movie: React.FC<MovieProps> = ({ movie }) => {
    return (
        <Card style={styles.card}>
            <Card.Title title={movie.Title} subtitle={`Released: ${movie.Released}`} />
            <Card.Content>
                <Title>{movie.Genre}</Title>
                <Paragraph>{movie.Plot}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: movie.Poster }} />
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
    },
});

export default Movie;
