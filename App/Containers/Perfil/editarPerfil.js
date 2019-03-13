import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button, Spinner, Card, CardItem, Body } from 'native-base';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
// import { NavigationActions, StackActions } from 'react-navigation';

import * as selectorsSession from '../../Stores/Session/selector';
import SessionActions from '../../Stores/Session/actions';
import { createValidator, required, } from '../../Utils/validation';
import TextInputBaseRedux from '../../Components/input/TextInputBaseRedux';
import { Info, TextPerfil } from './styles';
import Toast from '../../Components/toast/Toast';
// import Toast from '../../Components/toast/Toast';

class EditarPerfilPage extends Component {

    componentDidMount() {
        this.handleInitialize();
    }

    shouldComponentUpdate(nextProps) {
        const { message, error } = nextProps;
        const msgToast = message || (error && error.code);
        if (msgToast) {
            Toast({ visible: true, message: msgToast });
        }
        return true;
    }

    onSubmit = (values) => {
        const { updateRequest, user } = this.props;
        updateRequest({ user, dados: { ...values } });
    }

    handleInitialize() {
        const { initialize, user: { userCustom } } = this.props;

        const initData = {
            contato: userCustom.contato,
        };

        initialize(initData);
    }

    render() {
        const { handleSubmit, loading, loadingSession, user: { userCustom } } = this.props;
        // , error, message 

        return (
            <ScrollView>
                <Card>
                    <CardItem cardBody>
                        <Info>
                            <TextPerfil>Nome: {userCustom.name} </TextPerfil>
                            <TextPerfil>E-mail: {userCustom.email}</TextPerfil>
                        </Info>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Field name='contato' label='Contato' component={TextInputBaseRedux} />
                        </Body>
                    </CardItem>
                    <CardItem>
                        {(loading || loadingSession) ? <Spinner /> :
                            <Body>
                                <Button full light style={{ marginTop: 20 }} onPress={handleSubmit(this.onSubmit)}>
                                    <Text>Salvar</Text>
                                </Button>
                            </Body>
                        }

                    </CardItem>
                </Card>
            </ScrollView>
        );
    }
}

EditarPerfilPage.propTypes = {
    user: PropTypes.object,
    resetRedux: PropTypes.func,
    updateRequest: PropTypes.func,
    loading: PropTypes.bool,
    loadingSession: PropTypes.bool,
    error: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    message: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
};

const mapStateToProps = createStructuredSelector({
    user: selectorsSession.selectorSessionUser(),
    loading: selectorsSession.selectorLoading(),
    message: selectorsSession.selectorMessage(),
    error: selectorsSession.selectorError(),
});

const mapDispatchToProps = (dispatch) => ({
    updateRequest: (payload) => dispatch(SessionActions.updateRequest(payload)),
});

const validate = createValidator({
    contato: [required],
});


const editarPerfilPage = connect(mapStateToProps, mapDispatchToProps)(EditarPerfilPage);
export default reduxForm({ form: 'editarPerfilPage', validate, })(editarPerfilPage);
