import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { reactotronRedux } from 'reactotron-redux';


import Fonts from './Theme/Fonts';
import ApplicationStyles from './Theme/ApplicationStyles';
import configureStore from './Stores';
import AppNavigator from './Containers/Navigator';

export const reactotron = Reactotron
  .configure({
    host: '192.168.0.13', //my current wifi local ip in mac
    port: 9090,
    name: 'Adota ai|'
  })
  .useReactNative()
  .use(reactotronRedux())
  .connect();

type Props = {};
const { store, persistor } = configureStore();
export default class App extends Component<Props> {
  render() {
    // Reactotron.log('hello rendering world');
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            <AppNavigator />
          </View>
        </PersistGate>
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
