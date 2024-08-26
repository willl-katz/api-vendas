import { ICreateUser } from "../models/ICreateUser";
import { IUser } from "../models/IUser";

export interface IUserRepository {
  findByName(name: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  create(data: ICreateUser): Promise<IUser>;
  save(user: IUser): Promise<void>;
  find(): Promise<IUser[]>;
}
