import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from '../routes/authRoutes';
import userRoutes from '../routes/userRoutes';
import cors from 'cors';
import cookieParser from 'cookie-parser';

class ExpressService {
    private app = express();
    private port: number;



    constructor(port: number = 3000) {
        this.port = port;

    }

    start() {
        this.app.use(cors({
            origin: 'http://localhost:5173', // Frontend URL
            credentials: true // Çerezler için gerekli
        }));

        // this.app.use(cors())
        this.app.use(cookieParser());
        this.app.use(bodyParser.json());
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/users', userRoutes)

        this.app.listen(this.port, () => {
            console.log(`Express Server is running on port http://localhost:${this.port}`);
        });

    }
}


export default ExpressService;