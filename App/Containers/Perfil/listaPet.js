import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardItem, Right, Button, Icon, Thumbnail, Container, Content, Text, Body, Spinner, Left } from 'native-base';
import { createStructuredSelector } from 'reselect';
import { NavigationEvents } from 'react-navigation';

import PetActions from '../../Stores/Pet/actions';
import { ContainerPerfil, TextItem } from './styles';
import { getMiniatura } from '../../Assets/Images';
import * as selectorsSession from '../../Stores/Session/selector';
import * as selectorsPet from '../../Stores/Pet/selector';
import { NAVIGATON_NAVIGATE, STATUS } from '../../Utils/constants';
import Colors from '../../Theme/Colors';

class ListaPetPage extends Component {

    getThumbnail(doador) {
        if (!doador) {
            return <Icon type="MaterialIcons" name="pets" />;
        }
        const objImg = getMiniatura(doador);
        if (objImg) {
            return <Thumbnail source={objImg.img} />;
        }
        return <Icon type="MaterialIcons" name="pets" />;
    }

    componentFocus = ({ action: { type } }) => {
        const { fetchPetPorUserRequest, user } = this.props;
        if (user && type && type === NAVIGATON_NAVIGATE) {
            fetchPetPorUserRequest(user);
        }
    }

    render() {
        const { loading, listaPetPorUser, user } = this.props;

        let cards;
        if (!user) {
            return null;
        }
        if (listaPetPorUser && listaPetPorUser.length > 0) {
            cards = listaPetPorUser.map((obj, key) => {
                let iconStatus;
                let infoStatus;
                switch (obj.status) {
                    case STATUS[0]: // ABERTO
                        iconStatus = < Icon type="FontAwesome" name="circle-thin" style={{ fontSize: 20, paddingLeft: 5 }} />;
                        infoStatus = 'Aberto';
                        break;
                    case STATUS[1]: // FECHADO
                        iconStatus = < Icon type="FontAwesome" name="times-circle-o" style={{ fontSize: 20, paddingLeft: 5, color: Colors.cardFailure }} />;
                        infoStatus = 'Fechado';
                        break;
                    case STATUS[2]: // DOADO
                        iconStatus = < Icon type="FontAwesome" name="check-circle-o" style={{ fontSize: 20, paddingLeft: 5, color: Colors.cardSuccess }} />;
                        infoStatus = 'Doado';
                        break;

                    default:
                        break;
                }
                return (<Card key={key} >
                    <CardItem >
                        {/* style={{ backgroundColor: cardColor }} */}
                        <Left>
                            {this.getThumbnail(obj)}
                            <TextItem>{obj.nome}</TextItem>
                        </Left>
                        <Body style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', alignItems: 'center' }}>
                            <Text>{infoStatus}</Text>
                            {iconStatus}
                        </Body>
                        <Right>
                            <Button
                                // iconRight
                                transparent
                                primary
                                info
                                success
                                onPress={() => this.props.navigation.navigate('detailStack', {
                                    doador: obj,
                                    iconCustom: <Icon name="arrow-back" style={{ marginLeft: 5, fontSize: 35, color: '#fff' }} />,
                                    onPressCustom: 'goBack',
                                })}
                            >
                                {/* <Text>Editar</Text> */}
                                <Icon type="FontAwesome" name="edit" />
                            </Button>
                        </Right>
                    </CardItem>
                </Card>);
            }
            );
        } else {
            cards = (<Card>
                <CardItem header>
                    {this.getThumbnail()}
                    <Text>Faça a doação do seu pet.</Text>
                </CardItem>
                <CardItem>
                    <Body >
                        <Text>
                            Caso você não possa ter mais seu pet, por algum motivo pessoal, tipo mudança ou qualquer outro motivo. Doe. Tem sempre um lar esperando por ele.
                        </Text>
                    </Body>
                </CardItem>
                <CardItem footer>
                    <Text>Doe...</Text>
                </CardItem>
            </Card>);
        }
        return (
            <ContainerPerfil>
                <NavigationEvents onWillFocus={payload => this.componentFocus(payload)} />
                <Container>
                    <Content>
                        {loading ? <Spinner /> : cards || null}
                    </Content>
                </Container>
            </ContainerPerfil>
        );
    }
}

ListaPetPage.propTypes = {
    listaPetPorUser: PropTypes.array,
    user: PropTypes.object,
    loading: PropTypes.bool,
    fetchPetPorUserRequest: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
    listaPetPorUser: selectorsPet.selectorListaPetPorUser(),
    loading: selectorsPet.selectorLoading(),
    user: selectorsSession.selectorSessionUser(),
});

const mapDispatchToProps = (dispatch) => ({
    fetchPetPorUserRequest: (user) => dispatch(PetActions.fetchPetPorUserRequest(user)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ListaPetPage);
