import type { Product } from "../products/interface";

export interface CartItemType {
    id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    unit_price: number;
    product?: Product;
}
