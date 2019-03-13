import React from 'react';
import { View } from 'react-native';
import { Label, Item, Input, Text } from 'native-base';
import { TextError } from './styles';
import Colors from '../../Theme/Colors';

/**
 * to be wrapped with redux-form Field component
 */
export default function TextInputBaseRedux(props) {
    const { input, secureTextEntry, label, disabled, meta: { touched, error, warning }, ...inputProps } = props;
    const defaultStyle = inputProps.style || (disabled ? { color: Colors.disabled } : {});
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
        // <Fragment>
        <View style={{ width: '100%', borderWidth: 0, paddingTop: 10 }}>
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
                    disabled={disabled}
                />
            </Item>
            {touched && viewErrorWarning}
        </View>
        // {/* </Fragment> */ }
    );
}
