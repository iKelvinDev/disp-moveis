import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import DeputadoCard from '../components/DeputadoCard';
import { fetchDeputados } from '../services/apiCamaraDeputados';
import { IDeputado } from '../components/interfaces/IDeputado';

function Home() {
    const [deputados, setDeputados] = useState<IDeputado[]>([]);

    const handleSearch = async (query: string) => {
        const result = await fetchDeputados(query);
        setDeputados(result);
    };

    return (
        <View style={styles.container}>
            <SearchBar onSearch={handleSearch} />
            <ScrollView>
                {deputados.map(deputado => (
                    <DeputadoCard key={deputado.id} deputado={deputado} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});

export default Home;