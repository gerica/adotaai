
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight } from 'react-native';
import {
    Card,
    CardItem,
    Body,
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
import LoginActions from '../../Stores/Login/actions';
import * as selectors from '../../Stores/Login/selector';
import Toast from '../../Components/toast/Toast';
import { createValidator, required, email, minLengthPassword } from '../../Utils/validation';
import * as selectorsSession from '../../Stores/Session/selector';
import TextInputBaseRedux from '../../Components/input/TextInputBaseRedux';

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

    shouldComponentUpdate(nextProps) {
        const { user, navigation } = nextProps;
        if (user) {
            this.props.reset();
            navigation.navigate('Home', { msg: 'Login efetuado com sucesso.' });
            return false;
        }
        return true;
    }

    onSubmit = (values) => {
        const { onLogin } = this.props;
        onLogin(values);
        // console.log(values);
    }

    render() {
        const { handleSubmit, loading, errorMessage } = this.props;
        if (loading) {
            return (
                <ContainerLogin>
                    <Spinner />
                </ContainerLogin>
            );
        }


        return (
            <ContainerLogin>
                <Card>
                    <CardItem>
                        <Body>
                            {errorMessage ? <Toast visible message={errorMessage.code} /> : null}
                            <Field name='email' label='E-mail' component={TextInputBaseRedux} />
                            <Field name='password' label='Senha' component={TextInputBaseRedux} secureTextEntry />
                            <Button full light style={{ marginTop: 20 }} onPress={handleSubmit(this.onSubmit)}>
                                <Text>Entrar</Text>
                            </Button>
                        </Body>
                    </CardItem>
                </Card>
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
    user: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
};

const mapStateToProps = createStructuredSelector({
    loading: selectors.selectorLoading(),
    errorMessage: selectors.selectorErrorMessage(),
    user: selectorsSession.selectorSessionUser(),
});

const mapDispatchToProps = (dispatch) => ({
    onLogin: (payload) => dispatch(LoginActions.loginRequest(payload.email, payload.password)),
});

const validate = createValidator({
    email: [required, email],
    password: [required, minLengthPassword],
});

const loginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export default reduxForm({ form: 'loginPage', validate, })(loginPage);
