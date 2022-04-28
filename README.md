[![npm](https://img.shields.io/npm/v/mongoasfs?color=%2300aa00&label=npm%20package)](https://www.npmjs.com/package/mongoasfs)

# mongoasfs
Use [MongoDB](https://www.mongodb.com/) as Cloud File Storage.

## Installing
```
npm install mongoasfs
```


## Using
```javascript
// Connect module
const { MongoFS } = require('mongoasfs');

// Create instance of MongoFS
const fs = new MongoFS(
        "mongodb+srv://admin:...",  // URL
        "myFirstDatabase",          // Database Name
        "files"                     // Collection Name
    );

// Connect to MongoDB
fs.connect(() => {
    // Create/rewrite test.txt
    fs.writeFile("test.txt", "Hello, world!");

    // Read test.txt
    fs.readFile("test.txt", (content) => {
        console.log(content); // Hello, world!
    });
});
```

made with love and javascript ♥
