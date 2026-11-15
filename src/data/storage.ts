import { Order, OrderStatus } from '../types';

const STORAGE_ORDERS_KEY = 'botanika_orders_db_v1';
const STORAGE_AUTH_KEY = 'botanika_admin_auth_v1';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'BOT-1042',
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    customerName: 'Анна Воронова',
    customerPhone: '+7 (916) 452-88-19',
    fulfillmentType: 'delivery',
    address: 'ул. Тверская, д. 12, кв. 44, подъезд 2',
    deliveryDate: 'Сегодня',
    deliveryWindow: '14:00 – 16:00',
    courierComment: 'Позвонить за 15 минут, оставить консьержу если не открою',
    postcard: true,
    postcardText: 'С днем рождения, дорогая Анечка! Пусть каждый твой день будет наполнен светом, теплом и вдохновением. Твоя Катя.',
    items: [
      {
        productId: 'bot-north-whisper',
        title: 'Шёпот Севера',
        size: 'M',
        sizeLabel: 'Классический M',
        quantity: 1,
        price: 7800
      }
    ],
    subtotal: 7800,
    deliveryCost: 0,
    discount: 0,
    total: 7800,
    status: 'courier'
  },
  {
    id: 'BOT-1043',
    createdAt: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
    customerName: 'Михаил Соколов',
    customerPhone: '+7 (903) 781-90-22',
    fulfillmentType: 'delivery',
    address: 'Кутузовский проспект, д. 24, корп. 1, кв. 110',
    deliveryDate: 'Сегодня',
    deliveryWindow: '17:00 – 19:00',
    courierComment: 'Шлагбаум открывается с телефона, номер охраны на охране',
    postcard: true,
    postcardText: 'С нашей пятой годовщиной, любимая! Ты делаешь наш мир прекраснее каждый день.',
    items: [
      {
        productId: 'bot-flemish-still',
        title: 'Фламандский натюрморт',
        size: 'L',
        sizeLabel: 'Парадный L',
        quantity: 1,
        price: 11500
      }
    ],
    subtotal: 11500,
    deliveryCost: 0,
    discount: 0,
    total: 11500,
    status: 'assembling'
  },
  {
    id: 'BOT-1044',
    createdAt: new Date(Date.now() - 210 * 60 * 1000).toISOString(),
    customerName: 'Екатерина Лисицына',
    customerPhone: '+7 (925) 314-55-67',
    fulfillmentType: 'pickup',
    address: 'Студия «БОТАНИКА», ул. Малая Бронная, 18',
    deliveryDate: 'Сегодня',
    deliveryWindow: '18:30 (Самовывоз)',
    courierComment: 'Заберу сама после работы, упакуйте пожалуйста в крафтовый пакет с ручками',
    postcard: false,
    items: [
      {
        productId: 'bot-patrimony',
        title: 'Утро на Патриарших',
        size: 'S',
        sizeLabel: 'Компактный S',
        quantity: 1,
        price: 4800
      }
    ],
    subtotal: 4800,
    deliveryCost: 0,
    discount: 480,
    total: 4320,
    status: 'completed'
  }
];

export function getStoredOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_ORDERS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return parsed;
  } catch (e) {
    console.error('Failed to parse orders from localStorage', e);
    return INITIAL_ORDERS;
  }
}

function notifyOrdersUpdated() {
  window.dispatchEvent(new CustomEvent('botanika:orders-updated'));
}

export function saveOrder(order: Order): void {
  const current = getStoredOrders();
  const updated = [order, ...current];
  localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(updated));
  notifyOrdersUpdated();
}

export function updateOrderStatus(orderId: string, status: OrderStatus): void {
  const current = getStoredOrders();
  const updated = current.map(item => item.id === orderId ? { ...item, status } : item);
  localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(updated));
  notifyOrdersUpdated();
}

export function deleteOrder(orderId: string): void {
  const current = getStoredOrders();
  const updated = current.filter(item => item.id !== orderId);
  localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(updated));
  notifyOrdersUpdated();
}

export function resetOrdersToDefault(): void {
  localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
  notifyOrdersUpdated();
}

export function checkAdminAuth(): boolean {
  return localStorage.getItem(STORAGE_AUTH_KEY) === 'true';
}

export function setAdminAuth(isAuth: boolean): void {
  if (isAuth) {
    localStorage.setItem(STORAGE_AUTH_KEY, 'true');
  } else {
    localStorage.removeItem(STORAGE_AUTH_KEY);
  }
}

export function subscribeToOrders(callback: () => void): () => void {
  const handleCustom = () => callback();
  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_ORDERS_KEY) {
      callback();
    }
  };

  window.addEventListener('botanika:orders-updated', handleCustom);
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener('botanika:orders-updated', handleCustom);
    window.removeEventListener('storage', handleStorage);
  };
}
