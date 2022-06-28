const hashSHA256=require('crypto-js/sha256');
const EC= require('elliptic').ec;

const ec=new EC('secp256k1');

class Block{
    constructor( timeStamp, transactions, prevHash = ''){
        this.prevHash = prevHash;
        this.timeStamp = timeStamp;
        this.transactions = transactions;
        this.nonce=0;
        this.hash=this.calculateHash();
    }

    calculateHash(){
        return hashSHA256(this.prevHash+JSON.stringify(this.transactions)+this.timeStamp+this.nonce).toString();
    }

    mineBlock(difficulty) {// += calculateHash() // using Proof of work // increase dif when a block is added to blockchain
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
          this.nonce++;
          this.hash = this.calculateHash(); 
        }

        console.log("Block mined: "+this.hash)                          // !!! HOW to change dif automatically  
    } 

    hasValidTransactions() {
        for(const tx of this.transactions) {
            if(!tx.isValid()){
                return false; // ??? why not just push it out of transactions
            }
        }
        
        return true;
    }
}

class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock_firstBlock()];
        this.difficulty=3;  
        this.pendingTransactions=[];                                    // ??? equal to pool
        this.miningReward=1000;                                          // !!! How to share mining reward
    }

    createGenesisBlock_firstBlock(){
        return new Block(Date.parse('2004-4-20'),"Hello world",'0')
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    
    minePendingTransactions(miningRewardAddress){   //OLD version : addBlock                    // ??? can they change to get more rewards
        const rewardTx = new Transaction(null,miningRewardAddress,this.miningReward)// aka he thong chuyen tien cho ban => he thong khong co address, toAddress la miner vaf mine Reward = amount
    
        this.pendingTransactions.push(rewardTx);
        let block=new Block(Date.now(),this.pendingTransactions,this.getLatestBlock().hash)        // ??? if miner get conflict to each other -> how to solve // 
        console.log("Block mining ... pendingTransactions mining ... ")
        block.mineBlock(this.difficulty)
        this.chain.push(block)
        this.pendingTransactions = [];

    }

    addTransaction(transaction){                                     // !!! chua gioi han so lan transaction trong appending transactions
        // transaction must be valid
        // if (!transaction.fromAddress || !transaction.toAddress) {
        //     throw new Error('Transaction must include from and to address');
        // }
        // if (!transaction.isValid()) {
        //     throw new Error('Cannot add invalid transaction to chain');
        // }
        // if (transaction.amount <= 0) {
        //     throw new Error('Transaction amount should be higher than 0');
        // }

        // const walletBalance = this.getBalanceOfAddress(transaction.fromAddress);
        // if (walletBalance < transaction.amount) {
        //   throw new Error('Not enough balance');
        // }
        
        this.pendingTransactions.push(transaction)    
    }

    getBalanceOfAddress(address){
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
        for(let i=1;i<this.chain.length;i++){
            const currentBlock = this.chain[i];
            const prevBlock=this.chain[i-1];
            if(!currentBlock.hasValidTransactions()){
                return false;
            }
            if(currentBlock.prevHash!=prevBlock.hash){
                return false;
            }
            if(currentBlock.hash !=currentBlock.calculateHash()){
                return false;
            }
            // console.log("Valid hien tai:");
        }
        
        return true;
    }
}

class Transaction{
    constructor(fromAddress, toAddress, amount){//lack of sign transaction aka Public private key
        this.fromAddress=fromAddress;
        this.toAddress=toAddress;
        this.amount=amount;
        // this.timeStamp=Date.now();
    }

    calculateHash(){
        return hashSHA256(this.fromAddress+this.toAddress+this.amount).toString;
    }

    signTransaction(signingkey){//signingkey  -> const ec=new EC('secp256k1');
        if(signingkey.getPublic('hex')!==this.fromAddress){
            throw new Error('you cannot sigh transactions for other wallets')

        }

        const hashTx=this.calculateHash();
        const sig = signingkey.sign(hashTx,'base64');
        this.signature = sig.toDER();
    }

    isValid(){
        if(this.fromAddress===null) return true;

        if(!this.signature || this.signature.length===0){
            throw new Error('No signature in this transaction')
                                                                            // ??? why not return false here ?

        }

        const publicKey = ec.keyFromPublic(this.fromAddress,'hex')
        return publicKey.verify(this.calculateHash(),this.signature)        // ??? what it do and what it return, T/F ? or something else

    }

}






module.exports = {Block,Blockchain,Transaction}