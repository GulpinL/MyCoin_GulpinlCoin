const {Blockchain, Transaction} = require('./blockchain')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Your private key goes here
const myKey = ec.keyFromPrivate('7c4c45907dec40c91bab3480c39032e90049f1a44f3e18c3e07c23e3273995cf');
const myWalletAddress = myKey.getPublic('hex');// From that we can calculate your public key (which doubles as your wallet address)

let savjeeCoin = new Blockchain();
// savjeeCoin.addTransaction(new Transaction('fromA','toB',10))         -> const tx1 = new Transaction(myWalletAddress, 'address2', 100);
//                                                                      -> tx1.signTransaction(myKey);
//                                                                      -> savjeeCoin.addTransaction(tx1);
const tx1 = new Transaction(myWalletAddress, 'address2', 100);
tx1.signTransaction(myKey);
savjeeCoin.addTransaction(tx1);

const tx2 = new Transaction(myWalletAddress, 'address3', 2);
tx2.signTransaction(myKey);
savjeeCoin.addTransaction(tx2);

const tx3 = new Transaction(myWalletAddress, 'address4', 9);
tx3.signTransaction(myKey);
savjeeCoin.addTransaction(tx3);


// savjeeCoin.addTransaction(new Transaction('fromC','toD',50))
// savjeeCoin.addTransaction(new Transaction('toB','fromA',13))

console.log("\nSTART MINING ...\n");
savjeeCoin.minePendingTransactions(myWalletAddress)                       //khi mine nhow bo dia chi miner vao aka public key cua miner
console.log("\nGet Balance from address: Long wallet : \n",savjeeCoin.getBalanceOfAddress(myWalletAddress))

console.log("\nSTART MINING Again...\n");
savjeeCoin.minePendingTransactions(myWalletAddress)                       //khi mine nhow bo dia chi miner vao aka public key cua miner
console.log("\nGet Balance from address: Long wallet : \n",savjeeCoin.getBalanceOfAddress(myWalletAddress))
console.log('Chain valid: ',savjeeCoin.isChainValid())



// HIen tai
// ??? tai khoản cá nhân không có đồng nào nên HasValidtransactions trong block bị sai -> sửa 
// ??? sao block lai cho tien truoc khi xac nhan transaction ?
