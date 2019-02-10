/* eslint-disable global-require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationEvents } from 'react-navigation';
import { View, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import {
    Button,
    Icon,
    Right,
    Text,
    Card,
    CardItem,
    Spinner,
    Thumbnail,
    Body,

} from 'native-base';
import { createStructuredSelector } from 'reselect';
import Reactotron from 'reactotron-react-native';
import PetActions from '../../Stores/Pet/actions';
import * as selectors from '../../Stores/Pet/selector';
import { TextItem, ViewCards } from './styles';
import { getMiniatura } from '../../Assets/Images';
import Toast from '../../Components/toast/Toast';
import { NAVIGATON_NAVIGATE } from '../../Utils/constants';

const { width } = Dimensions.get('window');
class HomePage extends Component {

    componentWillMount() {
        const { fetchPetAbertoRequest, reset } = this.props;
        fetchPetAbertoRequest();
        reset();
        Reactotron.log('chamou o will mount');
    }

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

    getRacaDescricao(raca) {
        if (raca) {
            return raca.length > 10 ? `${raca.substr(0, 10)}...` : raca;
        }
        return '';
    }

    componentFocus = ({ action: { type } }) => {
        const { navigation } = this.props;
        if (type && type === NAVIGATON_NAVIGATE) {
            const msgToast = navigation.getParam('msg');
            if (msgToast) {
                navigation.navigate('homeStack', { msg: null });
                Toast({ visible: true, message: msgToast });
            }
        }
    }

    render() {
        const { loading, listaPetAberto, error } = this.props;
        let cards;

        if (error) {
            Toast({ visible: true, message: error.msg || 'Erro ao processar' });
        }

        if (listaPetAberto && listaPetAberto.length > 0) {
            cards = listaPetAberto.map((obj, key) =>
                <Card key={key} style={{ width: ((width - 20) / 2) }}>
                    <CardItem>
                        {this.getThumbnail(obj)}
                        <TextItem>{this.getRacaDescricao(obj.raca)}</TextItem>
                    </CardItem>
                    <CardItem>
                        <View style={{ display: 'flex' }}>
                            <TextItem>Nome: {obj.nome}</TextItem>
                            <TextItem>Doador: {obj.user && obj.user.name}</TextItem>
                        </View>
                    </CardItem>
                    <CardItem>
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
                                <Text>Ver</Text>
                                <Icon name="arrow-forward" />
                            </Button>
                        </Right>
                    </CardItem>
                </Card>
            );
        } else {
            cards = (<Card>
                <CardItem header>
                    {this.getThumbnail()}
                    <Text>Faça a doação do seu pet.</Text>
                </CardItem>
                <CardItem>
                    <Body>
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
            <ScrollView>
                <NavigationEvents onWillFocus={payload => this.componentFocus(payload)} />
                <ViewCards>
                    {loading ? <Spinner /> : cards}
                </ViewCards>
            </ScrollView>
        );
    }
}


HomePage.propTypes = {
    fetchPetAbertoRequest: PropTypes.func,
    loading: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    listaPetAberto: PropTypes.array,
    error: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
};

const mapStateToProps = createStructuredSelector({
    listaPetAberto: selectors.selectorListaPetAberto(),
    // form: selectors.selectorForm(),
    loading: selectors.selectorLoading(),
    error: selectors.selectorError(),
});

const mapDispatchToProps = (dispatch) => ({
    fetchPetAbertoRequest: () => dispatch(PetActions.fetchPetAbertoRequest()),
    reset: () => dispatch(PetActions.resetRedux()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
