import express, { Request, Response } from 'express';
import { AuthService } from '../business/concrete/AuthServise';
import { User } from '../models/user';
import { UserService } from '../business/concrete/UserService';

import dotenv from 'dotenv';
import { authenticateJWT } from '../utils/middleware/authenticateJWT';

dotenv.config();

const router = express.Router();
const authService = new AuthService();
const userService = new UserService();


router.get('/authdetail',authenticateJWT, async (req: Request, res: Response) => {
  try {
      const data= await userService.getUserById(req.user?.uid as string)
      const user = {
          id:data?.id,
          username:data?.username,
          name:data?.name
      }
      console.log(user)
      if (user) {
          res.status(200).json(user);
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Çıkış işlemi
router.post('/logout', (req: Request, res: Response) => {
  try {
  
    res.clearCookie("token");
    res.status(200).json({ message: 'Logged out successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Kullanıcı kaydı
router.post('/register', async (req: Request, res: Response) => {

  const { username, password, name } = req.body;
  const user: User = {
    id: null,
    username: username,
    name: name,
    password: password,

  }

  if (!username || !password || !name) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newUser = await authService.register(user);
    res.cookie('token',newUser, {
      httpOnly: true, // JavaScript ile erişilemez, XSS'ye karşı güvenlik sağlar
      secure: process.env.NODE_ENV === 'production', // HTTPS üzerinden çalıştığında true, dev ortamda false
      sameSite: 'strict', // CSRF saldırılarına karşı koruma sağlar
      maxAge: 3600000, // 1 saatlik yaşam süresi (milisaniye cinsinden)
    })

    console.log('Set-Cookie header:', res.getHeader('Set-Cookie'));


    res.status(200).json({message:'Registration successful'})
 
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Kullanıcı girişi
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const user = await authService.login(username, password);
    if (user) {
      res.cookie('token',user, {
        httpOnly: true, // JavaScript ile erişilemez, XSS'ye karşı güvenlik sağlar
        secure: process.env.NODE_ENV === 'production', // HTTPS üzerinden çalıştığında true, dev ortamda false
        sameSite: 'strict', // CSRF saldırılarına karşı koruma sağlar
        maxAge: 3600000, // 1 saatlik yaşam süresi (milisaniye cinsinden)
      })

      console.log('Set-Cookie header:', res.getHeader('Set-Cookie'));


      res.status(200).json({message:"Login successful"});
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



export default router;
