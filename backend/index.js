import express from 'express';
// import userRouter from './routes/user.route.js';
import connectDB from './lib/connectDB.js';

const app = express();

// app.use('/users', userRouter);

app.listen(3000, () => {
    connectDB();
    console.log('Server is running!');
});
