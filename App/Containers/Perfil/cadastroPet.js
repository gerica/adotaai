import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button, Spinner, Card, CardItem, Body } from 'native-base';
import { createStructuredSelector } from 'reselect';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Field, reduxForm } from 'redux-form';
// import { NavigationActions, StackActions } from 'react-navigation';

import * as selectorsSession from '../../Stores/Session/selector';
import PerfilActions from '../../Stores/Perfil/actions';
import { TextHeader } from '../styles';
import { ContainerPetCadastro } from './styles';
import { createValidator, required, } from '../../Utils/validation';
import PickerRedux from '../../Components/input/PickerRedux';
import TextInputBaseRedux from '../../Components/input/TextInputBaseRedux';
import racasCaoJson from '../../Utils/racasCao';
import racasGatoJson from '../../Utils/racasGato';
import * as selectors from '../../Stores/Perfil/selector';
import Toast from '../../Components/toast/Toast';


const tipos = ['cao', 'gato'];
class CadastroPetPage extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <TextHeader style={{ color: '#fff' }}>Perfil</TextHeader>,
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

    constructor(props) {
        super(props);
        this.state = {
            tipo: tipos[0],
            sexo: 'macho',
            castrado: 'nao',
            vermifugado: 'nao',
            porte: 'medio',
            raca: 'Selecione',
            imagem: null,
        };
        // this.onChangeTipo = this.onChangeTipo.bind(this);
    }

    componentWillMount() {
        const { reset, resetRedux } = this.props;
        reset();
        resetRedux();
    }

    shouldComponentUpdate(nextProps) {
        const { message, resetRedux } = nextProps;
        if (message) {
            this.props.reset();
            resetRedux();
            this.setState({
                tipo: tipos[0],
                sexo: 'macho',
                castrado: 'nao',
                vermifugado: 'nao',
                porte: 'medio',
                raca: 'Selecione',
                imagem: null
            });
            // navigation.navigate('Home', { msg: 'Login efetuado com sucesso.' });
            // const resetAction = NavigationActions.reset({
            //     index: 0,
            //     actions: [
            //         NavigationActions.navigate({ routeName: 'stackHome' })
            //     ]
            // });
            // navigation.dispatch(resetAction);
            // navigation.reset([NavigationActions.navigate({ routeName: 'cadastroStack' })], 0);
            // const resetAction = StackActions.reset({
            //     index: 0,
            //     actions: [NavigationActions.navigate({ routeName: 'cadastroStack' })],
            // });
            // navigation.dispatch(resetAction);

            return true;
        }
        return true;
    }

    // componentDidUpdate() {
    //     const { resetRedux } = this.props;
    //     resetRedux();
    // }

    onSubmit = (values) => {
        const { tipo, sexo, castrado, vermifugado, porte, raca, imagem } = this.state;
        const { doacaoRequest } = this.props;
        const newObj = {
            createdAt: new Date(),
            updatedA: new Date(),
            user: this.props.user.user,
            ...values,
            tipo,
            sexo,
            castrado,
            vermifugado,
            porte,
            raca,
            imagem,
        };
        // console.log(newObj);
        doacaoRequest(newObj);
    }

    onChangeTipo = (value) => {
        this.setState({ tipo: value });
    }

    onChangeSexo = (value) => {
        this.setState({ sexo: value });
    }

    onChangeCastrado = (value) => {
        this.setState({ castrado: value });
    }

    onChangeVermifugado = (value) => {
        this.setState({ vermifugado: value });
    }

    onChangePorte = (value) => {
        this.setState({ porte: value });
    }

    onChangeRaca = (value) => {
        let imagem;
        let tempImagem;
        if (this.state.tipo === tipos[0]) {
            tempImagem = racasCaoJson.find((e) => e.raca === value);
        } else if (this.state.tipo === tipos[1]) {
            tempImagem = racasGatoJson.find((e) => e.raca === value);
        }
        if (tempImagem) {
            imagem = tempImagem.img;
        }
        this.setState({ raca: value, imagem });
    }

    getRacas() {
        if (this.state.tipo === tipos[0]) {
            const itensRaca = racasCaoJson.map((e) => ({ label: e.raca, value: e.raca }));
            return (<Field
                name='raca'
                label='Raça'
                component={PickerRedux}
                selected={this.state.raca}
                itens={itensRaca}
                onValueChange={this.onChangeRaca}
            />);
        } else if (this.state.tipo === tipos[1]) {
            const itensRaca = racasGatoJson.map((e) => ({ label: e.raca, value: e.raca }));
            return (<Field
                name='raca'
                label='Raça'
                component={PickerRedux}
                selected={this.state.raca}
                itens={itensRaca}
                onValueChange={this.onChangeRaca}
            />);
        }
        return null;
    }

    render() {
        const { handleSubmit, loading, errorMessage, message } = this.props;
        if (loading) {
            return (
                <ContainerPetCadastro>
                    <Spinner />
                </ContainerPetCadastro>
            );
        }
        const itensTipo = [{ label: 'Cão', value: tipos[0] }, { label: 'Gato', value: tipos[1] }];
        const itensSexo = [{ label: 'Macho', value: 'macho' }, { label: 'Femea', value: 'femea' }];
        const itensSN = [{ label: 'Sim', value: 'sim' }, { label: 'Não', value: 'nao' }];
        const itensPorte = [{ label: 'Pequeno', value: 'pequeno' }, { label: 'Médio', value: 'medio' }, { label: 'Grande', value: 'grande' }];
        let msg;
        if (message) {
            msg = message;
        } else if (errorMessage) {
            msg = errorMessage.code;
        }
        return (
            <ScrollView>
                {msg ? <Toast visible message={msg} /> : null}
                <Card>
                    <CardItem>
                        <Body>
                            <Field name='nome' label='Nome' component={TextInputBaseRedux} />
                            <Field
                                name='tipo'
                                label='Tipo'
                                component={PickerRedux}
                                selected={this.state.tipo}
                                itens={itensTipo}
                                onValueChange={this.onChangeTipo}
                            />
                            {this.getRacas()}
                            <Field
                                name='sexo'
                                label='Sexo'
                                component={PickerRedux}
                                selected={this.state.sexo}
                                itens={itensSexo}
                                onValueChange={this.onChangeSexo}
                            />
                            <Field
                                name='castrado'
                                label='Castrado'
                                component={PickerRedux}
                                selected={this.state.castrado}
                                itens={itensSN}
                                onValueChange={this.onChangeCastrado}
                            />
                            <Field
                                name='vermifugado'
                                label='Vermifugado'
                                component={PickerRedux}
                                selected={this.state.vermifugado}
                                itens={itensSN}
                                onValueChange={this.onChangeVermifugado}
                            />
                            <Field
                                name='porte'
                                label='Porte'
                                component={PickerRedux}
                                selected={this.state.porte}
                                itens={itensPorte}
                                onValueChange={this.onChangePorte}
                            />
                            <Field name='resumo' label='Resumo' component={TextInputBaseRedux} />
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Button full light style={{ marginTop: 20 }} onPress={handleSubmit(this.onSubmit)}>
                                <Text>Salvar</Text>
                            </Button>
                        </Body>
                        {/* <Left />
                        <Right>
                            <Button block light>
                                <Text style={{ color: Colors.black, fontWeight: 'bold' }}>Editar</Text>
                            </Button>
                        </Right> */}

                    </CardItem>
                </Card>
            </ScrollView>
        );
    }
}

CadastroPetPage.propTypes = {
    user: PropTypes.object,
    doacaoRequest: PropTypes.func,
    resetRedux: PropTypes.func,
    loading: PropTypes.bool,
    errorMessage: PropTypes.string,
    message: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
    user: selectorsSession.selectorSessionUser(),
    loading: selectors.selectorLoading(),
    message: selectors.selectorMessage(),
    errorMessage: selectors.selectorErroMessage(),
});

const mapDispatchToProps = (dispatch) => ({
    doacaoRequest: (payload) => dispatch(PerfilActions.doacaoRequest(payload)),
    resetRedux: () => dispatch(PerfilActions.resetRedux()),
});

const validate = createValidator({
    email: [required],
    password: [required],
});


const cadastroPetPage = connect(mapStateToProps, mapDispatchToProps)(CadastroPetPage);
export default reduxForm({ form: 'cadastroPetPage', validate, })(cadastroPetPage);
