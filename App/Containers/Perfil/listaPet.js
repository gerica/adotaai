import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardItem, Right, Button, Icon, Thumbnail, Container, Content, Text } from 'native-base';
import { createStructuredSelector } from 'reselect';

import HomeActions from '../../Stores/Home/actions';
import { ContainerPerfil, TextItem } from './styles';
import * as selectors from '../../Stores/Home/selector';
import { getMiniatura } from '../../Assets/Images';
import * as selectorsSession from '../../Stores/Session/selector';

class ListaPetPage extends Component {

    getThumbnail(doador) {
        const objImg = getMiniatura(doador);
        if (objImg) {
            return <Thumbnail source={objImg.img} />;
        }
        return <Icon type="MaterialIcons" name="pets" />;
    }

    render() {
        const { listaDoadores, user } = this.props;
        let cards;

        if (listaDoadores) {
            cards = listaDoadores.filter(f => f.user && f.user.id === user.user.id).map((obj, key) =>
                <Card key={key}>
                    <CardItem>
                        {this.getThumbnail(obj)}
                        <TextItem>{obj.nome}</TextItem>
                        <Right>
                            <Button
                                iconRight
                                rounded
                                info
                                success
                                onPress={() => this.props.navigation.navigate('detailStack', {
                                    doador: obj,
                                    iconCustom: <Icon name="arrow-back" style={{ marginLeft: 5, fontSize: 35, color: '#fff' }} />,
                                    onPressCustom: 'goBack',
                                })}
                            >
                                <Text>Editar</Text>
                                <Icon type="FontAwesome" name="edit" />
                            </Button>
                        </Right>
                    </CardItem>
                </Card>
            );
        }
        return (
            <ContainerPerfil>
                <Container>
                    <Content>
                        {cards || null}
                    </Content>
                </Container>
            </ContainerPerfil>
        );
    }
}

ListaPetPage.propTypes = {
    listaDoadores: PropTypes.array,
    user: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    listaDoadores: selectors.selectorListaDoadores(),
    user: selectorsSession.selectorSessionUser(),
});

const mapDispatchToProps = (dispatch) => ({
    initReducer: () => dispatch(HomeActions.initReducer()),
});


export default connect(mapStateToProps, mapDispatchToProps)(ListaPetPage);
