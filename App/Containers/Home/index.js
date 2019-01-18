import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import { connect, compose } from 'react-redux';

// import injectReducer from '../../utils/injectReducer';
// import injectSaga from '../../utils/injectSaga';
import { ApplicationStyles } from '../../theme';
// import reducer from './reducer';
// import saga from './saga';
import StartupActions from './actions';

const styles = {
    container: {
        ...ApplicationStyles.screen.container,
    },
};

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { isShowingText: true };
    }
    onPressLearnMore = () => {
        console.log('está no componente');
        const { startup } = this.props;
        this.setState({ isShowingText: !this.state.isShowingText });
        startup();
    }

    render() {
        const { isShowingText } = this.state;
        return (
            <View style={styles.container}>
                {isShowingText ?
                    < Text >
                        Tela inicial Vamos ver tudo isso junto
                    </Text>
                    : null
                }
                <Button
                    onPress={this.onPressLearnMore}
                    title="Toggle Texto"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View >
        );
    }
}


HomePage.propTypes = {
    startup: PropTypes.func,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    startup: () => dispatch(StartupActions.startup()),
});

// const withConnect = connect(mapStateToProps, mapDispatchToProps);
// const withReducer = injectReducer({ key: 'home', reducer });
// const withSaga = injectSaga({ key: 'home', saga });

// export default compose(withReducer, withSaga, withConnect)(HomePage);
// export default compose(withConnect)(HomePage);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
