import firebase from 'react-native-firebase';

class FbLoginService {
    async login({ email, password }) {
        console.log(email);
        console.log(password);
        try {
            const user = await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log(user);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}
export default new FbLoginService();
