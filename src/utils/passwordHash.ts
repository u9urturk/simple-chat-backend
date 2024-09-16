import bcrypt from 'bcrypt';
const saltRounds = 10;

export class PasswordHash {


    async passwordHashed(password:string):Promise<string>{
       

        return bcrypt.hash(password, saltRounds);


    }

    
    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
      }


}