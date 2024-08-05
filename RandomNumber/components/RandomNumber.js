import { Text, View, StyleSheet, Image, Button, } from 'react-native';
import React, { useState } from 'react';

const RandomNumber = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [numeroAleatorio, setNumeroAleatorio] = useState(gerarNumeroAleatorio(min, max));

  function gerarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  function novoNumeroAleatorio() {
    setNumeroAleatorio(gerarNumeroAleatorio(min, max));
  }

  return(
    <View style={styles.container}>
      <Text style={styles.numero}>{numeroAleatorio}</Text>
      <Button style={styles.button} title="Gerar Número" onPress={novoNumeroAleatorio}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  numero: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  button: {
    
  }
});

export default RandomNumber;