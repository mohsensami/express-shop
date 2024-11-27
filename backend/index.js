import express from 'express';
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';
import connectDB from './lib/connectDB.js';

const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/posts', postRouter);

app.use((error, req, res, next) => {
    res.status(error.status || 500);

    res.json({
        message: error.message || 'Something went wrong!',
        status: error.status,
        stack: error.stack,
    });
});

app.listen(3000, () => {
    connectDB();
    console.log('Server is running!');
});
