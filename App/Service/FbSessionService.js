import firebase from 'react-native-firebase';

class FbSessionService {
    async login({ email, password }) {
        let user = null;
        try {
            user = await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (err) {
            throw err;
        }
        return user;
    }

    async signOut() {
        if (this.isSignedIn()) {
            try {
                await firebase.auth().signOut();
            } catch (err) {
                throw err;
            }
        }
    }

    async update(payload) {
        const userRef = firebase.auth().currentUser;
        // displayName: 'Jane Q. User',
        // photoURL: 'https://example.com/jane-q-user/profile.jpg'
        try {
            return await userRef.updateProfile(payload);
        } catch (err) {
            throw err;
        }
    }

    isSignedIn() {
        return firebase.auth().currentUser;
    }

}
export default new FbSessionService();
