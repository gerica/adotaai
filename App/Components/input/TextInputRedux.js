import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { TextError } from './styles';

/**
 * to be wrapped with redux-form Field component
 */
export default function TextInputRedux(props) {
    const { input, secureTextEntry, meta: { touched, error, warning }, ...inputProps } = props;
    const defaultStyle = inputProps.style || { height: 40, borderColor: 'gray', borderWidth: 1 };
    return (
        <View>
            <TextInput
                secureTextEntry={secureTextEntry}
                {...inputProps}
                onChangeText={input.onChange}
                onBlur={input.onBlur}
                onFocus={input.onFocus}
                value={input.value}
                style={defaultStyle}
            />
            {touched &&
                ((error && <TextError>{error}</TextError>) ||
                    (warning && <Text>{warning}</Text>))}
        </View>
    );
}
