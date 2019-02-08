
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Button, } from 'native-base';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { ContainerLogin } from './styles';
import SessionActions from '../../Stores/Session/actions';
import * as selectors from '../../Stores/Session/selector';

class LogoutPage extends Component {

    onSignOut = () => {
        const { signOut, navigation } = this.props;
        signOut();
        navigation.navigate('homeStack', { msg: 'Logout efetuado com sucesso.' });
    }

    render() {
        return (
            <ContainerLogin>
                <Button full light style={{ marginTop: 20 }} onPress={this.onSignOut}>
                    <Text>Sair</Text>
                </Button>
            </ContainerLogin >
        );
    }
}

LogoutPage.propTypes = {
    signOut: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    errorMessage: selectors.selectorError(),
});

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(SessionActions.signOutRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
