import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight, Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, Text } from 'native-base';

import HomeActions from '../../Stores/Home/actions';

import { InfoReacao, Title, Subtitle } from './styles';
import { TextHeader } from '../styles';
import { getNaoDefinido } from '../../Assets/Images';

class DetailsPage extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <TextHeader style={{ color: '#fff' }}>Voltar</TextHeader>,
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
                    onPress={() => navigation.goBack()}
                    underlayColor={'#e5e5e5'}
                ><Icon name="arrow-back" style={{ marginLeft: 5, fontSize: 35, color: '#fff' }} />
                </TouchableHighlight>
            </View>
    });

    backPage = () => {
        // this.props.navigation.goBack();
        this.props.navigation.toggleDrawer();
    }

    render() {
        const { navigation } = this.props;
        const doador = navigation.getParam('doador');
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{ uri: doador.imagemUrl }} />
                                <Body>
                                    <Title>{doador.descricao}</Title>
                                    <Subtitle note>{doador.pessoaDoadora}</Subtitle>
                                </Body>
                            </Left>
                            <Right>
                                <InfoReacao>11h atrás</InfoReacao>
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
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    initReducer: () => dispatch(HomeActions.initReducer()),
});


export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
