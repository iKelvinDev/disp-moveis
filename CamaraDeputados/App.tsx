import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Home from './src/pages/Home';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Home />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
