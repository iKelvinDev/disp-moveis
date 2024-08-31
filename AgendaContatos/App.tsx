import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FormularioContato from './src/views/FormularioContato';
import ListaContatos from './src/views/ListaContatos';

const Stack = createStackNavigator();

interface Contato {
  nome: string;
  telefone: string;
  email: string;
}

export default function App() {
  const [contatos, setContatos] = useState<Contato[]>([]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="FormularioContato">
          {() => <FormularioContato contatos={contatos} setContatos={setContatos} />}
        </Stack.Screen>
        <Stack.Screen name="ListaContatos">
          {() => <ListaContatos contatos={contatos} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
