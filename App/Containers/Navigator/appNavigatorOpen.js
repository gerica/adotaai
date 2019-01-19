
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
// eslint-disable-next-line max-len
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import HomePage from '../Home';
import DetailsPage from '../Details';


// Manifest of possible screens
export const stackNavigatorApp = createStackNavigator({
    loginStack: { screen: HomePage },
    detailStack: { screen: DetailsPage }
    // drawerStack: { screen: DrawerNavigation }
}, {
        // Default config for all screens
        headerMode: 'none',
        title: 'Main',
        initialRouteName: 'loginStack'
    });

// Create middleware and connect
export const appNavigatorMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
);

const App = reduxifyNavigator(stackNavigatorApp, 'root');
const mapStateToProps = (state) => ({
    state: state.nav,
});

const AppWithNavigationState = connect(mapStateToProps)(App);
export default AppWithNavigationState;
