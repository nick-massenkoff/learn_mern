import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import SourceMapSupport from 'source-map-support';
import { MongoClient } from 'mongodb';
import Issue from './issue';

SourceMapSupport.install();
const app = express();

app.use(express.static('static'));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/issues', (req, res, next) => {
  db.collection('issues').find().toArray().then((issues) => {
    const metadata = { total_count: issues.length };
    res.json({ _metadata: metadata, records: issues });
  })
    .catch(err => res.status(500).json({ message: `Internal Server Error: ${err}` }));
});

app.post('/api/issues', (req, res, next) => {
  const newIssue = req.body;
  newIssue.created = new Date();
  if (!newIssue.status) {
    newIssue.status = 'New';
  }
  const validateError = Issue.validateIssue(newIssue);
  if (validateError) {
    console.log(validateError);
    res.status(422).json({ message: `Invalid request: ${validateError}` });
    return;
  }

  db.collection('issues').insertOne(newIssue).then(result => db.collection('issues').findOne({ _id: result.insertedId })).then((issue) => {
    res.json(issue);
  })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: `Internal Server Error: ${err}` });
    });
});

let db;
MongoClient.connect('mongodb://localhost/issueTracker').then((con) => {
  db = con;
  app.listen(3000, () => {
    console.log('App started on port 3000');
  });
}).catch((err) => {
  console.log(err);
});
