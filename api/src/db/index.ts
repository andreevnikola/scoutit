const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017/";

const client = new MongoClient(uri);

async function setupDB() {
  await client.connect();
}
setupDB();

class CRUD{
    db: string = "";
    collection: string = "";
    connection: any;
    result: any;

    constructor(db: string, collection: string){
        this.db = db;
        this.collection = collection;
        this.connect();
    }
    async connect(){
        this.connection = await client.db(this.db).collection(this.collection);
    }
    async Create(data: any){
        this.result = await this.connection?.insertOne(data);
        return this.result;
    }
    async Read(condition: any, forProject?: any){
        if(forProject){
            this.result = await this.connection.findOne(condition).project(forProject);
            return this.result;
        }
        this.result = await this.connection.findOne(condition);
        return this.result;
    }
    async ReadMany(condition: any, limit: number, sort: any){
        if(limit){
            if(sort){
                this.result = await this.connection?.find(condition).sort(sort).limit(limit).toArray();
            }else{
                this.result = await this.connection?.find(condition).limit(limit).toArray();
            }
        }else{
            if(sort){
                this.result = await this.connection?.find(condition).sort(sort).toArray();
            }else{
                this.result = await this.connection?.find(condition).toArray();
            }
        }
        return this.result;
    }
    async Update(condition: any, data: any){
        this.result = await this.connection?.updateOne(condition, data);
        return this.result;
    }
    async Delete(condition: any){
        this.result = await this.connection?.deleteOne(condition);
        return this.result;
    }
    // async Aggregate(data){
    //     this.result = await this.connection?.aggregate(data);
    //     return this.result;
    // }
    async Close(){
        await client.close();
    }
}

module.exports = CRUD;