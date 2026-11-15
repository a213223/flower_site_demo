import React, { useState } from 'react';
import { CartItem, FulfillmentType, Order } from '../types';
import { X, Trash2, Plus, Minus, Mail, MapPin, Truck, Calendar, Clock, ShoppingBag } from 'lucide-react';
import { saveOrder } from '../data/storage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess
}) => {
  // Checkout state
  const [fulfillment, setFulfillment] = useState<FulfillmentType>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('Сегодня');
  const [deliveryWindow, setDeliveryWindow] = useState('14:00 – 16:00');
  const [courierComment, setCourierComment] = useState('');
  
  // Postcard state
  const [includePostcard, setIncludePostcard] = useState(false);
  const [postcardText, setPostcardText] = useState('');

  // Form errors
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Financial calculations
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = fulfillment === 'pickup' ? Math.round(subtotal * 0.1) : 0;
  const deliveryCost = fulfillment === 'pickup' ? 0 : (subtotal >= 7000 ? 0 : 490);
  const total = Math.max(0, subtotal - discount + deliveryCost);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (items.length === 0) {
      setErrorMessage('Корзина пуста');
      return;
    }

    if (!customerName.trim()) {
      setErrorMessage('Пожалуйста, укажите имя заказчика');
      return;
    }

    if (!customerPhone.trim() || customerPhone.trim().length < 8) {
      setErrorMessage('Пожалуйста, укажите контактный телефон для связи');
      return;
    }

    if (fulfillment === 'delivery' && !address.trim()) {
      setErrorMessage('Пожалуйста, укажите адрес доставки в Москве');
      return;
    }

    setIsSubmitting(true);

    // Generate unique order ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrderId = `BOT-${randomSuffix}`;

    const newOrder: Order = {
      id: newOrderId,
      createdAt: new Date().toISOString(),
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      fulfillmentType: fulfillment,
      address: fulfillment === 'pickup' ? 'Студия «БОТАНИКА», Москва, ул. Малая Бронная, 18' : address.trim(),
      deliveryDate,
      deliveryWindow: fulfillment === 'pickup' ? `${deliveryWindow} (Самовывоз)` : deliveryWindow,
      courierComment: courierComment.trim() || undefined,
      postcard: includePostcard,
      postcardText: includePostcard ? postcardText.trim() : undefined,
      items: items.map(item => ({
        productId: item.productId,
        title: item.title,
        size: item.size,
        sizeLabel: item.sizeLabel,
        quantity: item.quantity,
        price: item.price
      })),
      subtotal,
      deliveryCost,
      discount,
      total,
      status: 'new'
    };

    // Save to shared localStorage database
    saveOrder(newOrder);

    setTimeout(() => {
      setIsSubmitting(false);
      onClearCart();
      onOrderSuccess(newOrder);
      onClose();
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-heading"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-botanika-text/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-xl bg-botanika-bg border-l border-botanika-border shadow-drawer flex flex-col justify-between overflow-y-auto">
          
          {/* Header */}
          <div className="sticky top-0 z-10 bg-botanika-bg/95 backdrop-blur-md px-6 py-4 border-b border-botanika-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-botanika-olive" />
              <h2 id="cart-drawer-heading" className="text-sm font-semibold uppercase tracking-wider text-botanika-text">
                Ваша корзина ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 -mr-2 text-botanika-muted hover:text-botanika-text transition-colors rounded-full focus-visible:ring-2 focus-visible:ring-botanika-olive"
              aria-label="Закрыть корзину"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="p-6 sm:p-8 space-y-8 flex-1">
            
            {items.length === 0 ? (
              /* Empty state (Craftsmanship Rule) */
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-botanika-card border border-botanika-border flex items-center justify-center mx-auto mb-4 text-botanika-subtle">
                  <ShoppingBag className="w-7 h-7 stroke-[1.25]" />
                </div>
                <p className="editorial-heading text-2xl text-botanika-text mb-2">
                  В корзине пока пусто
                </p>
                <p className="text-xs text-botanika-muted max-w-xs mx-auto mb-6">
                  Выберите понравившийся букет из нашей сезонной коллекции или воспользуйтесь сборкой по бюджету.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-botanika-olive text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-botanika-oliveDeep transition-colors"
                >
                  Перейти в каталог
                </button>
              </div>
            ) : (
              <>
                {/* Items list */}
                <div className="space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-botanika-text block">
                    Выбранные букеты
                  </span>

                  <div className="divide-y divide-botanika-border border-y border-botanika-border">
                    {items.map((item) => (
                      <div key={item.id} className="py-4 flex gap-4 items-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-20 object-cover rounded-sm bg-botanika-card border border-botanika-border flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-lg text-botanika-text truncate font-normal">
                            {item.title}
                          </h4>
                          <p className="text-xs text-botanika-subtle mb-2">
                            Размер {item.sizeLabel} • {item.diameter}
                          </p>
                          <div className="font-semibold text-xs text-botanika-text">
                            {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                          </div>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-botanika-border rounded-sm bg-botanika-card/50">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 text-botanika-muted hover:text-botanika-text transition-colors"
                            aria-label="Уменьшить количество"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-medium text-botanika-text">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 text-botanika-muted hover:text-botanika-text transition-colors"
                            aria-label="Увеличить количество"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="p-2 text-botanika-subtle hover:text-botanika-terracotta transition-colors"
                          aria-label="Удалить позицию"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Free Greeting Postcard Section */}
                <div className="bg-botanika-card/50 border border-botanika-border rounded-sm p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="postcard-checkbox" className="flex items-center gap-2 cursor-pointer">
                      <input
                        id="postcard-checkbox"
                        type="checkbox"
                        checked={includePostcard}
                        onChange={(e) => setIncludePostcard(e.target.checked)}
                        className="rounded border-botanika-border text-botanika-olive focus:ring-botanika-olive cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-botanika-text">
                        Бесплатная открытка с вашим текстом
                      </span>
                    </label>
                    <Mail className="w-4 h-4 text-botanika-olive" />
                  </div>

                  {includePostcard && (
                    <div className="pt-2 animate-in fade-in duration-150">
                      <textarea
                        rows={3}
                        value={postcardText}
                        onChange={(e) => setPostcardText(e.target.value)}
                        placeholder="Напишите слова поздравления, пожелание или подпись. Флорист аккуратно перенесет их на открытку от руки..."
                        className="w-full text-xs p-3 rounded-sm border border-botanika-border bg-botanika-bg text-botanika-text placeholder:text-botanika-subtle focus:outline-none focus:ring-1 focus:ring-botanika-olive"
                      />
                    </div>
                  )}
                </div>

                {/* Checkout Form */}
                <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-6 pt-4 border-t border-botanika-border">
                  <span className="text-xs font-semibold uppercase tracking-wider text-botanika-text block">
                    Детали оформления заказа
                  </span>

                  {/* Delivery vs Pickup Toggle */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-botanika-card border border-botanika-border rounded-sm text-xs">
                    <button
                      type="button"
                      onClick={() => setFulfillment('delivery')}
                      className={`py-2 px-3 rounded-sm font-medium flex items-center justify-center gap-1.5 transition-all ${
                        fulfillment === 'delivery'
                          ? 'bg-botanika-bg text-botanika-text shadow-sm border border-botanika-border/60'
                          : 'text-botanika-muted hover:text-botanika-text'
                      }`}
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Курьер по Москве</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFulfillment('pickup')}
                      className={`py-2 px-3 rounded-sm font-medium flex items-center justify-center gap-1.5 transition-all ${
                        fulfillment === 'pickup'
                          ? 'bg-botanika-bg text-botanika-text shadow-sm border border-botanika-border/60'
                          : 'text-botanika-muted hover:text-botanika-text'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 text-botanika-olive" />
                      <span>Самовывоз (-10%)</span>
                    </button>
                  </div>

                  {/* Customer Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="customer-name" className="text-[11px] font-medium text-botanika-muted block mb-1">
                        Имя заказчика *
                      </label>
                      <input
                        id="customer-name"
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Например, Анна"
                        className="w-full text-xs p-2.5 rounded-sm border border-botanika-border bg-botanika-bg text-botanika-text focus:outline-none focus:ring-1 focus:ring-botanika-olive"
                      />
                    </div>

                    <div>
                      <label htmlFor="customer-phone" className="text-[11px] font-medium text-botanika-muted block mb-1">
                        Телефон для связи *
                      </label>
                      <input
                        id="customer-phone"
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+7 (999) 000-00-00"
                        className="w-full text-xs p-2.5 rounded-sm border border-botanika-border bg-botanika-bg text-botanika-text focus:outline-none focus:ring-1 focus:ring-botanika-olive"
                      />
                    </div>
                  </div>

                  {/* Address (or Studio pickup notification) */}
                  {fulfillment === 'delivery' ? (
                    <div>
                      <label htmlFor="delivery-address" className="text-[11px] font-medium text-botanika-muted block mb-1">
                        Адрес доставки по Москве *
                      </label>
                      <input
                        id="delivery-address"
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Улица, дом, подъезд, квартира/офис"
                        className="w-full text-xs p-2.5 rounded-sm border border-botanika-border bg-botanika-bg text-botanika-text focus:outline-none focus:ring-1 focus:ring-botanika-olive"
                      />
                    </div>
                  ) : (
                    <div className="p-3 bg-botanika-card/60 border border-botanika-border rounded-sm text-xs text-botanika-muted flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-botanika-olive mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-botanika-text block">Адрес студии:</strong>
                        Москва, ул. Малая Бронная, 18. Ежедневно с 09:00 до 22:00. Букет будет собран к вашему приезду в аквапаке.
                      </div>
                    </div>
                  )}

                  {/* Date & Interval */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="delivery-date" className="text-[11px] font-medium text-botanika-muted flex items-center gap-1 mb-1">
                        <Calendar className="w-3 h-3 text-botanika-olive" />
                        Дата вручения
                      </label>
                      <select
                        id="delivery-date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-sm border border-botanika-border bg-botanika-bg text-botanika-text focus:outline-none focus:ring-1 focus:ring-botanika-olive cursor-pointer"
                      >
                        <option value="Сегодня">Сегодня</option>
                        <option value="Завтра">Завтра</option>
                        <option value="Послезавтра">Послезавтра</option>
                        <option value="Выбрать дату с оператором">Другая дата (уточнить)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="delivery-window" className="text-[11px] font-medium text-botanika-muted flex items-center gap-1 mb-1">
                        <Clock className="w-3 h-3 text-botanika-olive" />
                        Интервал времени
                      </label>
                      <select
                        id="delivery-window"
                        value={deliveryWindow}
                        onChange={(e) => setDeliveryWindow(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-sm border border-botanika-border bg-botanika-bg text-botanika-text focus:outline-none focus:ring-1 focus:ring-botanika-olive cursor-pointer"
                      >
                        <option value="Срочно за 90 минут">Срочно за 90 минут (экспресс)</option>
                        <option value="10:00 – 12:00">10:00 – 12:00 (утро)</option>
                        <option value="12:00 – 15:00">12:00 – 15:00 (день)</option>
                        <option value="15:00 – 18:00">15:00 – 18:00 (день)</option>
                        <option value="18:00 – 21:00">18:00 – 21:00 (вечер)</option>
                      </select>
                    </div>
                  </div>

                  {/* Courier Comment */}
                  <div>
                    <label htmlFor="courier-notes" className="text-[11px] font-medium text-botanika-muted block mb-1">
                      Комментарий флористу или курьеру
                    </label>
                    <input
                      id="courier-notes"
                      type="text"
                      value={courierComment}
                      onChange={(e) => setCourierComment(e.target.value)}
                      placeholder="Код домофона, оставить консьержу, позвонить за 15 минут..."
                      className="w-full text-xs p-2.5 rounded-sm border border-botanika-border bg-botanika-bg text-botanika-text focus:outline-none focus:ring-1 focus:ring-botanika-olive"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-botanika-terracotta/10 border border-botanika-terracotta/30 text-botanika-terracotta text-xs rounded-sm">
                      {errorMessage}
                    </div>
                  )}
                </form>
              </>
            )}

          </div>

          {/* Sticky Bottom Actions */}
          {items.length > 0 && (
            <div className="sticky bottom-0 bg-botanika-bg border-t border-botanika-border p-6 sm:p-8 space-y-4 shadow-lg">
              
              {/* Price Calculation breakdown */}
              <div className="space-y-1.5 text-xs text-botanika-muted">
                <div className="flex justify-between">
                  <span>Стоимость букетов:</span>
                  <span className="font-medium text-botanika-text">{subtotal.toLocaleString('ru-RU')} ₽</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-botanika-olive font-medium">
                    <span>Скидка за самовывоз (10%):</span>
                    <span>-{discount.toLocaleString('ru-RU')} ₽</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Доставка по Москве:</span>
                  <span>
                    {fulfillment === 'pickup' ? (
                      'Не требуется'
                    ) : deliveryCost === 0 ? (
                      <span className="text-botanika-olive font-semibold">Бесплатно (от 7 000 ₽)</span>
                    ) : (
                      '490 ₽'
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-botanika-border flex items-baseline justify-between text-sm">
                  <span className="font-semibold text-botanika-text uppercase tracking-wider text-xs">
                    Итого к оплате:
                  </span>
                  <span className="font-serif text-2xl font-bold text-botanika-text">
                    {total.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full py-4 bg-botanika-olive hover:bg-botanika-oliveDeep text-white text-xs font-semibold tracking-widest uppercase rounded-sm transition-all duration-150 active:scale-[0.98] shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? 'Оформляем заказ...' : `Оформить заказ — ${total.toLocaleString('ru-RU')} ₽`}
              </button>

              <p className="text-[10px] text-center text-botanika-subtle leading-tight">
                Нажимая кнопку, вы подтверждаете заказ. Оплата при получении курьеру картой/наличными или по ссылке после фотоконтроля.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
