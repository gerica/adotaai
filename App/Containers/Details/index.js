import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';

import HomeActions from '../../Stores/Home/actions';
import ApplicationStyles from '../../Theme/ApplicationStyles';


const styles = {
    container: {
        ...ApplicationStyles.screen.container,
    },
};

class DetailsPage extends Component {

    backPage = () => {
        // this.props.navigation.goBack();
        this.props.navigation.toggleDrawer();
    }

    render() {
        return (
            <View style={styles.container}>
                < Text >Detalhar</Text>
                <Button
                    onPress={this.backPage}
                    title="Voltar"
                    color="#841584"
                />
            </View >
        );
    }
}

DetailsPage.propTypes = {
    initReducer: PropTypes.func,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    initReducer: () => dispatch(HomeActions.initReducer()),
});


export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
