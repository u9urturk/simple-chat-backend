import express, { Request, Response } from 'express';
import { UserService } from '../business/concrete/UserService';
import { User } from '../models/user';
import { authenticateJWT } from '../utils/middleware/authenticateJWT';


const router = express.Router();
const userService = new UserService();

router.get('/getall',authenticateJWT, async (req: Request, res: Response) => {


    try {
        const users: User[] = await userService.listUsers();
        if (users) {
            res.status(200).json(users);
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});




export default router;
