import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import Reactotron from 'reactotron-react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { reactotronRedux } from 'reactotron-redux';


import Fonts from './Theme/Fonts';
import ApplicationStyles from './Theme/ApplicationStyles';
import configureStore from './Stores';
import AppWithNavigationState from './Containers/Navigator/appNavigatorOpen';

export const reactotron = Reactotron
  .configure({
    host: '192.168.0.13', //my current wifi local ip in mac
    port: 9090,
    name: 'Adota ai|'
  })
  .useReactNative()
  .use(reactotronRedux())
  .connect();

// import Details from './Containers/Details';
// import HomePage from './Containers/Home';

type Props = {};
const store = configureStore();
export default class App extends Component<Props> {
  render() {
    // Reactotron.log('hello rendering world');
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
    margin: '1%',
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
