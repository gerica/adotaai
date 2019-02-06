import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as selectorsSession from '../../Stores/Session/selector';

class IconHeaderRight extends Component {

    render() {
        const { user } = this.props;
        if (user) {
            return (
                <Thumbnail source={{ uri: user.user.photo }} style={{ height: 50, width: 50, marginRight: 5 }} />
            );
        }
        return null;
    }
}

IconHeaderRight.propTypes = {
    nav: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
    user: selectorsSession.selectorSessionUser(),
});

export default connect(mapStateToProps, null)(IconHeaderRight);
