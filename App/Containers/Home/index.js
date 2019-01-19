import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import HomeActions from '../../Stores/Home/actions';

// import injectReducer from '../../utils/injectReducer';
// import injectSaga from '../../utils/injectSaga';
import ApplicationStyles from '../../Theme/ApplicationStyles';
// import reducer from './reducer';
// import saga from './saga';


const styles = {
    container: {
        ...ApplicationStyles.screen.container,
    },
};

class HomePage extends Component {

    onPressLearnMore = () => {
        // console.log('está no componente');
        const { initReducer } = this.props;
        initReducer();
        // this.props.navigation.navigate('detailStack');
        this.props.navigation.toggleDrawer();
    }

    render() {
        return (
            <View style={styles.container}>
                < Text >
                    Tela inicial Vamos ver tudo isso junto
                    </Text>
                <Button
                    onPress={this.onPressLearnMore}
                    title="Ir para outra tela"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View >
        );
    }
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
