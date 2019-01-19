import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import Fonts from './Theme/Fonts';
import ApplicationStyles from './Theme/ApplicationStyles';
import configureStore from './Stores';
import AppWithNavigationState from './Containers/Navigator/appNavigatorOpen';
// import Details from './Containers/Details';
// import HomePage from './Containers/Home';

type Props = {};
const store = configureStore();
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {/* <HomePage /> */}
          <AppWithNavigationState />
          {/* <Details /> */}
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    margin: 30,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...Fonts.style.h2,
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginBottom: 5,
  },
});
