const hashSHA256=require('crypto-js/sha256');

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
    
    minePendingTransactions(miningRewardAddress){   //OLD version : addBlock                    // ??? can they change to get more rewards
        this.pendingTransactions=[
            new Transaction(null,miningRewardAddress,this.miningReward)// aka he thong chuyen tien cho ban => he thong khong co address, toAddress la miner vaf mine Reward = amount
        ]
        let block=new Block(Date.now(),this.pendingTransactions,this.getLatestBlock().hash)        // ??? if miner get conflict to each other -> how to solve // 
        console.log("Block mining ... pendingTransactions mining ... ")
        block.mineBlock(this.difficulty)
        this.chain.push(block)
        this.pendingTransactions=[];

    }

    createTransaction(Transaction){                                     // !!! chua gioi han so lan transaction trong appending transactions
        this.pendingTransactions.push(Transaction)
    }

    getBalance(address){
        let balance=0
    //     for(let i=1;i<this.chain.length;i++){  // OLD CODE MY CODE
    //         if(TransactionAddress===this.pendingTransactions[i].Transaction.toAddress)
    //         amountWallet+=this.pendingTransactions[i].Transaction.amount
    //         const currentBlock = this.chain[i];// thieu phan tru 
    // }
        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress===address){
                    balance-=trans.amount
                }
                if(trans.toAddress===address){
                    balance+=trans.amount
                }
            }
        }
        return balance
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

class Transaction{
    constructor(fromAddress, toAddress, amount){//lack of sign transaction aka Public private key
        this.fromAddress=fromAddress;
        this.toAddress=toAddress;
        this.amount=amount;
        // this.timeStamp=Date.now();
    }
}





module.exports = {Block,Blockchain,Transaction}