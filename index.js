const hashSHA256=require('crypto-js/sha256');


class Block{
    constructor(index, timeStamp, data, prevHash = ''){
        this.index = index;
        this.prevHash = prevHash;
        this.data = data;
        this.timeStamp = timeStamp;

        this.hash=this.calculateHash();
    }

    calculateHash(){
        return hashSHA256(this.index+this.prevHash+JSON.stringify(this.data)+this.timeStamp).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock_firstBlock()];
    }

    createGenesisBlock_firstBlock(){
        return new Block(0,'18/6/2022',"Hello world",'0')
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.prevHash=this.getLatestBlock().hash // gan chuoi hash vao block
        newBlock.hash=newBlock.calculateHash()
        this.chain.push(newBlock)
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

let SalCoin=new Blockchain();
SalCoin.addBlock(new Block(1,"10/7/2022",{amount:10, message:'Long give Giang amount: '}))
SalCoin.addBlock(new Block(2,"10/7/1999",{amount:1111, message:'Long give Chien amount: '}))
SalCoin.addBlock(new Block(3,"10/7/21999",{amount:2222, message:'Long give Chien amount: '}))
console.log(JSON.stringify(SalCoin,null,4));
console.log('Chain valid: ',SalCoin.isChainValid())

// const currentBlock_ = LongCoin.chain[2];

// const prevBlock_=LongCoin.chain[2-1];

// console.log("2 Block dang xem xet:",currentBlock_,prevBlock_);

// console.log(currentBlock_.prevHash!=prevBlock_.hash)



// console.log('6ee37b06b9addcde9a0413497a7d89e78d8c20a466c8dcf8e3903593344c5866'=='6ee37b06b9addcde9a0413497a7d89e78d8c20a466c8dcf8e3903593344c5866')
// console.log(JSON.stringify(LongCoin,null,4));
// console.log('Chain valid: ',LongCoin.isChainValid())

SalCoin.chain[1].data={amount:99}
SalCoin.chain[1].hash=SalCoin.chain[1].calculateHash()
console.log(JSON.stringify(SalCoin,null,4));
console.log('Chain valid: ',SalCoin.isChainValid())