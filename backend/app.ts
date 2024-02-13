import 'dotenv/config'
import express from 'express';
import sequelize from './db';
import router from "./routes/router";
import bodyParser from 'body-parser'
import cors from 'cors'

const User = require('./models/user');
const Slider = require('./models/slider');

const { createSlider, updateSlider } = require('./controller/slider.controller');
const { createUser, updateUser, getUser } = require('./controller/user.controller');

const app = express();
const PORT = 3000;

app.use(cors())
app.use(bodyParser.json())

// // Sync model dengan database
sequelize.sync({
    logging: console.log
})
  .then(() => {
    console.log('db connect')
    
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

// Routes
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




