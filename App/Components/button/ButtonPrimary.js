import React, { Component } from 'react';
import { TouchableNativeFeedback, Text, View } from 'react-native';
import Colors from '../../Theme/Colors';

export default class ButtonPrimary extends Component {

    render() {
        return (
            <TouchableNativeFeedback
                onPress={() => console.log('teste')}
                background={TouchableNativeFeedback.SelectableBackground()}
                style={styles.con}
            >
                <View style={styles.container}>
                    <Text style={{ margin: 30 }}>Button</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
}


const styles = {
    container: {
        justifyContent: 'center',
        paddingHorizontal: 10,
        height: 50,
        backgroundColor: Colors.buttons,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
    countContainer: {
        alignItems: 'center',
        padding: 10
    },
    countText: {
        color: '#FF00FF'
    }
};
