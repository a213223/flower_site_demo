import React from 'react';
import { Order } from '../types';
import { Check, X, ShieldCheck, Clock, ExternalLink } from 'lucide-react';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
  onGoToAdmin: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onGoToAdmin
}) => {
  if (!order) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-botanika-text/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-botanika-bg border border-botanika-border w-full max-w-lg rounded-sm p-6 sm:p-10 shadow-modal z-10 space-y-6 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-botanika-muted hover:text-botanika-text transition-colors rounded-full"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-botanika-card border border-botanika-border flex items-center justify-center mx-auto text-botanika-olive">
          <Check className="w-8 h-8 stroke-[2]" />
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-botanika-olive">
            Заказ успешно принят
          </span>
          <h3 id="confirmation-modal-title" className="editorial-heading text-3xl sm:text-4xl text-botanika-text font-normal">
            Спасибо за заказ, {order.customerName}!
          </h3>
          <div className="inline-block bg-botanika-card px-4 py-1.5 rounded-sm border border-botanika-border font-mono text-sm font-bold text-botanika-text tracking-wider">
            № {order.id}
          </div>
        </div>

        {/* Order Details Summary */}
        <div className="bg-botanika-card/50 border border-botanika-border rounded-sm p-4 space-y-3 text-xs">
          <div className="flex justify-between border-b border-botanika-border pb-2">
            <span className="text-botanika-muted">Способ получения:</span>
            <span className="font-medium text-botanika-text">
              {order.fulfillmentType === 'delivery' ? 'Курьерская доставка' : 'Самовывоз из студии'}
            </span>
          </div>

          <div className="flex justify-between border-b border-botanika-border pb-2">
            <span className="text-botanika-muted">Дата и интервал:</span>
            <span className="font-medium text-botanika-text">
              {order.deliveryDate}, {order.deliveryWindow}
            </span>
          </div>

          <div className="flex justify-between border-b border-botanika-border pb-2">
            <span className="text-botanika-muted">Адрес:</span>
            <span className="font-medium text-botanika-text text-right max-w-[240px] truncate">
              {order.address}
            </span>
          </div>

          <div className="flex justify-between border-b border-botanika-border pb-2">
            <span className="text-botanika-muted">Телефон:</span>
            <span className="font-medium text-botanika-text">{order.customerPhone}</span>
          </div>

          {order.postcard && order.postcardText && (
            <div className="pt-1">
              <span className="text-botanika-muted block mb-1">Текст открытки:</span>
              <p className="italic text-botanika-text bg-botanika-bg p-2.5 rounded-sm border border-botanika-border/60">
                «{order.postcardText}»
              </p>
            </div>
          )}

          <div className="pt-2 flex justify-between items-baseline text-sm">
            <span className="font-semibold text-botanika-text uppercase tracking-wider text-xs">Сумма заказа:</span>
            <span className="font-serif text-xl font-bold text-botanika-text">
              {order.total.toLocaleString('ru-RU')} ₽
            </span>
          </div>
        </div>

        {/* What happens next */}
        <div className="space-y-2 text-xs text-botanika-muted">
          <div className="flex items-center gap-2 text-botanika-text font-medium">
            <Clock className="w-4 h-4 text-botanika-olive" />
            <span>Что происходит сейчас:</span>
          </div>
          <p className="leading-relaxed">
            Флорист на Малой Бронной уже видит ваш заказ и приступает к отбору стеблей. 
            Перед отправкой мы пришлем вам фото готового букета в мессенджер.
          </p>
        </div>

        {/* Actions */}
        <div className="pt-2 space-y-2.5">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 bg-botanika-olive hover:bg-botanika-oliveDeep text-white text-xs font-semibold tracking-widest uppercase rounded-sm transition-colors"
          >
            Вернуться на витрину
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onGoToAdmin();
            }}
            className="w-full py-2.5 bg-transparent hover:bg-botanika-card border border-botanika-border text-botanika-muted hover:text-botanika-text text-xs font-medium rounded-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Посмотреть в панели флориста (/admin)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
