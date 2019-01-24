import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight, Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, } from 'native-base';


import HomeActions from '../../Stores/Home/actions';
import ApplicationStyles from '../../Theme/ApplicationStyles';


const styles = {
    container: {
        ...ApplicationStyles.screen.container,
    },
};

class DetailsPage extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <Text style={{ color: '#fff' }}>Voltar</Text>,
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
        console.log(doador);
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{ uri: doador.imagemUrl }} />
                                <Body>
                                    <Text>{doador.descricao}</Text>
                                    <Text note>{doador.pessoaDoadora}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{ uri: doador.imagemUrl }} style={{ height: 425, width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent>
                                    <Icon active name="thumbs-up" />
                                    <Text>12 Gostou</Text>
                                </Button>
                            </Left>
                            <Body>
                                <Button transparent>
                                    <Icon active name="chatbubbles" />
                                    <Text>4 Coment.</Text>
                                </Button>
                            </Body>
                            <Right>
                                <Text>11h atrás</Text>
                            </Right>
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
