import { create } from "zustand";

export const useStore = create<{
  products: Product[];
  customers: Customer[];
  orders: Order[];
  user: User | {};
  cookie: string | "",
}>((set: any) => ({
  cookie: "",
  products: [],
  orders: [],
  customers: [],
  user: {},
}));
