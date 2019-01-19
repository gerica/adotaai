import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DrawerItems, NavigationActions } from 'react-navigation';
import { ScrollView, Text, View } from 'react-native';

class SideMenu extends Component {
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <DrawerItems {...this.props} />
                </ScrollView>
                <View style={styles.footerContainer}>
                    <Text>Adota ai!</Text>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        paddingTop: 20,
        flex: 1
    },
    footerContainer: {
        padding: 20,
        backgroundColor: 'lightgrey'
    }
};

SideMenu.propTypes = {
    navigation: PropTypes.object
};

export default SideMenu;
