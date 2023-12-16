import { AdapterUser } from "@auth/core/adapters";

declare module "@auth/core/adapters" {
  interface AdapterUser {
    cart: any[]; // Add this line
  }
}
