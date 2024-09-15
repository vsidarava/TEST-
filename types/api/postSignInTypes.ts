import { Roles } from "./roles";

export interface LoginResponse {
  username: string;
  roles: Roles[];
  firstName: string;
  lastName: string;
  token: string;
  email: string;
}
