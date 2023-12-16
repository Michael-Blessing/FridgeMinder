import { Cart } from "./CartType";

export interface MyUser {
  id: string;
  image: string;
  name: string;
  email: string;
  cart: Cart[];
}

export type { MyUser as UserType };
