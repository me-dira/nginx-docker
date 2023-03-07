import express from 'express';
import bodyParser from 'body-parser'

let app = express();
app.set('trust proxy', '1')

app.use(bodyParser.json());

app.get('', (req, res) => {
  res.json({message: "This is random: " + Math.floor(Math.random() * 99999999)})
});

app.get('/rand', (req, res) => {
  res.json({random: Math.floor(Math.random() * 99999999)})
});

app.listen(80, () => {
  console.log('server is running');
})