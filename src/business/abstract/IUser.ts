import { User } from "../../models/user";

export interface IUser {
    createUser(user: User): Promise<User>;
    getUserById(id: string): Promise<User | null>;
    updateUser(id: string, user: Partial<User>): Promise<User | null>;
    deleteUser(id: string): Promise<boolean>;
    listUsers(): Promise<User[]>;
}