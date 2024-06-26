require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const authController = require('./routes/userAuth');
const routes = require('./routes');
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/', routes);

app.listen(PORT, async () => {
  await dbConnect();
  console.log(`Server is running on port ${PORT}`);
});

async function dbConnect() {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB at ${DB_URL}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
  }
}
