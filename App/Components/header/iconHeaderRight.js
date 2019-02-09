import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Thumbnail, Icon } from 'native-base';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as selectorsSession from '../../Stores/Session/selector';
import Colors from '../../Theme/Colors';

class IconHeaderRight extends Component {

    render() {
        const { user } = this.props;
        if (user) {
            if (user.user.photo) {
                return (
                    <Thumbnail source={{ uri: user.user.photo }} style={{ height: 50, width: 50, marginRight: 5 }} />
                );
            }
            return <Icon type="Ionicons" name="person" style={{ marginRight: 5, color: Colors.white }} />;
        }
        return null;
    }
}

IconHeaderRight.propTypes = {
    nav: PropTypes.object,
    user: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    user: selectorsSession.selectorSessionUser(),
});

export default connect(mapStateToProps, null)(IconHeaderRight);
