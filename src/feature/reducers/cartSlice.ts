// Define or import ICartItem before using it
interface ICartItem {
    // Define the properties of a cart item, for example:
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface ICartState {
    isCartOpen: boolean;
    cartItems: ICartItem[];
//     totalItems: number;
//     totalPrice: number;
//     totalPriceWithDeliveryPrice?: number;
//     totalShipping: number;
// }
}