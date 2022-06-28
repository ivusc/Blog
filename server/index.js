import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import cookieParser from 'cookie-parser';


const app = express();
app.use(cookieParser());
app.use(bodyParser.json({limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true }));
app.use(cors({
   origin: true,
   credentials: true
}));
app.use('/posts',postRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000;

const CONNECTION_URL = "mongodb+srv://ivusc:Q7kGLHGCqjldtkdi@webapps.uut5spw.mongodb.net/memoriesApp?retryWrites=true&w=majority";

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
   .then(()=> app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
   .catch((error)=>console.log(error));