
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight } from 'react-native';
import {
    Label,
    Spinner,
    Text,
    Button,

} from 'native-base';
// import firebase from 'react-native-firebase';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Field, reduxForm } from 'redux-form';
import { TextHeader } from '../styles';
import { ContainerLogin } from './styles';
import TextInputRedux from '../../Components/input/TextInputRedux';
import LoginActions from '../../Stores/Login/actions';
import * as selectors from '../../Stores/Login/selector';
import Toast from '../../Components/toast/Toast';
import { createValidator, required, email, minLengthPassword } from '../../Utils/validation';

class LoginPage extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <TextHeader style={{ color: '#fff' }}>Login</TextHeader>,
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

    // login = () => {
    //     const { email, password } = this.state;
    //     console.log(email);
    //     console.log(password);
    //     try {
    //         const user = firebase.auth().signInWithEmailAndPassword(email, password)
    //             .then((output) => {
    //                 console.log('sucesso');
    //                 console.log(output);
    //                 this.setState({ isAuthenicated: true });
    //             })
    //             .catch((err) => {
    //                 console.log('erro');
    //                 console.log(err);
    //             });

    //         // console.log(user);
    //     } catch (err) {
    //         console.log('erro 1');
    //         console.log(err);
    //     }
    // }
    onSubmit = (values) => {
        const { onLogin } = this.props;
        onLogin(values);
    }

    render() {
        const { handleSubmit, loading, errorMessage, pristine, reset, submitting } = this.props;
        // console.log(pristine);
        // console.log(reset);
        // console.log(submitting);
        if (loading) {
            return (
                <ContainerLogin>
                    <Spinner />
                </ContainerLogin>
            );
        }

        return (
            <ContainerLogin>
                {errorMessage ? <Toast visible message={errorMessage.code} /> : null}

                <View>
                    <Label>E-mail</Label>
                    <Field
                        name={'email'}
                        component={TextInputRedux}
                    />
                </View>
                <View>
                    <Label>Senha</Label>
                    <Field
                        name={'password'}
                        component={TextInputRedux}
                        secureTextEntry
                    />
                </View>

                <Button full light style={{ marginTop: 20 }} onPress={handleSubmit(this.onSubmit)}>
                    <Text>Entrar</Text>
                </Button>
                {/* <ButtonPrimary /> */}


            </ContainerLogin >
        );
    }
}

LoginPage.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    loading: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    errorMessage: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
};

const mapStateToProps = createStructuredSelector({
    loading: selectors.selectorLoading(),
    errorMessage: selectors.selectorErrorMessage(),
});

const mapDispatchToProps = (dispatch) => ({
    onLogin: (payload) => dispatch(LoginActions.loginRequest(payload.email, payload.password)),
});

const validate = createValidator({
    email: [required, email],
    password: [required, minLengthPassword],
});

const loginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export default reduxForm(
    {
        form: 'loginPage',
        validate,
        // validate: (values) => {
        //     const errors = {};
        //     // errors.email = !values.email
        //     //     ? 'Email field is required'
        //     //     : !emailRegex.test(values.email)
        //     //         ? 'Email format is invalid'
        //     //         : undefined;

        //     errors.password = !values.password
        //         ? 'Password field is required'
        //         : values.password.length < 8
        //             ? 'Password must be at least 8 characters long'
        //             : undefined;

        //     return errors;
        // }
    })(loginPage);
