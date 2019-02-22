import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View, Dimensions, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, Text } from 'native-base';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import * as selectorsSession from '../../Stores/Session/selector';
import { InfoReacao, Title, Subtitle } from './styles';
import { getMiniatura } from '../../Assets/Images';
import Colors from '../../Theme/Colors';

const { width } = Dimensions.get('window');

class DetailsPage extends Component {

    getPhoto() {
        const { navigation } = this.props;
        const doador = navigation.getParam('doador');
        if (doador) {
            if (doador.user.photo) {
                return (
                    <Thumbnail source={{ uri: doador.user.photo }} style={{ height: 50, width: 50, marginRight: 5 }} />
                );
            }
            return <Icon type="Ionicons" name="person" style={{ marginRight: 10, color: Colors.black }} />;
        }
        return null;
    }

    getThumbnail(doador) {
        if (!doador) {
            return <Icon type="MaterialIcons" name="pets" />;
        }
        const objImg = getMiniatura(doador);
        if (objImg) {
            return (
                <View style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Image source={objImg.img} style={{ width: width - 30, height: 280 }} />
                </View>
            );
        }
        return <Icon type="MaterialIcons" name="pets" />;
    }

    getButtons() {
        const { user, navigation } = this.props;
        const doador = navigation.getParam('doador');
        if (user) {
            return (
                <Button
                    block
                    success
                    onPress={() => this.contactar('Olá, Gostaria de adotar seu pet.', doador)}
                >
                    <Text>Contactar</Text>
                </Button>
            );
        }

        return (
            <Button block info onPress={() => navigation.navigate('Login')}>
                <Text>Logar</Text>
            </Button>
        );
    }

    contactar = (text, doador) => {
        const { user } = doador;
        if (user.contato) {
            Linking.openURL(`whatsapp://send?text=${text}&phone=${user.contato}`);
        } else {
            Linking.openURL(`mailto:${user.email}?subject=Adota ai&body=${text}`);
        }
    }

    render() {
        const { navigation } = this.props;
        const doador = navigation.getParam('doador');
        // console.log(doador);
        const dtInicio = moment(doador.updatedA);
        const dtFinal = moment(new Date());
        const diffDias = moment.duration(dtFinal.diff(dtInicio));
        let descTime;
        const diffDays = Math.floor(diffDias.asDays());
        if (diffDays > 0) {
            descTime = `${diffDays} dia atrás`;
        } else {
            const diffHours = Math.floor(diffDias.asHours());
            if (diffHours > 0) {
                descTime = `${diffHours} hora(s) atrás`;
            } else {
                const diffMinutes = Math.floor(diffDias.asMinutes());
                descTime = `${diffMinutes} min(s) atrás`;
            }
        }

        // console.log(doador);
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                {this.getPhoto()}
                            </Left>

                            <View style={{ borderWidth: 0, width: '70%' }}>

                                <Title>{doador.nome}</Title>
                                <Subtitle note>{doador.user.name}</Subtitle>
                                <Subtitle note>{doador.user.email}</Subtitle>
                            </View>

                            <Right>
                                <InfoReacao>{descTime}</InfoReacao>
                            </Right>
                        </CardItem>
                        <CardItem cardBody>
                            {/* <Image source={getNaoDefinido()} style={{ width: null, flex: 1 }} /> */}
                            {this.getThumbnail(doador)}
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Icon type="MaterialIcons" active name="pets" style={{ color: Colors.primary }} />
                                {/* <Button transparent>
                                    <Icon active name="thumbs-up" />
                                    <InfoReacao>{Math.floor(Math.random() * 10) * 3} </InfoReacao>
                                </Button> */}
                                {/* <Button transparent>
                                    <Icon active name="chatbubbles" />
                                    <InfoReacao>4 Comentários</InfoReacao>
                                </Button> */}
                            </Left>
                            <Body>
                                {this.getButtons()}
                            </Body>
                        </CardItem>
                        <CardItem>
                            <View style={{ width: '100%' }}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View >
                                        <Title>Nome: {doador.nome}</Title>
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
                    </Card>
                </Content>
            </Container>
        );
    }
}

DetailsPage.propTypes = {
    initReducer: PropTypes.func,
    user: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    user: selectorsSession.selectorSessionUser(),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
