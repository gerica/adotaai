/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import { Icon } from 'native-base';

import HomePage from '../Home';
import DetailsPage from '../Details';
import LoginPage from '../Login';
import CriarUsuarioPage from '../Login/criarUsuario';
import SideMenu from './sideMenu';
import LogoutPage from '../Login/logout';
import PerfilPage from '../Perfil';
import ListaPetPage from '../Perfil/listaPet';
import CadastroPetPage from '../Perfil/cadastroPet';
import EditarPerfilPage from '../Perfil/editarPerfil';
import Colors from '../../Theme/Colors';
import { TextHeader } from '../styles';
import IconHeaderLeft from '../../Components/header/iconHeaderLeft';
import IconHeaderRight from '../../Components/header/iconHeaderRight';


// Manifest of possible screens
const stackHome = createStackNavigator({
    homeStack: { screen: HomePage, key: 'teste' },
    detailStack: { screen: DetailsPage }
},
    {
        initialRouteName: 'homeStack',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: ({ navigation }) => ({
            headerTitle: <TextHeader style={{ color: '#fff' }}>Adota ai</TextHeader>,
            headerStyle: {
                backgroundColor: '#2f8fcc',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: <IconHeaderLeft nav={navigation} />,
            headerRight: <IconHeaderRight nav={navigation} />
        })
    }
);

// Manifest of possible screens
const stackLogin = createStackNavigator({
    loginStack: { screen: LoginPage },
    criarUsuarioStack: { screen: CriarUsuarioPage },
},
    {
        initialRouteName: 'loginStack',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: ({ navigation }) => ({
            headerTitle: <TextHeader style={{ color: '#fff' }}>Adota ai - Login</TextHeader>,
            headerStyle: {
                backgroundColor: '#2f8fcc',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: <IconHeaderLeft nav={navigation} />,
            headerRight: <IconHeaderRight nav={navigation} />
        })
    }
);

const stackLogout = createStackNavigator({
    logoutStack: { screen: LogoutPage },
},
    {
        initialRouteName: 'logoutStack',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: ({ navigation }) => ({
            headerTitle: <TextHeader style={{ color: '#fff' }}>Adota ai - Logout</TextHeader>,
            headerStyle: {
                backgroundColor: '#2f8fcc',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: <IconHeaderLeft nav={navigation} />,
            headerRight: <IconHeaderRight nav={navigation} />
        })
    }
);

const stackPerfil = createStackNavigator({
    perfilStack: { screen: PerfilPage },
    editarPerfilStack: { screen: EditarPerfilPage },
},
    {
        initialRouteName: 'perfilStack',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: ({ navigation }) => ({
            headerTitle: <TextHeader style={{ color: '#fff' }}>Adota ai - Perfil</TextHeader>,
            headerStyle: {
                backgroundColor: '#2f8fcc',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: <IconHeaderLeft nav={navigation} />,
            headerRight: <IconHeaderRight nav={navigation} />
        })
    }
);

const stackPerfilLista = createStackNavigator({
    listaStack: { screen: ListaPetPage },
},
    {
        initialRouteName: 'listaStack',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: ({ navigation }) => ({
            headerTitle: <TextHeader style={{ color: '#fff' }}>Adota ai - Lista de pets</TextHeader>,
            headerStyle: {
                backgroundColor: '#2f8fcc',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: <IconHeaderLeft nav={navigation} />,
            headerRight: <IconHeaderRight nav={navigation} />
        })
    }
);

const stackCadastroPet = createStackNavigator({
    cadastroStack: { screen: CadastroPetPage },
},
    {
        initialRouteName: 'cadastroStack',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: ({ navigation }) => ({
            headerTitle: <TextHeader style={{ color: '#fff' }}>Adota ai - Cadastro</TextHeader>,
            headerStyle: {
                backgroundColor: '#2f8fcc',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: <IconHeaderLeft nav={navigation} />,
            headerRight: <IconHeaderRight nav={navigation} />
        })
    }
);

const tabsPerfil = createBottomTabNavigator({
    Perfil: {
        screen: stackPerfil,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                // <Ionicons name={'ios-home'} size={26} style={{ color: tintColor }} />
                <Icon type="Ionicons" name="ios-home" style={{ color: tintColor }} />

            ),
        },
    },
    Lista: {
        screen: stackPerfilLista,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                // <Ionicons name={'ios-list'} size={26} style={{ color: tintColor }} />
                <Icon type="Ionicons" name="ios-list" style={{ color: tintColor }} />
            ),
        },
    },
    Cadastro: {
        screen: stackCadastroPet,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <Icon type="MaterialIcons" name="pets" style={{ color: tintColor }} />
            ),
        },
    },
}, {
        order: ['Perfil', 'Lista', 'Cadastro'],
        initialRouteName: 'Perfil',
        initialRoute: 'stackPerfil',
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

const drawerAppNavigator = createDrawerNavigator({
    Home: { screen: stackHome },
    Login: { screen: stackLogin },
    Perfil: { screen: tabsPerfil },
    Cadastro: { screen: stackCadastroPet },
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

export const rootStack = createStackNavigator({
    Drawer: { screen: drawerAppNavigator, navigationOptions: { header: null } }
});

// Create middleware and connect
export const appNavigatorMiddleware = createReactNavigationReduxMiddleware(
    'navOpen',
    state => state.nav
);

const AppNavigator = reduxifyNavigator(rootStack, 'navOpen');
const mapStateToProps = (state) => ({
    state: state.nav,
});

export default connect(mapStateToProps)(AppNavigator);

