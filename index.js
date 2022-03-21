const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const { MongoClient, Admin } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const port = process.env.PORT || 4000


app.use(express.json())
app.use(cors())


const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.yeroo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri);

async function run() {
      try {
            await client.connect()
            const database = client.db("hospital");
            const userCollection = database.collection("users")
            // const messeageCollection = database.collection("messeages");
            // const reviewCollection = database.collection("reviews");
            // const bookingCollection = database.collection("booking")
            // const serviceCollection = database.collection('services')
            // const designCollection = database.collection('design')
            // const todaysOrderCollectin = database.collection('todays_design_order')
            console.log("connected");
            const user = { name: 'Fahim Faysal siyam', email: 'faysalsiyam@gmail.com' }
            userCollection.insertOne(user)
      }
      catch {
            // await client.close();
      }
}
run().catch(console.dir)


app.get('/', (req, res) => {
      res.send("hello world")
})

app.listen(port, () => {
      console.log(`Port is Running at http://localhost:${port}`)
})