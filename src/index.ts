import express from 'express';
import userRoutes from './routes/userRoutes';
import tweetRoutes from './routes/tweetRoutes';
import authRoutes from './routes/authRoutes';



const app = express();
app.use(express.json());
app.use('/user',userRoutes);
app.use('/tweet',tweetRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello world!');
});






const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))