const hashSHA256=require('crypto-js/sha256');

class Transaction{
    constructor(fromAddress, toAddress, amount){//lack of sign transaction aka Public private key
        this.fromAddress=fromAddress;
        this.toAddress=toAddress;
        this.amount=amount;
    }


}
class Block{
    constructor( timeStamp, transactions, prevHash = ''){
        this.prevHash = prevHash;
        this.transactions = transactions;
        this.timeStamp = timeStamp;

        this.hash=this.calculateHash();
        this.nonce=0;// ?
    }

    calculateHash(){
        return hashSHA256(this.prevHash+JSON.stringify(this.transactions)+this.timeStamp+this.nonce).toString();
    }

    mineBlock(difficulty) {// += calculateHash() // using Proof of work // increase dif when a block is added to blockchain
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
          this.nonce++;
          this.hash = this.calculateHash(); 
        }
        console.log("Block mined: "+this.hash)                          // !!! HOW to decrease dif
       
} 
}

class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock_firstBlock()];
        this.difficulty=4;
        this.pendingTransactions=[];                                    // ??? equal to pool
        this.miningReward=1000;                                         // !!! How to share mining reward
    }

    createGenesisBlock_firstBlock(){
        return new Block('18/6/2022',"Hello world",'0')
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.prevHash=this.getLatestBlock().hash                    // gan chuoi hash vao block
        console.log("start : Mining")
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock)
    }
    
    minePendingTransactions(miningRewardAddress){                       // ??? can they change to get more rewards
        let block=new Block(Date.now(),this.pendingTransactions)        // ??? if miner get conflict to each other -> how to solve
        console.log("start : Mining")
        block.mineBlock(this.difficulty)
        // console.log("block successfully mined")

        this.chain.push(block)
        this.pendingTransactions=[
            new Transaction(null,miningRewardAddress,this.miningReward)// aka he thong chuyen tien cho ban => he thong khong co address, toAddress la miner vaf mine Reward = amount
        ]

    }

    createTransaction(Transaction){
        this.pendingTransactions.push(Transaction)
    }

    getBalance(TransactionAddress){
        let amountWallet=0
        for(let i=1;i<this.chain.length;i++){
            if(TransactionAddress===this.pendingTransactions[i].Transaction.toAddress)
            amountWallet+=this.pendingTransactions[i].Transaction.amount
            const currentBlock = this.chain[i];// thieu phan tru 
    }
    }

    isChainValid(){
        let isValid=true;

        for(let i=1;i<this.chain.length;i++){
            const currentBlock = this.chain[i];
            const prevBlock=this.chain[i-1];
            
            if(currentBlock.prevHash!=prevBlock.hash){
                isValid=false;
            }
            if(currentBlock.hash !=currentBlock.calculateHash()){
                isValid=false;
            }
            console.log("Valid hien tai:",isValid);
        }
        
        return isValid;
    }
}






let savjeeCoin=new Blockchain();

console.log("Mining block 1...");
savjeeCoin.addBlock(new Block(1,"10/7/2015",{amount:10}))

console.log("Mining block 2...");``
savjeeCoin.addBlock(new Block(2,"1/1/2017",{amount:10}))

console.log("Mining block 3...");``
savjeeCoin.addBlock(new Block(3,"1/1/2000",{amount:1011}))

console.log("Mining block 4...");``
savjeeCoin.addBlock(new Block(4,"1/1/1999",{amount:369}))

// savjeeCoin.addBlock(new Block(1,"10/7/2022",{amount:10, message:'Long give Giang amount: '}))
// savjeeCoin.addBlock(new Block(2,"10/7/1999",{amount:1111, message:'Long give Chien amount: '}))
// savjeeCoin.addBlock(new Block(3,"10/7/21999",{amount:2222, message:'Long give Chien amount: '}))
// console.log(JSON.stringify(savjeeCoin,null,4));
console.log('Chain valid: ',savjeeCoin.isChainValid())

// savjeeCoin.chain[1].data={amount:99}
// savjeeCoin.chain[1].hash=savjeeCoin.chain[1].calculateHash()
// console.log(JSON.stringify(savjeeCoin,null,4));
// console.log('Chain valid: ',savjeeCoin.isChainValid())