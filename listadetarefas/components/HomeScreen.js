import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadTasks();
    }
  }, [isFocused]);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Erro ao carregar as tarefas:', error);
    }
  };

  const toggleTaskCompletion = async (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = async (index) => {
    try {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Erro ao deletar a tarefa:', error);
    }
  };

  return (
    <View style={styles.container}>
      {tasks.length > 0 ? (
        <FlatList 
          data={tasks}
          renderItem={({ item, index }) => (
            <View style={styles.taskContainer}>
              <TouchableOpacity 
                style={styles.checkbox} 
                onPress={() => toggleTaskCompletion(index)}
              >
                <Text style={item.completed ? styles.checked : styles.unchecked}>
                  {item.completed ? "✔" : "◻"}
                </Text>
              </TouchableOpacity>
              <Text style={item.completed ? styles.completedTask : styles.task}>
                {item.task}
              </Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(index)}>
                <Text style={styles.deleteButtonText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noTasksText}>Nenhuma tarefa adicionada ainda.</Text>
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTask')}>
        <Text style={styles.addButtonText}>Adicionar Tarefa</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.settingsButtonText}>Configurações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  checkbox: {
    marginRight: 10,
  },
  unchecked: {
    fontSize: 22,
    color: '#333',
  },
  checked: {
    fontSize: 22,
    color: 'green',
  },
  task: {
    flex: 1,
    fontSize: 18,
    color: '#333',
  },
  completedTask: {
    flex: 1,
    fontSize: 18,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  noTasksText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingsButton: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  settingsButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
