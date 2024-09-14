import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddTaskScreen({ navigation }) {
  const [task, setTask] = useState('');

  const saveTask = async () => {
    try {
      const existingTasks = await AsyncStorage.getItem('tasks');
      const tasks = existingTasks ? JSON.parse(existingTasks) : [];
      tasks.push({ task: task, completed: false });
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar a tarefa:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Nova Tarefa</Text>
      <TextInput 
        style={styles.input}
        placeholder="Digite a tarefa" 
        value={task} 
        onChangeText={setTask} 
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button} onPress={saveTask}>
        <Text style={styles.buttonText}>Salvar Tarefa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 18,
    color: '#333',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});