import UserModel from "../../models/schema/userSchema";
import { User } from "../../models/user";
import { PasswordHash } from "../../utils/passwordHash";
import { IUser } from "../abstract/IUser";


export class UserService implements IUser {

  private passwordHash = new PasswordHash();


  async createUser(user: User): Promise<User> {
    const newUser = new UserModel({
      id: null,
      username: user.username,
      name: user.name,
      password: await this.passwordHash.passwordHashed(user.password)
    });
    console.log(newUser)
    return await newUser.save();
  }

  async getUserById(id: string): Promise<User | null> {
    return await UserModel.findById(id).exec();
  }

  async updateUser(id: string, user: Partial<User>): Promise<User | null> {
    return await UserModel.findByIdAndUpdate(id, user, { new: true }).exec();

  }

  async deleteUser(id: string): Promise<boolean> {
     await UserModel.findByIdAndDelete(id).exec().then(res=>{
      return true;
     })

     return false;
     

  }

  async listUsers(): Promise<User[]> {

    return await UserModel.find().exec();

  }
}
