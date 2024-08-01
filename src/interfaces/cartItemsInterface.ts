import { ParsedData } from "./ParsedDataInterface";


export interface CartItem{
  product:ParsedData;
  _id:string;
  quantity: number;
}