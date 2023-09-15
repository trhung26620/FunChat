// const {MongoClient} = require('mongodb');
// require('dotenv').config()

// const connectMongo = async () => {

//     console.log('testing connection')
//     const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.wxs5n9c.mongodb.net/?retryWrites=true&w=majority`;
 
//     const client = new MongoClient(uri);
 
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
 
//         // Make the appropriate DB calls
//         await  listDatabases(client);
//         return client
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// async function listDatabases(client){
//     let databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };



// module.exports = connectMongo