import { Product } from "./product";

export default interface Order {
    id: string,
    date: number,
    order: Array<Product>,
}