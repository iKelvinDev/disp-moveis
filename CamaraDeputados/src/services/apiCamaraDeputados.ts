import { IDeputado } from '../components/interfaces/IDeputado';

const API_URL = 'https://dadosabertos.camara.leg.br/api/v2/deputados';

export const fetchDeputados = async (query: string = ''): Promise<IDeputado[]> => {
    try {
        const response = await fetch(`${API_URL}?ordem=ASC&ordenarPor=nome&nome=${encodeURIComponent(query)}`);
        const data = await response.json();
        return data.dados;
    } catch (error) {
        console.error('Error fetching deputados:', error);
        return [];
    }
};
