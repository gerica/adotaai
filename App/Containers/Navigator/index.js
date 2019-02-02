/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomePage from '../Home';
import DetailsPage from '../Details';
import LoginPage from '../Login';
import SideMenu from './sideMenu';
import LogoutPage from '../Login/logout';
import PerfilPage from '../Perfil';
import ListaPetPage from '../Perfil/listaPet';
import CadastroPetPage from '../Perfil/cadastroPet';
import Colors from '../../Theme/Colors';

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

const tabsPerfil = createBottomTabNavigator({
    Perfil: {
        screen: createStackNavigator({
            perfilStack: { screen: PerfilPage },
        }),
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name={'ios-home'} size={26} style={{ color: tintColor }} />
            ),
        },
    },
    Lista: {
        screen: createStackNavigator({
            listaStack: { screen: ListaPetPage },
        }),
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name={'ios-list'} size={26} style={{ color: tintColor }} />
            ),
        },
    },
    Cadastro: {
        screen: createStackNavigator({
            cadastroStack: { screen: CadastroPetPage },
        }),
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <MaterialIcons name={'pets'} size={26} style={{ color: tintColor }} />
            ),
        },
    },
}, {
        order: ['Perfil', 'Lista', 'Cadastro'],
        tabBarOptions: {
            showLabel: false,
            activeTintColor: Colors.primary,
            inactiveTintColor: Colors.black,
            labelStyle: {
                fontSize: 16,
            },
            style: {
                backgroundColor: Colors.background,
            },
        },
    });

export const drawerAppNavigator = createDrawerNavigator({
    Home: { screen: stackHome },
    Login: { screen: stackLogin },
    Perfil: { screen: tabsPerfil },
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

