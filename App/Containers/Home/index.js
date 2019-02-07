/* eslint-disable global-require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationEvents } from 'react-navigation';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {
    Container,
    Content,
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
import HomeActions from '../../Stores/Home/actions';
import * as selectors from '../../Stores/Home/selector';
import { TextItem } from './styles';
import { getMiniatura } from '../../Assets/Images';
import Toast from '../../Components/toast/Toast';
import { NAVIGATON_NAVIGATE } from '../../Utils/constants';

class HomePage extends Component {

    componentWillMount() {
        const { fetchDoadoresAberto, reset } = this.props;
        fetchDoadoresAberto();
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
        const { loading, listaDoadores, errorMessage } = this.props;
        let cards;

        if (errorMessage) {
            Toast({ visible: true, message: errorMessage.msg || 'Erro ao processar' });
        }

        if (listaDoadores && listaDoadores.length > 0) {
            cards = listaDoadores.map((obj, key) =>
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
                <Container>
                    <Content>
                        {loading ? <Spinner /> : cards}
                    </Content>
                </Container>
            </ScrollView>
        );
    }
}


HomePage.propTypes = {
    initReducer: PropTypes.func,
    fetchDoadoresAberto: PropTypes.func,
    getImagemPet: PropTypes.func,
    changeLoading: PropTypes.func,
    loading: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    listaDoadores: PropTypes.array,
    imagemPet: PropTypes.array,
    errorMessage: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
};

const mapStateToProps = createStructuredSelector({
    listaDoadores: selectors.selectorListaDoadoresAberto(),
    // form: selectors.selectorForm(),
    loading: selectors.selectorLoading(),
    imagemPet: selectors.selectorImagemPet(),
    errorMessage: selectors.selectorErrorMessage(),
});

const mapDispatchToProps = (dispatch) => ({
    fetchDoadoresAberto: () => dispatch(HomeActions.fetchDoadoresAbertoRequest()),
    getImagemPet: (obj) => dispatch(HomeActions.getImagemPet(obj)),
    changeLoading: (value) => dispatch(HomeActions.changeLoading(value)),
    reset: () => dispatch(HomeActions.reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
