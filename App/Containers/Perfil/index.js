import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Card, CardItem, Button, Left, Right } from 'native-base';

import * as selectorsSession from '../../Stores/Session/selector';
import HomeActions from '../../Stores/Home/actions';
import { ContainerPerfil, Info, TextPerfil } from './styles';
import Colors from '../../Theme/Colors';

class PerfilPage extends Component {

    render() {
        const { user } = this.props;
        if (!user) {
            return null;
        }
        // console.log(user);
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
                            <TextPerfil>Nome: {user.user.name}</TextPerfil>
                            <TextPerfil>E-mail: {user.user.email}</TextPerfil>
                            <TextPerfil>Contato: {user.user.tel}</TextPerfil>
                        </Info>
                    </CardItem>
                    <CardItem>
                        <Left />
                        <Right>
                            <Button block light>
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
