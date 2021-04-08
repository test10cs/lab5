const express = require('express');
const bodyParser= require('body-parser')
const app = express();
app.listen(3000, function() {
    console.log('listening on 3000')
  })
app.get('/quotes', (req, res) => {
    res.sendFile(__dirname + '/index.html')
  })

const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect('mongodb+srv://xtv5949:blie1016@cluster0.fs3bk.mongodb.net/lab5?retryWrites=true&w=majority', { useUnifiedTopology: true })
    .then(client => {
      console.log('Connected to Database')
      const db = client.db('lab5')
      const quotesCollection = db.collection('quotes')


      app.get('/', (req, res) => {
        quotesCollection.deleteOne(
          { name: 'changed1' }
        )
          .then(result => {
            res.json('Deleted')
          })
          .catch(error => console.error(error))
      })
      
      // app.get('/', (req, res) => {
      //   quotesCollection.findOneAndUpdate(
      //     { name: 'test1' },
      //     {
      //       $set: {
      //         name: 'changed1',
      //         quote: 'I am a quote'
      //       }
      //     },
      //     {
      //       upsert: true
      //     }
      // )
      //   .then(result => {
      //     console.log(result)
      //    })
      //   .catch(error => console.error(error))
      // })

      // app.put('/quotes', (req, res) => {
      //   quotesCollection.findOneAndUpdate(
      //       { name: 'test1' },
      //       {
      //         $set: {
      //           name: 'changed1',
      //           quote: 'I am a quote'
      //         }
      //       },
      //       {
      //         upsert: true
      //       }
      //   )
      //     .then(result => {
      //       console.log(result)
      //      })
      //     .catch(error => console.error(error))
      // })

    //   app.get('/', (req, res) => {
    //     db.collection('quotes').find().toArray()
    //       .then(results => {
    //         console.log(results)
    //       })
    //       .catch(error => console.error(error))
    //   })
    })
    .catch(console.error)
