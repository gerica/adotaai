/* eslint-disable react/react-in-jsx-scope */

import { connect } from 'react-redux';
import { createStackNavigator, createDrawerNavigator, } from 'react-navigation';
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';

import HomePage from '../Home';
import DetailsPage from '../Details';
import SideMenu from './sideMenu';

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


export const drawerAppNavigator = createDrawerNavigator({
    Home: { screen: HomePage },
    Details: { screen: DetailsPage },
}, {
        contentComponent: SideMenu,
        contentOptions: {
            // activeTintColor: '#e1ef95',
            // inactiveTintColor: '#ffffff',
            style: {
                paddingVertical: 50,
                paddingHorizontal: 50,
                backgroundColor: '#233261',
                height: '100%'
            }
        }

    });

// Create middleware and connect
export const appNavigatorMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
);

const App = reduxifyNavigator(drawerAppNavigator, 'root');
const mapStateToProps = (state) => ({
    state: state.nav,
});

const AppWithNavigationState = connect(mapStateToProps)(App);
export default AppWithNavigationState;
