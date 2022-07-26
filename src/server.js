
import express from 'express';
import { expect } from 'chai';
import cors from 'cors';
import apiRoutes from './routes/api';
import fccTestingRoutes from './routes/fcctesting';
import runner from './test-runner';
import helmet from 'helmet'
var app = express();

app.use('/public', express.static(process.cwd() + '/public'));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet.noSniff())
app.use(helmet.xssFilter())

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);

//404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const PORT = process.env.PORT || 3000;
//Start our server and tests!
app.listen(PORT, function () {
  console.log("Listening on port " + PORT);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (e) {
        var error = e;
        console.log('Tests are not valid:');
        console.log(error);
      }
    }, 1500);
  }
});

export default app
