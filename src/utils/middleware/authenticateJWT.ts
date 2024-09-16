import { Request, Response, NextFunction } from 'express';
import JWTService from '../jwtHelper';
import dotenv from "dotenv";
import { Secret } from 'jsonwebtoken';
dotenv.config();
const jwtOP = new JWTService(process.env.JWT_SECRET as Secret);

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwtOP.verifyToken(token);
     
      if (decoded) {
        req.user = { uid: decoded.uid };
        next();
      } else {
        return res.status(403).json({ message: 'Invalid token' });
      }
      
    } catch (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
