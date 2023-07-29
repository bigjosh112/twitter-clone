import express from 'express';
import userRoutes from './routes/userRoutes';
import tweetRoutes from './routes/tweetRoutes';
import authRoutes from './routes/authRoutes';
import { authenticateToken } from './middlewares/authMiddleware';


const app = express();
app.use(express.json());
app.use('/user', authenticateToken, userRoutes);
app.use('/tweet',authenticateToken, tweetRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello world!');
});






const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))