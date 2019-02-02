import firebase from 'react-native-firebase';

class FbListaDoacao {
    constructor() {
        this.ref = firebase.firestore().collection('listaDoacao');
    }
    async save(payload) {
        const result = await this.ref.add(payload);
        return result;
    }

    async load(id) {
        const doc = await this.ref.doc(id).get();
        if (doc.exists) {
            return doc.data();
        }
        const defaultDoc = {
            name: 'ABC',
            age: 2
        };
        await this.ref.doc(id).set(defaultDoc);
        return doc;
    }

    async fetchAll() {
        const result = [];
        await this.ref.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                result.push({ id: doc.id, ...doc.data() });
            });
        });
        return result;
    }
}
export default new FbListaDoacao();
