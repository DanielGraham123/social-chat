import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import AuthRouter from './routes/Auth.js';
import UserRouter from './routes/User.js';

const app = express();

dotenv.config();

const hostname = '127.0.0.1';
const port = 3131;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/auth', AuthRouter)
app.use('/user', UserRouter)

// Server Setup
mongoose.connect(process.env.MONGOOSE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}).catch((err) => {
    console.log(err);
});
