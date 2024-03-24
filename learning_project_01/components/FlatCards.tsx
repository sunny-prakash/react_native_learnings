import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const FlatCards = (): JSX.Element => {
  return (
    <View>
      <Text style={styles.headingText}>Flat Cards</Text>
      <View style={styles.cardContainer}>
        <View style={[styles.card, styles.cardOne]}>
          <Text style={styles.cardText}>RED</Text>
        </View>
        <View style={[styles.card, styles.cardTwo]}>
          <Text style={styles.cardText}>GREEN</Text>
        </View>
        <View style={[styles.card, styles.cardThree]}>
          <Text style={styles.cardText}>BLUE</Text>
        </View>
        <View style={[styles.card, styles.cardFour]}>
          <Text style={styles.cardText}>CYAN</Text>
        </View>
        <View style={[styles.card, styles.cardTwo]}>
          <Text style={styles.cardText}>GREEN</Text>
        </View>
      </View>
    </View>
  );
};

export default FlatCards;

const styles = StyleSheet.create({
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 4,
    margin: 6,
  },
  cardText: {
    fontWeight: '500',
  },
  cardOne: {
    backgroundColor: 'red',
  },
  cardTwo: {
    backgroundColor: 'green',
  },
  cardThree: {
    backgroundColor: 'blue',
  },
  cardFour: {
    backgroundColor: 'cyan',
  },
});
