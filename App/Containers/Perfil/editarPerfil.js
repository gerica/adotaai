import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button, Spinner, Card, CardItem, Body } from 'native-base';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
// import { NavigationActions, StackActions } from 'react-navigation';

import * as selectorsSession from '../../Stores/Session/selector';
import PerfilActions from '../../Stores/Perfil/actions';
import SessionActions from '../../Stores/Session/actions';
import { createValidator, required, } from '../../Utils/validation';
import TextInputBaseRedux from '../../Components/input/TextInputBaseRedux';
import * as selectors from '../../Stores/Perfil/selector';
// import Toast from '../../Components/toast/Toast';

class EditarPerfilPage extends Component {

    componentDidMount() {
        this.handleInitialize();
    }

    onSubmit = (values) => {
        const { updateRequest } = this.props;
        updateRequest(values);
    }

    handleInitialize() {
        const { initialize, user: { user } } = this.props;
        let nameUser;
        let emailUser;
        if (user) {
            emailUser = user.email;
            nameUser = user.name || user.displayName;
        }
        const initData = {
            nome: nameUser,
            email: emailUser,
        };

        initialize(initData);
    }

    render() {
        const { handleSubmit, loading, loadingSession, errorMessage, message } = this.props;

        return (
            <ScrollView>
                <Card>
                    <CardItem>
                        <Body>
                            <Field name='nome' label='Nome' component={TextInputBaseRedux} />
                            <Field name='email' label='E-mail' disabled component={TextInputBaseRedux} />
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
    doacaoRequest: PropTypes.func,
    resetRedux: PropTypes.func,
    updateRequest: PropTypes.func,
    loading: PropTypes.bool,
    loadingSession: PropTypes.bool,
    errorMessage: PropTypes.oneOfType([
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
    loading: selectors.selectorLoading(),
    loadingSession: selectorsSession.selectorLoading(),
    message: selectors.selectorMessage(),
    errorMessage: selectors.selectorErroMessage(),
});

const mapDispatchToProps = (dispatch) => ({
    doacaoRequest: (payload) => dispatch(PerfilActions.doacaoRequest(payload)),
    resetRedux: () => dispatch(PerfilActions.resetRedux()),
    updateRequest: (payload) => dispatch(SessionActions.updateRequest(payload)),
});

const validate = createValidator({
    nome: [required],
});


const editarPerfilPage = connect(mapStateToProps, mapDispatchToProps)(EditarPerfilPage);
export default reduxForm({ form: 'editarPerfilPage', validate, })(editarPerfilPage);
