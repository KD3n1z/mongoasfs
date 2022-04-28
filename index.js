const mongo = require("mongodb");

module.exports.MongoFS = class MongoFS {
    constructor(url, dbName, colName) {
        this.mongoClient = new mongo.MongoClient(url);
        this.databaseName = dbName;
        this.collectionName = colName;
        this.connected = false;
    }

    connect(_callback) {
        let thisClass = this;

        this.mongoClient.connect(function(err, client){
            if(err){
                throw "MongoDB connection error";
            }
            let database = client.db(thisClass.databaseName);

            if(database == null){
                throw "Database \"" + thisClass.databaseName + "\" not found";
            }
            
            thisClass.filesCollection = database.collection(thisClass.collectionName);

            if(thisClass.filesCollection == null){
                throw "Collection \"" + thisClass.filesCollection + "\" not found";
            }
            
            thisClass.connected = true;

            _callback();
        });
    }

    readFile(fileName, _callback){
        if(!this.connected){
            throw "Not connected to MongoDB";
        }

        this.filesCollection.findOne({ "fileName": fileName }).then((result) => {
            if(result == null){
                _callback(null);
                return;
            }
            _callback(result.content);
        });
    }

    writeFile(fileName, content, _callback = function(){}){
        if(!this.connected){
            throw "Not connected to MongoDB";
        }

        let thisClass = this;
        
        this.readFile(fileName, ((c) => {
            if(c == null){
                thisClass.filesCollection.insertOne({"fileName": fileName, "content": content });
            }else{
                thisClass.filesCollection.updateOne({ "fileName": fileName }, { $set: { "content": content } });
            }
        }));

        _callback();
    }
}