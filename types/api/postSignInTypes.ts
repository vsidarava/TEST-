import { Roles } from "./roles";

export interface LoginResponse {
  username: string;
  roles: Roles[];
  firstName: string;
  lastName: string;
  token: string;
  email: string;
}

export interface ErrorLoginResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
};
