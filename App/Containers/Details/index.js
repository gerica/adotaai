import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, Text } from 'native-base';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import * as selectorsSession from '../../Stores/Session/selector';
import { InfoReacao, Title, Subtitle } from './styles';
import { getNaoDefinido } from '../../Assets/Images';
import Colors from '../../Theme/Colors';

class DetailsPage extends Component {

    getPhoto() {
        const { navigation } = this.props;
        const doador = navigation.getParam('doador');
        if (doador) {
            if (doador.photo) {
                return (
                    <Thumbnail source={{ uri: doador.photo }} style={{ height: 50, width: 50, marginRight: 5 }} />
                );
            }
            return <Icon type="Ionicons" name="person" style={{ marginRight: 10, color: Colors.black }} />;
        }
        return null;
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
                descTime = `${diffMinutes} minuto(s) atrás`;
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
                            <Image source={getNaoDefinido()} style={{ width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent>
                                    <Icon active name="thumbs-up" />
                                    <InfoReacao>12 </InfoReacao>
                                </Button>
                                <Button transparent>
                                    <Icon active name="chatbubbles" />
                                    <InfoReacao>4 Comentários</InfoReacao>
                                </Button>
                            </Left>
                            <Body>
                                <Button block success>
                                    <Text>Adotar</Text>
                                </Button>
                            </Body>

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
