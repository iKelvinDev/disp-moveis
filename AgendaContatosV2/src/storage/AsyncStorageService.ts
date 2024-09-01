import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageService = {
    saveContacts: async (contatos: any) => {
        try {
            const jsonValue = JSON.stringify(contatos);
            await AsyncStorage.setItem('@contatos', jsonValue);
        } catch (e) {
            // erro ao salvar
            console.error(e);
        }
    },
    getContacts: async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@contatos');
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            // erro ao carregar
            console.error(e);
            return [];
        }
    },
};

export default AsyncStorageService;
