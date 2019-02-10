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
        // console.log({ user });
        if (user) {
            if (user.photo || user.photoURL) {
                return (
                    <Thumbnail source={{ uri: user.photo || user.photoURL }} style={{ height: 50, width: 50, marginRight: 5 }} />
                );
            }
            return <Icon type="Ionicons" name="person" style={{ marginRight: 10, color: Colors.white }} />;
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
