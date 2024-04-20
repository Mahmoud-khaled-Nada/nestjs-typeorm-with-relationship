import { Request } from 'express';
import { User } from "./database";

export interface AuthenticatedRequest extends Request {
  user: User;
}
export type CreatePostParams = {
  userId: number;
  title: string;
  body: string;
};
