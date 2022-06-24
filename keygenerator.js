const EC= require('elliptic').ec;

const ec=new EC('secp256k1');
const key =ec.genKeyPair();
const publicKey=key.getPublic('hex');// convert public key to hex to ez to use
const privateKey=key.getPrivate('hex');// convert private key to hex to use

console.log()
console.log('private key: ',privateKey)
console.log('public key: ',publicKey)