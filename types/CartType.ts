export interface Cart {
  id: number;
  name: string;
  image: string;
  amount: number;
  unit?: string;
}

export type { Cart as CartType };
