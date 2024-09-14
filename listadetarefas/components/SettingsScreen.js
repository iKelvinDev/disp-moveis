import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export default function SettingsScreen() {
  useEffect(() => {
    const askPermission = async () => {
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          console.log('Permissões de notificação não concedidas!');
        }
      } else {
        console.log('As notificações só funcionam em dispositivos físicos.');
      }
    };
    askPermission();

    // Configurar o comportamento de como a notificação será recebida
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  }, []);

  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Lembrete!",
        body: "Não se esqueça de concluir suas tarefas!",
        sound: true, // Habilitar som na notificação
      },
      trigger: { seconds: 2 }, // Dispara 2 segundos após pressionar o botão
    });
    console.log('Notificação agendada!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <TouchableOpacity style={styles.button} onPress={scheduleNotification}>
        <Text style={styles.buttonText}>Ativar Notificação</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
