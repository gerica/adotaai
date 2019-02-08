import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Card, CardItem, Button, Left, Right, Icon } from 'native-base';

import * as selectorsSession from '../../Stores/Session/selector';
import HomeActions from '../../Stores/Home/actions';
import { ContainerPerfil, Info, TextPerfil } from './styles';
import Colors from '../../Theme/Colors';

class PerfilPage extends Component {

    render() {
        const { user, navigation } = this.props;
        if (!user) {
            return null;
        }
        return (
            <ContainerPerfil>
                {/* <Info>
                    <TextPerfil>Nome: {user.user.name}</TextPerfil>
                    <TextPerfil>E-mail: {user.user.email}</TextPerfil>
                    <TextPerfil>Contato: {user.user.tel}</TextPerfil>
                </Info>
                <ButtonPrimary /> */}

                <Card>
                    <CardItem cardBody>
                        <Info>
                            <TextPerfil>Nome: {user.user.name || user.user.displayName}</TextPerfil>
                            <TextPerfil>E-mail: {user.user.email}</TextPerfil>
                            <TextPerfil>Contato: {user.user.tel}</TextPerfil>
                        </Info>
                    </CardItem>
                    <CardItem>
                        <Left />
                        <Right>
                            <Button
                                block
                                light
                                onPress={() => navigation.navigate('editarPerfilStack', {
                                    iconCustom: <Icon name="arrow-back" style={{ marginLeft: 5, fontSize: 35, color: '#fff' }} />,
                                    onPressCustom: 'goBack',
                                })}
                            >
                                <Text style={{ color: Colors.black, fontWeight: 'bold' }}>Editar</Text>
                            </Button>
                        </Right>

                    </CardItem>
                </Card>

            </ContainerPerfil>
        );
    }
}

PerfilPage.propTypes = {
    initReducer: PropTypes.func,
    user: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    errorMessage: PropTypes.string,
    message: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
    user: selectorsSession.selectorSessionUser(),
});

const mapDispatchToProps = (dispatch) => ({
    initReducer: () => dispatch(HomeActions.initReducer()),
});


export default connect(mapStateToProps, mapDispatchToProps)(PerfilPage);
