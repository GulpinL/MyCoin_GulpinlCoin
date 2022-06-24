const {Blockchain, Transaction} = require('./blockchain')

let savjeeCoin=new Blockchain();
savjeeCoin.createTransaction(new Transaction('fromA','toB',10))
savjeeCoin.createTransaction(new Transaction('fromC','toD',50))
savjeeCoin.createTransaction(new Transaction('toB','fromA',13))

console.log("\nSTART MINING ...\n");
savjeeCoin.minePendingTransactions('long-wallet')                       //khi mine nhow bo dia chi miner vao aka public key cua miner
console.log("\nGet Balance from address: Long wallet : \n",savjeeCoin.getBalance('long-wallet'))

console.log("\nSTART MINING Again...\n");
savjeeCoin.minePendingTransactions('long-wallet')                       //khi mine nhow bo dia chi miner vao aka public key cua miner
console.log("\nGet Balance from address: Long wallet : \n",savjeeCoin.getBalance('long-wallet'))
console.log('Chain valid: ',savjeeCoin.isChainValid())

// for(let i=1;i<savjeeCoin.chain.length;i++){
//     console.log("\n Hash: ",savjeeCoin.chain[i].hash)
// }

// savjeeCoin.chain[1].data={amount:99}
// savjeeCoin.chain[1].hash=savjeeCoin.chain[1].calculateHash()
// console.log(JSON.stringify(savjeeCoin,null,4));
// console.log('Chain valid: ',savjeeCoin.isChainValid())