import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardItem, Body, } from 'native-base';
import { createStructuredSelector } from 'reselect';

import HomeActions from '../../Stores/Home/actions';
import { ContainerPerfil } from './styles';

class ListaPetPage extends Component {

    render() {
        // const { navigation } = this.props;
        return (
            <ContainerPerfil>
                <Card>
                    <CardItem>
                        <Body>
                            <Text>Lista de pets</Text>
                        </Body>
                    </CardItem>
                </Card>
            </ContainerPerfil>
        );
    }
}

ListaPetPage.propTypes = {
};

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = (dispatch) => ({
    initReducer: () => dispatch(HomeActions.initReducer()),
});


export default connect(mapStateToProps, mapDispatchToProps)(ListaPetPage);
