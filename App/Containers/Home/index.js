import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Left,
    Right,
    Body,
    Text,
    Footer,
    FooterTab,
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
        // this.props.navigation.navigate('detailStack');
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
                            <Icon name="arrow-forward" />
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
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={this.onToggleDrawer}
                        >
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Adota ai!</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    {loading ? <Spinner /> : cards}
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full>
                            <Text>Footer</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
    // render() {
    //     return (
    //         <View style={styles.container}>
    //             <Button
    //                 onPress={this.onPressLearnMore}
    //                 title="Ir para outra tela"
    //                 color="#841584"
    //                 accessibilityLabel="Learn more about this purple button"
    //             />
    //         </View >
    //     );
    // }
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
