import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight } from 'react-native';
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
    Thumbnail
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createStructuredSelector } from 'reselect';
import Reactotron from 'reactotron-react-native';
import HomeActions from '../../Stores/Home/actions';
import * as selectors from '../../Stores/Home/selector';

class HomePage extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <Text style={{ color: '#fff' }}>Adota ai</Text>,
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
                    onPress={() => navigation.toggleDrawer()}
                    underlayColor={'#e5e5e5'}
                >
                    <MaterialIcons
                        name="menu"
                        size={35}
                        color={'#fff'}
                        style={{ marginRight: 5 }}
                    />
                </TouchableHighlight>
            </View>
    });

    componentWillMount() {
        const { fetchDoadores } = this.props;
        fetchDoadores();
        Reactotron.log('chamou o will mount');
    }

    componentWillUpdate(nextProps) {
        const { listaDoadores, changeLoading, loading, getImagemPet } = nextProps;

        // console.log('--------');
        // console.log(listaDoadores);
        if (listaDoadores && loading) {
            let completGetUrlImagens = true;
            for (const obj of listaDoadores) {
                Reactotron.log(obj);
                if (!obj.imagemUrl) {
                    completGetUrlImagens = false;
                    getImagemPet(obj);
                }
            }
            // console.log(completGetUrlImagens);
            changeLoading(completGetUrlImagens);
        }
    }


    onToggleDrawer = () => {
        const { initReducer } = this.props;
        initReducer();
        this.props.navigation.navigate('detailStack');
        this.props.navigation.toggleDrawer();
    }

    render() {
        const { loading, listaDoadores } = this.props;
        let cards;

        if (listaDoadores) {
            cards = listaDoadores.map((obj, key) =>
                <Card key={key}>
                    <CardItem>
                        {
                            obj.imagemUrl === 'não encontrado' ?
                                <MaterialIcons
                                    name="pets"
                                    size={30}
                                    style={{ margin: 12 }}
                                /> :
                                <Thumbnail source={{ uri: obj.imagemUrl }} />
                        }
                        <Text style={{ paddingLeft: 10 }}>{obj.pessoaDoadora}</Text>
                        <Right>
                            {/* <Button transparent >
                                <Icon name="arrow-forward" />
                            </Button> */}
                            <Button iconRight rounded info onPress={() => this.props.navigation.navigate('detailStack', { doador: obj })}>
                                <Text>Ver</Text>
                                <Icon name="arrow-forward" />
                            </Button>
                        </Right>
                    </CardItem>
                </Card>
            );
        }
        // if (loading) {
        //     return <Spinner />;
        // }
        return (
            <Container>
                <Content>
                    {loading ? <Spinner /> : cards}
                </Content>
            </Container>
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
