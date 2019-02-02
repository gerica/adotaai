import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import { createStructuredSelector } from 'reselect';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Field, reduxForm } from 'redux-form';

import * as selectorsSession from '../../Stores/Session/selector';
import HomeActions from '../../Stores/Home/actions';
import { TextHeader } from '../styles';
import { ContainerPetCadastro } from './styles';
import { createValidator, required, } from '../../Utils/validation';
import PickerRedux from '../../Components/input/PickerRedux';
import TextInputBaseRedux from '../../Components/input/TextInputBaseRedux';

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
            tipo: 'cao',
            sexo: 'macho',
            castrado: 'nao',
            vermifugado: 'nao',
            porte: 'medio',
        };
        // this.onChangeTipo = this.onChangeTipo.bind(this);
    }

    onSubmit = (values) => {
        const { tipo, sexo, castrado, vermifugado, porte } = this.state;
        const newObj = {
            createdAt: new Date(),
            updatedA: new Date(),
            user: this.props.user,
            ...values,
            tipo,
            sexo,
            castrado,
            vermifugado,
            porte
        };
        console.log(newObj);
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

    render() {
        const { handleSubmit } = this.props;
        const itensTipo = [{ label: 'Cão', value: 'cao' }, { label: 'Gato', value: 'gato' }];
        const itensSexo = [{ label: 'Macho', value: 'macho' }, { label: 'Femea', value: 'femea' }];
        const itensSN = [{ label: 'Sim', value: 'sim' }, { label: 'Não', value: 'nao' }];
        const itensPorte = [{ label: 'Pequeno', value: 'pequeno' }, { label: 'Médio', value: 'medio' }, { label: 'Grande', value: 'grande' }];

        return (
            <ContainerPetCadastro>
                <Field name='nome' label='Nome' component={TextInputBaseRedux} />
                <Field
                    name='tipo'
                    label='Tipo'
                    component={PickerRedux}
                    selected={this.state.tipo}
                    itens={itensTipo}
                    onValueChange={this.onChangeTipo}
                />
                <Field
                    name='sexho'
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
                <Button full light style={{ marginTop: 20 }} onPress={handleSubmit(this.onSubmit)}>
                    <Text>Salvar</Text>
                </Button>
            </ContainerPetCadastro>
        );
    }
}

CadastroPetPage.propTypes = {
};

const mapStateToProps = createStructuredSelector({
    user: selectorsSession.selectorSessionUser(),
});

const mapDispatchToProps = (dispatch) => ({
    initReducer: () => dispatch(HomeActions.initReducer()),
});

const validate = createValidator({
    email: [required],
    password: [required],
});


const cadastroPetPage = connect(mapStateToProps, mapDispatchToProps)(CadastroPetPage);
export default reduxForm({ form: 'cadastroPetPage', validate, })(cadastroPetPage);
