const express = require('express');
const connectDB = require('./src/configs/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');

// Routes
const userRouter = require('./routes/users');
const EntitiesRouter = require('./routes/Entities');
const AxesRouter = require('./routes/axes');
const ResultatRouter = require('./routes/resultat');
const divRouter = require('./routes/division');
const ActivitiesRouter = require('./routes/activities');
const departmentRouter = require('./routes/deparments'); // corrected typo

dotenv.config();

const app = express();

// Middleware to handle CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // removed trailing slash
  credentials: true // include credentials in CORS
}));

app.use(express.urlencoded({ extended: true }));

// Middleware for parsing cookies
app.use(cookieParser());

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/users', userRouter);
app.use('/division', divRouter);
app.use('/entities', EntitiesRouter);
app.use('/resultat', ResultatRouter);
app.use('/axes',AxesRouter);
app.use('/Activites', ActivitiesRouter);
app.use('/departments', departmentRouter); // corrected typo in route path

// CAPTCHA verification endpoint
app.post("/verify-captcha", async (req, res) => {
  const { token } = req.body;

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    );

    if (response.data.success) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, message: 'CAPTCHA verification failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error verifying reCAPTCHA");
  }
});

const server = require('http').createServer(app);

// Default route - handle 404
app.use('*', async function (req, res) {
  res.status(404).json({ message: "Not Found" });
});

const port = process.env.PORT || 3007;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = app;
