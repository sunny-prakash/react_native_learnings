import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import ElevatedCards from './components/ElevatedCards';
import FlatCards from './components/FlatCards';

const App = (): JSX.Element => {
  const isDarkEnabled = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={isDarkEnabled ? styles.darkBody : styles.lightBody}>
      <ScrollView>
        <FlatCards />
        <ElevatedCards />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  darkBody: {
    backgroundColor: '#31363F',
  },
  lightBody: {
    backgroundColor: '#EEEE',
  },
});

export default App;
