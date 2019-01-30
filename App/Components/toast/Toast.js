import { ToastAndroid } from 'react-native';

/**
 * to be wrapped with redux-form Field component
 */
export default function Toast(props) {
    if (props.visible) {
        ToastAndroid.showWithGravityAndOffset(
            props.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
        );
        return null;
    }
    return null;
}
