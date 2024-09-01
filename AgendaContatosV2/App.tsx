import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, Ionicons } from 'react-native-vector-icons';
import FormularioContato from './src/views/FormularioContato';
import ListaContatos from './src/views/ListaContatos';
import Favoritos from './src/views/Favoritos';
import AsyncStorageService from './src/storage/AsyncStorageService';

const Tab = createBottomTabNavigator();

interface Contato {
  nome: string;
  telefone: string;
  email: string;
  aniversario: string;
  favorito: boolean;
}

export default function App() {
  const [contatos, setContatos] = useState<Contato[]>([]);

  useEffect(() => {
    const loadContacts = async () => {
      const savedContacts = await AsyncStorageService.getContacts();
      setContatos(savedContacts);
    };

    loadContacts();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: string;
            let IconComponent: React.ComponentType<any> = MaterialIcons; // Default icon component

            // Definir ícone com base na rota
            switch (route.name) {
              case 'Cadastro':
                iconName = 'person-add'; // ícone add
                break;
              case 'Lista':
                iconName = 'list'; // ícone lista
                break;
              case 'Favoritos':
                iconName = 'star'; // ícone estrela
                break;
              default:
                iconName = 'help'; // ícone padrão
            }

            return <IconComponent name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'dodgerblue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Cadastro">
          {() => <FormularioContato contatos={contatos} setContatos={setContatos} />}
        </Tab.Screen>
        <Tab.Screen name="Lista">
          {() => <ListaContatos contatos={contatos} />}
        </Tab.Screen>
        <Tab.Screen name="Favoritos">
          {() => <Favoritos contatos={contatos} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
