export type ProductSize = 'S' | 'M' | 'L';

export interface ProductSizeDetail {
  size: ProductSize;
  label: string;       // e.g. "Компактный S"
  diameter: string;    // e.g. "25–28 см"
  stemCount: string;   // e.g. "15–19 стеблей"
  price: number;       // e.g. 4800
}

export type Category = 'all' | 'author' | 'mono' | 'dried';

export interface Product {
  id: string;
  title: string;
  category: 'author' | 'mono' | 'dried';
  categoryLabel: string;
  description: string;
  composition: string[];
  careTips: string;
  image: string;
  sizes: Record<ProductSize, ProductSizeDetail>;
  basePrice: number;
  badge?: string;
}

export interface CartItem {
  id: string; // unique item key: productId + size
  productId: string;
  title: string;
  image: string;
  size: ProductSize;
  sizeLabel: string;
  diameter: string;
  price: number;
  quantity: number;
}

export type OrderStatus = 'new' | 'assembling' | 'courier' | 'completed' | 'cancelled';
export type FulfillmentType = 'delivery' | 'pickup';

export interface OrderItemSummary {
  productId: string;
  title: string;
  size: ProductSize;
  sizeLabel: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string; // e.g. BOT-1045
  createdAt: string; // ISO string
  customerName: string;
  customerPhone: string;
  fulfillmentType: FulfillmentType;
  address: string;
  deliveryDate: string;
  deliveryWindow: string;
  courierComment?: string;
  postcard: boolean;
  postcardText?: string;
  items: OrderItemSummary[];
  subtotal: number;
  deliveryCost: number;
  discount: number;
  total: number;
  status: OrderStatus;
}
