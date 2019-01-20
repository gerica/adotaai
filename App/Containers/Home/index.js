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
    Thumbnail
} from 'native-base';
import HomeActions from '../../Stores/Home/actions';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { uriDog: false };
    }

    componentWillMount() {
        const { fetchDoadores } = this.props;
        // console.log(fetchDoadores);
        fetchDoadores();
        // const filePath = 'racas/Akita-2-100x100.jpg';
        // const ref = firebase.storage().ref(filePath);
        // ref.getDownloadURL().then((url) => {
        //     this.setState({ uriDog: url });
        // });

        // const ref = firebase.database().ref('listaDoacao');
        // firebase.database().ref('listaDoacao/').once('value', (snapshot) => {
        //     // console.log(snapshot);
        //     // console.log(snapshot.val());
        //     const data = snapshot.val();
        //     const items = Object.values(data);
        //     this.setState({ items });
        // });
    }

    onToggleDrawer = () => {
        // console.log('está no componente');
        const { initReducer } = this.props;
        initReducer();
        // this.props.navigation.navigate('detailStack');
        this.props.navigation.toggleDrawer();
    }
    render() {
        console.log(this.state);
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
                    <Card>
                        <CardItem>
                            {/* <Icon active name="logo-googleplus" /> */}
                            {this.state.uriDog ?
                                <Thumbnail source={{ uri: this.state.uriDog }} />
                                : null}
                            <Text>Google Plus</Text>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </CardItem>
                    </Card>
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
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    initReducer: () => dispatch(HomeActions.initReducer()),
    fetchDoadores: () => dispatch(HomeActions.fetchDoadores()),
});

// const withConnect = connect(mapStateToProps, mapDispatchToProps);
// const withReducer = injectReducer({ key: 'home', reducer });
// const withSaga = injectSaga({ key: 'home', saga });

// export default compose(withReducer, withSaga, withConnect)(HomePage);
// export default compose(withConnect)(HomePage);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
