import firebase from 'react-native-firebase';

class FbUsuarioService {
    constructor() {
        this.ref = firebase.firestore().collection('usuario');
    }

    async save(payload) {
        await this.ref.add(payload);
    }

    async updadte({ id, dados }) {
        return await this.ref.doc(id).update(dados);
    }

    async load(id) {
        const doc = await this.ref.doc(id).get();
        // var query = citiesRef.where("state", "==", "CA");
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
export default new FbUsuarioService();
