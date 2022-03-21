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
            const medicaltest = database.collection('medicalTest')
            const services = database.collection('services')
            const appointmentCollection = database.collection('appointments')
            const bookedAppointments = database.collection('bookedappointments')
            // const messeageCollection = database.collection("messeages");
            // const reviewCollection = database.collection("reviews");
            // const bookingCollection = database.collection("booking")
            // const serviceCollection = database.collection('services')
            // const designCollection = database.collection('design')
            // const todaysOrderCollectin = database.collection('todays_design_order')
            app.get('/medical', async (req, res) => {
                  const cursor = medicaltest.find({});
                  const result = await cursor.toArray()
                  res.send(result)
            })
            app.post('/addservice', async (req, res) => {
                  const data = req.body
                  const result = await services.insertOne(data)
                  res.json(result)
            })
            app.get('/appointments', async (req, res) => {
                  const cursor = appointmentCollection.find({})
                  const result = await cursor.toArray()
                  res.send(result)
            })
            app.post('/appointment', async (req, res) => {
                  const data = req.body
                  const result = await bookedAppointments.insertOne(data)
                  res.json(result)
            })
            app.get('/appointments/:email', async (req, res) => {
                  const email = req.params.email;
                  const query = { email: email };
                  const user = await appointmentCollection.findOne(query)
                  let isAdmin = false;
                  if (user?.role === 'admin') {
                        isAdmin = true;
                  }
                  res.json({ admin: isAdmin })
            })
            app.delete('/appointments/:id', async (req, res) => {
                  const id = req.params.id;
                  console.log(id);
                  const query = { _id: ObjectId(id) }
                  const result = await bookedAppointments.findOne(query)
                  res.json(result)
            })
            // app.post('/user', async (req, res) => {
            //       const user = req.body;
            //       const result = await userCollection.insertOne(user)
            //       res.json(result)
            // })
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