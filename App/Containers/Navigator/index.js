/* eslint-disable react/react-in-jsx-scope */

import { connect } from 'react-redux';
import { createStackNavigator, createDrawerNavigator, } from 'react-navigation';
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';

import HomePage from '../Home';
import DetailsPage from '../Details';
import LoginPage from '../Login';
import SideMenu from './sideMenu';
import LogoutPage from '../Login/logout';

// Manifest of possible screens
export const stackHome = createStackNavigator({
    homeStack: { screen: HomePage },
    detailStack: { screen: DetailsPage }
    // drawerStack: { screen: DrawerNavigation }
});

// Manifest of possible screens
export const stackLogin = createStackNavigator({
    loginStack: { screen: LoginPage },
});

export const stackLogout = createStackNavigator({
    logoutStack: { screen: LogoutPage },
});

export const drawerAppNavigator = createDrawerNavigator({
    Home: { screen: stackHome },
    Login: { screen: stackLogin },
    Logout: { screen: stackLogout },
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
    'navOpen',
    state => state.nav
);

const AppNavigator = reduxifyNavigator(drawerAppNavigator, 'navOpen');
const mapStateToProps = (state) => ({
    state: state.nav,
});

export default connect(mapStateToProps)(AppNavigator);

