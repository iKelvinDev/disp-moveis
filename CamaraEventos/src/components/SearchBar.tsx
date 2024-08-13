import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
    const [query, setQuery] = useState<string>('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <View style={styles.container}>
            <TextInput
                label="Buscar deputado por nome"
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}
                style={styles.input}
                mode="outlined"
            />
            <Button
                mode="contained"
                onPress={handleSearch}
                style={styles.button}
                contentStyle={styles.buttonContent}
            >
                Buscar
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 280,
        marginBottom: 10,
    },
    button: {
        width: 280,
        borderRadius: 8,
    },
    buttonContent: {
        height: 50,
    },
});

export default SearchBar;