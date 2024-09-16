import { User } from '../../models/user';
import { IAuth } from '../abstract/IAuth';
import { PasswordHash } from '../../utils/passwordHash';
import { UserService } from './UserService';
import dotenv from 'dotenv';
import JWTService from '../../utils/jwtHelper';
import { Secret } from 'jsonwebtoken';

dotenv.config();
export class AuthService implements IAuth {
  private userService = new UserService();
  private passwordHash = new PasswordHash();

  private jwtService = new JWTService(process.env.JWT_SECRET as Secret);

  async register(user:User): Promise<string|null> {
   
    const result =await  this.userService.createUser(user)

    if(result){
      console.log(`Kullanıcı kaydı başarılı id:${result.id}`)
      const token:string = this.jwtService.generateToken({uid:result.id});
      return token;
    }

    return null;

  }

  async login(username: string, password: string): Promise<string | null> {
    const users = await this.userService.listUsers();
    const user = users.find(u => u.username === username);
    
    if (!user) return null;

    const isPasswordValid = await this.passwordHash.comparePassword(password, user.password);
    if (isPasswordValid) {
      const token:string = this.jwtService.generateToken({uid:user.id});
      return token;
    } else{
      return "Şifre hatalı";
    }
  }
}
