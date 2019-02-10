
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import {
    Card,
    CardItem,
    Body,
    Spinner,
    // Text,
    Button,

} from 'native-base';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { ContainerLogin } from './styles';
import SessionActions from '../../Stores/Session/actions';
import * as selectors from '../../Stores/Session/selector';
import Toast from '../../Components/toast/Toast';
import { createValidator, required, email, minLengthPassword } from '../../Utils/validation';
import TextInputBaseRedux from '../../Components/input/TextInputBaseRedux';

class CriarUsuarioPage extends Component {


    onSubmit = (values) => {
        const { onSignIn } = this.props;
        onSignIn(values);
    }

    render() {
        const { handleSubmit, loading, error } = this.props;

        return (
            <ContainerLogin>
                <Card>
                    <CardItem>
                        {loading ? <Spinner /> :
                            <Body>
                                {error ? <Toast visible message={error.code} /> : null}
                                <Field name='name' label='Nome' component={TextInputBaseRedux} />
                                <Field name='email' label='E-mail' component={TextInputBaseRedux} />
                                <Field name='password' label='Senha' component={TextInputBaseRedux} secureTextEntry />
                                <Field name='contato' label='Contato' component={TextInputBaseRedux} />
                                <Button full light style={{ marginTop: 20 }} onPress={handleSubmit(this.onSubmit)}>
                                    <Text>Salvar</Text>
                                </Button>
                            </Body>
                        }
                    </CardItem>
                </Card>

            </ContainerLogin >

        );
    }
}

CriarUsuarioPage.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onSignIn: PropTypes.func.isRequired,
    onResetRedux: PropTypes.func.isRequired,
    loading: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    error: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
};

const mapStateToProps = createStructuredSelector({
    loading: selectors.selectorLoading(),
    error: selectors.selectorError(),
});

const mapDispatchToProps = (dispatch) => ({
    onSignIn: (payload) => dispatch(SessionActions.signInRequest(payload)),
    onResetRedux: () => dispatch(SessionActions.resetRedux()),
});

const validate = createValidator({
    name: [required],
    email: [required, email],
    password: [required, minLengthPassword],
});

const criarUsuarioPage = connect(mapStateToProps, mapDispatchToProps)(CriarUsuarioPage);
export default reduxForm({ form: 'criarUsuarioPage', validate, })(criarUsuarioPage);
