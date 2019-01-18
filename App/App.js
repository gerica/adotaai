import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import configureStore from './Stores';
import HomePage from './Containers/Home';
// import configureStore from './utils/configureStore';

// const store = configureStore();

type Props = {};
const store = configureStore();
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Text style={styles.welcome}>Teste 25</Text>
          <HomePage />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
