import express from 'express';
import userRoutes from './routes/userRoutes';
import tweetRoutes from './routes/tweetRoutes';



const app = express();
app.use(express.json());
app.use('/user',userRoutes);
app.use('/tweet',tweetRoutes);

app.get('/', (req, res) => {
    res.send('Hello world!');
});






const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))