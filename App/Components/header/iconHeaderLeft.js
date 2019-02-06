import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const IconHeaderLeft = (props) => {
    const { nav } = props;

    const iconCustom = nav.getParam('iconCustom');
    const onPressCustom = nav.getParam('onPressCustom');

    const icon = (
        iconCustom ||
        <MaterialIcons name="menu" size={35} color={'#fff'} style={{ marginRight: 5 }} />
    );

    let onPressDefault;
    if (onPressCustom && onPressCustom === 'goBack') {
        onPressDefault = (() => nav.goBack());
    } else {
        onPressDefault = (() => nav.toggleDrawer());
    }

    return (
        <Fragment >
            <TouchableHighlight
                onPress={onPressDefault}
                underlayColor={'#e5e5e5'}
            >
                {icon}
            </TouchableHighlight>
        </Fragment>
    );
};

IconHeaderLeft.propTypes = {
    nav: PropTypes.object,
};

export default IconHeaderLeft;
