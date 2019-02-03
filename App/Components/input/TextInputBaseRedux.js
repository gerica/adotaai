import React, { Fragment } from 'react';
import { View } from 'react-native';
import { Label, Item, Input, Text } from 'native-base';
import { TextError } from './styles';

/**
 * to be wrapped with redux-form Field component
 */
export default function TextInputBaseRedux(props) {
    const { input, secureTextEntry, label, meta: { touched, error, warning }, ...inputProps } = props;
    const defaultStyle = inputProps.style || {};
    // const { input, label, meta: { touched, error, warning } } = props;
    // let hasError = false;
    // if (error !== undefined) {
    //     hasError = true;
    // }
    const viewErrorWarning = (
        <View style={{ marginBottom: 10 }}>
            {((error && <TextError>{error}</TextError>) ||
                (warning && <Text>{warning}</Text>))}
        </View>
    );

    return (
        <Fragment>
            <Item floatingLabel>
                <Label>{label}</Label>
                <Input
                    secureTextEntry={secureTextEntry}
                    {...inputProps}
                    onChangeText={input.onChange}
                    onBlur={input.onBlur}
                    onFocus={input.onFocus}
                    value={input.value}
                    style={defaultStyle}
                />
            </Item>
            {touched && viewErrorWarning}
        </Fragment>
    );
}
