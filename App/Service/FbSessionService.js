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
        // this.isSignedIn().then(v => {
        //     console.log(v);
        // });
        if (this.isSignedIn()) {
            try {
                console.log('signout fb');
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
        // return user;
        // const retorno = await firebase.auth().onAuthStateChanged((user) => user);
        // console.log(retorno());
    }

}
export default new FbSessionService();
