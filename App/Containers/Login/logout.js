
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight } from 'react-native';
import { Text, Button, } from 'native-base';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextHeader } from '../styles';
import { ContainerLogin } from './styles';
import SessionActions from '../../Stores/Session/actions';
import * as selectors from '../../Stores/Login/selector';

class LogoutPage extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <TextHeader style={{ color: '#fff' }}>Logout</TextHeader>,
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

    logout = () => {
        const { onLogout, navigation } = this.props;
        onLogout();
        navigation.navigate('Home', { msg: 'Logout efetuado com sucesso.' });
    }

    render() {
        return (
            <ContainerLogin>
                <Button full light style={{ marginTop: 20 }} onPress={this.logout}>
                    <Text>Sair</Text>
                </Button>
            </ContainerLogin >
        );
    }
}

LogoutPage.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    errorMessage: selectors.selectorErrorMessage(),
});

const mapDispatchToProps = (dispatch) => ({
    onLogout: () => dispatch(SessionActions.removeUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
