import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Card, CardItem, Button, Icon, Body, Text, Spinner } from 'native-base';
import { createStructuredSelector } from 'reselect';

import { getMiniatura } from '../../Assets/Images';
import PetActions from '../../Stores/Pet/actions';
import { STATUS } from '../../Utils/constants';
import Toast from '../../Components/toast/Toast';
import * as selectorsPet from '../../Stores/Pet/selector';

const { width } = Dimensions.get('window');

class EditarPetPage extends Component {

    shouldComponentUpdate(nextProps) {
        const { message, error, navigation } = nextProps;
        const msgToast = message || (error && error.code);
        if (msgToast) {
            navigation.goBack();
            Toast({ visible: true, message: msgToast });
        }
        return true;
    }

    getImage(pet) {
        const objImg = getMiniatura(pet);
        if (objImg) {
            return (
                <View style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Image source={objImg.img} style={{ width: width - 30, height: 280 }} />
                </View>
            );
        }
        return <Icon type="MaterialIcons" name="pets" />;
    }
    getButtons(doador) {
        const { updateDoacaoInfoRequest } = this.props;
        return (
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>


                {doador.status !== 'aberto' &&
                    <Button info onPress={() => updateDoacaoInfoRequest({ doacao: doador, status: STATUS[0] })}>
                        <Text>Abrir</Text>
                    </Button>
                }

                {doador.status === 'aberto' &&
                    <Button success onPress={() => updateDoacaoInfoRequest({ doacao: doador, status: STATUS[2] })}>
                        <Text>Doar</Text>
                    </Button>
                }

                {doador.status === 'aberto' &&
                    <Button warning onPress={() => updateDoacaoInfoRequest({ doacao: doador, status: STATUS[1] })}>
                        <Text>Fechar</Text>
                    </Button>
                }

                {(doador.status === 'aberto' || doador.status === 'fechado') &&
                    <Button danger onPress={() => updateDoacaoInfoRequest({ doacao: doador, status: STATUS[3] })}>
                        <Text>Apagar</Text>
                    </Button>
                }

            </View>
        );
    }


    render() {
        const { navigation, loading } = this.props;
        const doador = navigation.getParam('doador');
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem cardBody>
                            {this.getImage(doador)}
                        </CardItem>
                        <CardItem>
                            <View style={{ width: '100%' }}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View >
                                        <Text>Nome: {doador.nome}</Text>
                                        <Text>Porte: {doador.porte}</Text>
                                        <Text>Raça: {doador.raca}</Text>
                                    </View>
                                    <View>
                                        <Text>Sexo: {doador.sexo}</Text>
                                        <Text>Castrado: {doador.castrado}</Text>
                                        <Text>Vermifugado: {doador.vermifugado}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text>Resumo: {doador.resumo}</Text>
                                </View>
                            </View>

                        </CardItem>
                        <CardItem>
                            <Body>
                                {loading ? <Spinner /> : this.getButtons(doador)}
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

EditarPetPage.propTypes = {
    user: PropTypes.object,
    updateDoacaoInfoRequest: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    message: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
    loading: selectorsPet.selectorLoading(),
    message: selectorsPet.selectorMessage(),
    error: selectorsPet.selectorError(),
});

const mapDispatchToProps = (dispatch) => ({
    updateDoacaoInfoRequest: (payload) => dispatch(PetActions.updateDoacaoInfoRequest(payload)),
});


export default connect(mapStateToProps, mapDispatchToProps)(EditarPetPage);
