const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {}).then(() => {
  // console.log(con.connections);
  console.log('DB connection success!');
});

const port = 5000;
app.listen(port, () => {
  console.log('App is listening.....');
});
