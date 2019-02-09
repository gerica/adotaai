import firebase from 'react-native-firebase';

class FbSessionService {
    async login({ username, password }) {
        let user = null;
        try {
            user = await firebase.auth().signInWithEmailAndPassword(username, password);
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
        const { nome, contato } = payload;
        const userRef = firebase.auth().currentUser;
        try {
            await userRef.updateProfile({ displayName: nome, contact: contato });
        } catch (err) {
            throw err;
        }
    }

    async refresh() {
        const userRef = firebase.auth().currentUser;
        try {
            // return await ref.getUser(uid);
            await userRef.reload();
            return firebase.auth().currentUser;
        } catch (err) {
            throw err;
        }
    }

    isSignedIn() {
        return firebase.auth().currentUser;
    }

}
export default new FbSessionService();
