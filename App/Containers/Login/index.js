
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardItem,
    Body,
    Spinner,
    Text,
    Button,

} from 'native-base';
import { GoogleSigninButton } from 'react-native-google-signin';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { ContainerLogin } from './styles';
import SessionActions from '../../Stores/Session/actions';
import * as selectors from '../../Stores/Session/selector';
import Toast from '../../Components/toast/Toast';
import { createValidator, required, email, minLengthPassword } from '../../Utils/validation';
import TextInputBaseRedux from '../../Components/input/TextInputBaseRedux';

class LoginPage extends Component {

    shouldComponentUpdate(nextProps) {
        const { user, onResetRedux, reset, navigation } = nextProps;
        if (user) {
            reset();
            onResetRedux();
            navigation.navigate('homeStack', { msg: 'Login efetuado com sucesso.', user: user.user });
            return false;
        }
        return true;
    }

    onSubmit = (values) => {
        const { onLogin } = this.props;
        onLogin(values);
    }

    onSignIn = () => {
        const { onSignIn } = this.props;
        onSignIn();
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
                                <Field name='email' label='E-mail' component={TextInputBaseRedux} />
                                <Field name='password' label='Senha' component={TextInputBaseRedux} secureTextEntry />
                                <Button full light style={{ marginTop: 20 }} onPress={handleSubmit(this.onSubmit)}>
                                    <Text>Entrar</Text>
                                </Button>
                            </Body>
                        }
                    </CardItem>
                </Card>
                <GoogleSigninButton
                    style={{ width: '100%', height: 50 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this.onSignIn}
                    disabled={loading}
                />
            </ContainerLogin >

        );
    }
}

LoginPage.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
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
    user: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
};

const mapStateToProps = createStructuredSelector({
    loading: selectors.selectorLoading(),
    error: selectors.selectorError(),
    user: selectors.selectorSessionUser(),
});

const mapDispatchToProps = (dispatch) => ({
    onLogin: (payload) => dispatch(SessionActions.loginRequest(payload.email, payload.password)),
    onSignIn: () => dispatch(SessionActions.signInGoogleRequest()),
    onResetRedux: () => dispatch(SessionActions.resetRedux()),
});

const validate = createValidator({
    email: [required, email],
    password: [required, minLengthPassword],
});

const loginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export default reduxForm({ form: 'loginPage', validate, })(loginPage);
