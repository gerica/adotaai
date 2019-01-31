import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import AppWithNavigationState from './appNavigatorOpen';

import * as selectorsSession from '../../Stores/Session/selector';


class NavigatorPage extends Component {

    render() {
        const { user } = this.props;
        console.log(user);
        return (
            <AppWithNavigationState />
        );
    }
}

NavigatorPage.propTypes = {
    initReducer: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
    user: selectorsSession.selectorSessionUser,
});

export default connect(mapStateToProps)(NavigatorPage);
