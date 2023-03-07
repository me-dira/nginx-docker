import express from 'express';
import bodyParser from 'body-parser'

let app = express();

app.use(bodyParser.json());

app.use('/', (req, res) => {
  res.json({something: 'mehdi'})
});

app.listen(80, () => {
  console.log('server is running');
})