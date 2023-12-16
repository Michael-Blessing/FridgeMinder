import { AdapterUser } from "@auth/core/adapters";
import { Cart } from "./CartType";

declare module "@auth/core/adapters" {
  interface AdapterUser {
    cart: Cart[];
  }
}
