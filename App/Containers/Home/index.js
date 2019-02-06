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

} from 'native-base';
import { createStructuredSelector } from 'reselect';
import Reactotron from 'reactotron-react-native';
import HomeActions from '../../Stores/Home/actions';
import * as selectors from '../../Stores/Home/selector';
import { TextItem } from './styles';
import { getMiniatura } from '../../Assets/Images';
import Toast from '../../Components/toast/Toast';

class HomePage extends Component {

    componentWillMount() {
        const { fetchDoadores } = this.props;
        fetchDoadores();
        Reactotron.log('chamou o will mount');
    }

    getThumbnail(doador) {
        const objImg = getMiniatura(doador);
        if (objImg) {
            return <Thumbnail source={objImg.img} />;
        }
        return <Icon type="MaterialIcons" name="pets" />;
    }

    componentFocus = ({ action: { type } }) => {
        const { navigation } = this.props;
        // console.log(msgToast);
        if (type && type === 'Navigation/NAVIGATE') {
            const msgToast = navigation.getParam('msg');
            console.log(msgToast);
            if (msgToast) {
                navigation.navigate('homeStack', { msg: null });
                Toast({ visible: true, message: msgToast });
            }
        }
    }

    render() {
        const { loading, listaDoadores } = this.props;
        let cards;

        if (listaDoadores) {
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
        }
        return (
            <ScrollView>
                <NavigationEvents
                    onWillFocus={payload => this.componentFocus(payload)}
                />
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
    fetchDoadores: PropTypes.func,
    getImagemPet: PropTypes.func,
    changeLoading: PropTypes.func,
    loading: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    listaDoadores: PropTypes.array,
    imagemPet: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
    listaDoadores: selectors.selectorListaDoadores(),
    // form: selectors.selectorForm(),
    // form: selectors.selectorForm(),
    loading: selectors.selectorLoading(),
    imagemPet: selectors.selectorImagemPet(),
});

// function mapStateToProps(state) {
//     console.log('estou no state to props');
//     console.log(state);
//     console.log('-------');
//     return {
//         nameAsProps: state.username,
//     };
// }

const mapDispatchToProps = (dispatch) => ({
    initReducer: () => dispatch(HomeActions.initReducer()),
    fetchDoadores: () => dispatch(HomeActions.fetchDoadores()),
    getImagemPet: (obj) => dispatch(HomeActions.getImagemPet(obj)),
    changeLoading: (value) => dispatch(HomeActions.changeLoading(value)),
});

// const withConnect = connect(mapStateToProps, mapDispatchToProps);
// const withReducer = injectReducer({ key: 'home', reducer });
// const withSaga = injectSaga({ key: 'home', saga });

// export default compose(withReducer, withSaga, withConnect)(HomePage);
// export default compose(withConnect)(HomePage);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
