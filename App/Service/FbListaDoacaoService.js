import firebase from 'react-native-firebase';

class FbListaDoacaoService {
    constructor() {
        this.ref = firebase.firestore().collection('listaDoacao');
    }
    async save(payload) {
        const result = await this.ref.add(payload);
        return result;
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
        // await this.ref.get().then((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //         result.push({ id: doc.id, ...doc.data() });
        //     });
        // });
        // return result;
        await this.ref.where('status', '==', 'aberto').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                result.push({ id: doc.id, ...doc.data() });
            });
        });
        return result;
    }

    async fetchByUser(user) {
        if (!user) {
            throw new Error('usuário não pode ser nulo.');
        }
        const result = [];
        let idUser;

        if (user && user.user && user.user.id) {
            idUser = user.user.id;
        } else {
            throw new Error('Não foi encontrado o id do usuário.');
        }

        await this.ref.where('user.id', '==', idUser).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                result.push({ id: doc.id, ...doc.data() });
            });
        });
        return result;
    }
}
export default new FbListaDoacaoService();
