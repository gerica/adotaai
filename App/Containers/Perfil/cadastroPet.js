import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button, Spinner, Card, CardItem, Body } from 'native-base';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
// import { NavigationActions, StackActions } from 'react-navigation';

import * as selectorsSession from '../../Stores/Session/selector';
import { ContainerPetCadastro } from './styles';
import { createValidator, required, } from '../../Utils/validation';
import PickerRedux from '../../Components/input/PickerRedux';
import TextInputBaseRedux from '../../Components/input/TextInputBaseRedux';
import racasCao from '../../Assets/Images/racasCao';
import racasGato from '../../Assets/Images/racasGato';
import PetActions from '../../Stores/Pet/actions';
import * as selectors from '../../Stores/Pet/selector';
import Toast from '../../Components/toast/Toast';
import { tipos } from '../../Assets/Images';

const itensTipo = [{ label: 'Cão', value: tipos[0] }, { label: 'Gato', value: tipos[1] }];
const itensSexo = [{ label: 'Macho', value: 'macho' }, { label: 'Femea', value: 'femea' }];
const itensSN = [{ label: 'Sim', value: 'sim' }, { label: 'Não', value: 'nao' }];
const itensPorte = [{ label: 'Pequeno', value: 'pequeno' }, { label: 'Médio', value: 'medio' }, { label: 'Grande', value: 'grande' }];
class CadastroPetPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tipo: tipos[0],
            sexo: 'macho',
            castrado: 'nao',
            vermifugado: 'nao',
            porte: 'medio',
            raca: 'Selecione',
        };
        // this.onChangeTipo = this.onChangeTipo.bind(this);
    }

    componentWillMount() {
        const { reset, resetRedux } = this.props;
        reset();
        resetRedux();
    }

    shouldComponentUpdate(nextProps) {
        const { message, error, resetRedux, navigation } = nextProps;
        const msgToast = message || (error && error.code);
        if (msgToast) {
            Toast({ visible: true, message: msgToast });
        }
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
            });
            navigation.navigate('listaStack');
            return true;
        }
        return true;
    }

    onSubmit = (values) => {
        const { tipo, sexo, castrado, vermifugado, porte, raca } = this.state;
        const { cadastroDoacaoRequest, user: { user } } = this.props;
        const newObj = {
            createdAt: new Date(),
            updatedA: new Date(),
            user,
            ...values,
            tipo,
            sexo,
            castrado,
            vermifugado,
            porte,
            raca,
            status: 'aberto',
        };
        cadastroDoacaoRequest(newObj);
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
        this.setState({ raca: value });
    }

    getRacas() {
        if (this.state.tipo === tipos[0]) {
            const itensRaca = racasCao.map((e) => ({ label: e.raca, value: e.raca }));
            return (<Field
                name='raca'
                label='Raça'
                component={PickerRedux}
                selected={this.state.raca}
                itens={itensRaca}
                onValueChange={this.onChangeRaca}
            />);
        } else if (this.state.tipo === tipos[1]) {
            const itensRaca = racasGato.map((e) => ({ label: e.raca, value: e.raca }));
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
        const { handleSubmit, loading } = this.props;

        if (loading) {
            return (
                <ContainerPetCadastro>
                    <Spinner />
                </ContainerPetCadastro>
            );
        }

        return (
            <ScrollView>
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
                    </CardItem>
                </Card>
            </ScrollView>
        );
    }
}

CadastroPetPage.propTypes = {
    user: PropTypes.object,
    cadastroDoacaoRequest: PropTypes.func,
    resetRedux: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    message: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
    user: selectorsSession.selectorSessionUser(),
    loading: selectors.selectorLoading(),
    message: selectors.selectorMessage(),
    error: selectors.selectorError(),
});

const mapDispatchToProps = (dispatch) => ({
    cadastroDoacaoRequest: (payload) => dispatch(PetActions.cadastroDoacaoRequest(payload)),
    resetRedux: () => dispatch(PetActions.resetRedux()),
});

const validate = createValidator({
    email: [required],
    password: [required],
});


const cadastroPetPage = connect(mapStateToProps, mapDispatchToProps)(CadastroPetPage);
export default reduxForm({ form: 'cadastroPetPage', validate, })(cadastroPetPage);
