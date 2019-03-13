import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Card, CardItem, Button, Left, Right, Icon } from 'native-base';
import { NavigationEvents } from 'react-navigation';

import * as selectorsSession from '../../Stores/Session/selector';
import { ContainerPerfil, Info, TextPerfil } from './styles';
import Colors from '../../Theme/Colors';
import { NAVIGATON_BACK } from '../../Utils/constants';

class PerfilPage extends Component {

    componentWillFocus = ({ action: { type } }) => {
        const { user } = this.props;
        if (user && type && type === NAVIGATON_BACK) {
            this.forceUpdate();
        }
    }


    render() {
        const { user, navigation } = this.props;
        if (!user) {
            return null;
        }
        const { userCustom } = user;
        return (
            <ContainerPerfil>
                <NavigationEvents
                    onWillFocus={payload => this.componentWillFocus(payload)}
                />
                <Card>
                    <CardItem cardBody>
                        <Info>
                            <TextPerfil>Nome: {userCustom.name}</TextPerfil>
                            <TextPerfil>E-mail: {userCustom.email}</TextPerfil>
                            <TextPerfil>Contato: {userCustom.contato}</TextPerfil>
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

// const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, null)(PerfilPage);
