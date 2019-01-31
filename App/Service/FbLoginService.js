import firebase from 'react-native-firebase';

class FbLoginService {
    async login({ email, password }) {
        let user = null;
        try {
            user = await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (err) {
            throw err;
        }
        return user;
    }
}
export default new FbLoginService();
