import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import apiRoutes from './routes/api';
import fccTestingRoutes from './routes/fcctesting';
import runner from './test-runner';

let app = express();

app.use('/public', express.static(__dirname + '/public'));

app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route('/')
  .get(function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
  });


fccTestingRoutes(app);

apiRoutes(app);

app.use(function (req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const port = process.env.PORT || 3000;


app.listen(port, ()=> {
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(()=> {
      try {
        runner.run();
      } catch (e) {
        console.log('Tests are not valid:');
        console.error(e);
      }
    }, 1500);
  }
  console.log("Listening on port " + port);
});

export default app
