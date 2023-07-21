import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import AuthRouter from './routes/Auth.js';
import UserRouter from './routes/User.js';
import PostRouter from './routes/Post.js';
import ChatRouter from './routes/Chat.js';
import MessageRouter from './routes/Message.js';

const app = express();

dotenv.config();

const hostname = '0.0.0.0';
const port = 3131;

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'Social Chat Docs',
            constact: {
                name: 'Daniel Graham',
                email: 'dgb@gmail.com',
            },
            servers: [`http://${hostname}:${port}`],
            basePath: '/doc',
        },
    },
    apis: ['server/routes/*.js']
};

// Docs Setup
// expressJSDocSwagger(app)(options);
const swaggerDocs = swaggerJSDoc(options);

// Middleware
app.use(express.static('public'));
app.use('/images', express.static(__dirname + '/public/imgs'));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));


// Routes
app.use('/api/auth', AuthRouter)
app.use('/api/user', UserRouter)
app.use('/api/post', PostRouter)
app.use('/api/chat', ChatRouter)
app.use('/api/message', MessageRouter)
// to serve images inside public folder
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


// Server Setup
mongoose.connect(process.env.MONGOOSE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}).catch((err) => {
    console.log(err);
});
