import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
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

// import injectReducer from '../../utils/injectReducer';
// import injectSaga from '../../utils/injectSaga';
// import ApplicationStyles from '../../Theme/ApplicationStyles';
// import reducer from './reducer';
// import saga from './saga';


// const styles = {
//     container: {
//         ...ApplicationStyles.screen.container,
//     },
// };

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { uriDog: false };
    }

    componentWillMount() {
        const filePath = 'racas/Akita-2-100x100.jpg';
        const ref = firebase.storage().ref(filePath);
        ref.getDownloadURL().then((url) => {
            this.setState({ uriDog: url });
        });
    }

    onToggleDrawer = () => {
        // console.log('está no componente');
        const { initReducer } = this.props;
        initReducer();
        // this.props.navigation.navigate('detailStack');
        this.props.navigation.toggleDrawer();
    }
    render() {
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
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    initReducer: () => dispatch(HomeActions.initReducer()),
});

// const withConnect = connect(mapStateToProps, mapDispatchToProps);
// const withReducer = injectReducer({ key: 'home', reducer });
// const withSaga = injectSaga({ key: 'home', saga });

// export default compose(withReducer, withSaga, withConnect)(HomePage);
// export default compose(withConnect)(HomePage);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
