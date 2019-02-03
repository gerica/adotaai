/* eslint-disable global-require */
export const imagensMiniatura = [
    { name: 'afghan-hound-150x150.png', uri: require('./racas/cao/afghan-hound-150x150.png') },
    { name: 'airedale_terrier_v1-100x100.jpg', uri: require('./racas/cao/airedale_terrier_v1-100x100.jpg') },
    { name: 'Akita-2-100x100.jpg', uri: require('./racas/cao/Akita-2-100x100.jpg') },
    { name: 'American-Staffordshire-Terrier-100x100.png', uri: require('./racas/cao/American-Staffordshire-Terrier-100x100.png') },
    { name: 'Australian-Cattle-Dog-01-100x100.jpg', uri: require('./racas/cao/Australian-Cattle-Dog-01-100x100.jpg') },
    { name: 'basenji-100x100.jpg', uri: require('./racas/cao/basenji-100x100.jpg') },
    { name: 'basset-hound1-100x100.jpg', uri: require('./racas/cao/basset-hound1-100x100.jpg') },
];

export const naoDefinidos = [
    { name: 'dog_undefined.png', uri: require('./cachorro/dog_undefined.png') },
    { name: 'dog_undefined2.png', uri: require('./cachorro/dog_undefined2.png') },
    { name: 'dog_undefined3.png', uri: require('./cachorro/dog_undefined3.png') },
    { name: 'dog_undefined4.png', uri: require('./cachorro/dog_undefined4.png') },
    { name: 'dog_undefined5.png', uri: require('./cachorro/dog_undefined5.png') },
];

export function getMiniatura(nameMiniatura) {
    return imagensMiniatura.find((e) => e.name === nameMiniatura);
}

export function getNaoDefinido() {
    const index = (Math.floor(Math.random() * 5));
    return naoDefinidos[index].uri;
}
