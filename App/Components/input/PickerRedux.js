import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Item, Text, Picker, Icon, Label } from 'native-base';
import { TextError } from './styles';

/**
 * to be wrapped with redux-form Field component
 */
export default function PickerRedux(props) {
    const { label, selected, itens, onValueChange, meta: { touched, error, warning }, } = props;

    let pickerItem = [];
    if (itens) {
        pickerItem = itens.map((e, i) => <Picker.Item key={i} label={e.label} value={e.value} />);
    }
    const viewErrorWarning = (
        <View style={{ marginBottom: 10 }}>
            {((error && <TextError>{error}</TextError>) ||
                (warning && <Text>{warning}</Text>))}
        </View>
    );
    return (
        <Fragment>
            <Item picker>
                <Label>{label}:</Label>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ marginTop: 5 }}
                    placeholder={label}
                    selectedValue={selected}
                    onValueChange={onValueChange}
                >
                    {pickerItem}
                </Picker>
            </Item>
            {touched && viewErrorWarning}
        </Fragment>
    );
}

PickerRedux.propTypes = {
    // onValueChange: PropTypes.func.isRequired,
    selected: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
};
