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
import { createStructuredSelector } from 'reselect';
import HomeActions from '../../Stores/Home/actions';
import * as selectors from '../../Stores/Home/selector';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { uriDog: false };
    }

    componentWillMount() {
        const { fetchDoadores } = this.props;
        fetchDoadores();
    }

    onToggleDrawer = () => {
        const { initReducer } = this.props;
        initReducer();
        // this.props.navigation.navigate('detailStack');
        this.props.navigation.toggleDrawer();
    }

    getImagemPet(filePath) {
        const { getImagemPet, imagemPet } = this.props;
        if (imagemPet) {
            const temp = imagemPet.find((e) => e.key === filePath);
            if (temp) {
                return temp.img;
            }
            // return null;
        }
        getImagemPet(filePath);
        return null;
    }

    // getImagemPet(filePath) {
    // const { imagemPet } = this.props;
    // if (imagemPet) {
    //     return imagemPet.find((e) => e.filePath === filePath);
    // }
    // return null;
    // getImagemPet(filePath);
    // }

    render() {
        const { loading, listaDoadores } = this.props;
        if (loading) {
            return <Spinner />;
        }
        let cards;

        if (listaDoadores) {
            cards = listaDoadores.map((obj, key) =>
                <Card key={key}>
                    <CardItem>
                        {/* <Icon active name="logo-googleplus" /> */}
                        {
                            this.getImagemPet(obj.imagen) ?
                                <Thumbnail source={{ uri: this.getImagemPet(obj.imagen) }} /> : null
                        }
                        <Text>{obj.pessoaDoadora}</Text>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </CardItem>
                </Card>
            );
        }
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
                    {cards}
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
    getImagemPet: (filePath) => dispatch(HomeActions.getImagemPet(filePath)),
});

// const withConnect = connect(mapStateToProps, mapDispatchToProps);
// const withReducer = injectReducer({ key: 'home', reducer });
// const withSaga = injectSaga({ key: 'home', saga });

// export default compose(withReducer, withSaga, withConnect)(HomePage);
// export default compose(withConnect)(HomePage);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
