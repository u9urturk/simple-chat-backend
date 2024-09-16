import { User } from "../../models/user";

export interface IAuth {
    register(user:User): Promise<string|null>;
    login(username: string, password: string): Promise<string | null>;
}