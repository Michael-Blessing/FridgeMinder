export interface MyUser {
  id: string;
  image: string;
  name: string;
  email: string;
  cart: string[];
}

export type { MyUser as UserType };
