import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DrawerItems, NavigationActions } from 'react-navigation';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as selectorsSession from '../../Stores/Session/selector';


class SideMenu extends Component {
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        const { items, user, ...rest } = this.props;
        let filteredItems;

        if (user) {
            filteredItems = items.filter(item => item.key !== 'Login');
        } else {
            filteredItems = items.filter(item => {
                switch (item.key) {
                    case 'Logout':
                        return false;
                    case 'Perfil':
                        return false;
                    case 'Cadastro':
                        return false;

                    default:
                        return true;
                }
            });
        }
        return (
            <View style={styles.container}>
                <ScrollView>
                    <DrawerItems items={filteredItems} {...rest} />
                </ScrollView>
                <View style={styles.footerContainer}>
                    {user ? <Text>{user.email}</Text> : <Text>Adota ai!</Text>}
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

const mapStateToProps = createStructuredSelector({
    user: selectorsSession.selectorSessionUser(),
});

export default connect(mapStateToProps, null)(SideMenu);

