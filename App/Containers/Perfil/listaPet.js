import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardItem, Button, Icon, Left, Body, Right } from 'native-base';
import { createStructuredSelector } from 'reselect';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeActions from '../../Stores/Home/actions';
import { TextHeader } from '../styles';
import { ContainerPerfil } from './styles';

class ListaPetPage extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <TextHeader style={{ color: '#fff' }}>Perfil</TextHeader>,
        headerStyle: {
            backgroundColor: '#2f8fcc',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerLeft:
            <View >
                <TouchableHighlight
                    onPress={() => navigation.toggleDrawer()}
                    underlayColor={'#e5e5e5'}
                >
                    <MaterialIcons
                        name="menu"
                        size={35}
                        color={'#fff'}
                        style={{ marginRight: 5 }}
                    />
                </TouchableHighlight>
            </View>
    });

    render() {
        // const { navigation } = this.props;
        return (
            <ContainerPerfil>
                <Card>
                    <CardItem>
                        <Body>
                            <Text>Lista de pets</Text>
                        </Body>
                    </CardItem>
                </Card>
            </ContainerPerfil>
        );
    }
}

ListaPetPage.propTypes = {
};

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = (dispatch) => ({
    initReducer: () => dispatch(HomeActions.initReducer()),
});


export default connect(mapStateToProps, mapDispatchToProps)(ListaPetPage);
