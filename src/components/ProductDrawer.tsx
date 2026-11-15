import React, { useState, useEffect } from 'react';
import { Product, ProductSize } from '../types';
import { X, Check, Droplets, Truck, ShieldCheck, Sparkles } from 'lucide-react';

interface ProductDrawerProps {
  product: Product | null;
  initialSize?: ProductSize;
  onClose: () => void;
  onAddToCart: (product: Product, size: ProductSize) => void;
}

export const ProductDrawer: React.FC<ProductDrawerProps> = ({
  product,
  initialSize = 'M',
  onClose,
  onAddToCart
}) => {
  const [selectedSize, setSelectedSize] = useState<ProductSize>(initialSize);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  // Reset selected size when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize(initialSize);
      setIsAddedFeedback(false);
    }
  }, [product, initialSize]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const currentSizeDetail = product.sizes[selectedSize];
  const sizeKeys: ProductSize[] = ['S', 'M', 'L'];

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
      onClose();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-drawer-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-botanika-text/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-lg bg-botanika-bg border-l border-botanika-border shadow-drawer flex flex-col justify-between overflow-y-auto">
          
          {/* Header */}
          <div className="sticky top-0 z-10 bg-botanika-bg/95 backdrop-blur-md px-6 py-4 border-b border-botanika-border flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-botanika-olive">
              {product.categoryLabel}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-2 -mr-2 text-botanika-muted hover:text-botanika-text transition-colors rounded-full focus-visible:ring-2 focus-visible:ring-botanika-olive"
              aria-label="Закрыть окно"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-8 flex-1">
            
            {/* Main Product Image */}
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-botanika-card border border-botanika-border">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover filter saturate-[0.94]"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 bg-botanika-bg/90 backdrop-blur-sm px-3 py-1 rounded-sm text-[11px] font-semibold tracking-wider uppercase text-botanika-olive border border-botanika-border/60">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Title & Description */}
            <div>
              <h2
                id="product-drawer-title"
                className="editorial-heading text-3xl sm:text-4xl text-botanika-text font-normal mb-3"
              >
                {product.title}
              </h2>
              <p className="text-sm text-botanika-muted leading-relaxed font-normal">
                {product.description}
              </p>
            </div>

            {/* Size Selector (S / M / L) */}
            <div className="space-y-3 pt-2 border-t border-botanika-border">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-botanika-text">
                  Выберите формат букета
                </span>
                <span className="text-xs text-botanika-subtle font-mono">
                  Ø {currentSizeDetail.diameter}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {sizeKeys.map((size) => {
                  const detail = product.sizes[size];
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 text-left rounded-sm border transition-all text-xs flex flex-col justify-between ${
                        isSelected
                          ? 'border-botanika-olive bg-botanika-card text-botanika-text ring-1 ring-botanika-olive'
                          : 'border-botanika-border bg-botanika-bg hover:bg-botanika-card/50 text-botanika-muted'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-botanika-text">{size}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-botanika-olive"></span>}
                      </div>
                      <div className="text-[11px] text-botanika-subtle leading-tight mb-2">
                        {detail.stemCount}
                      </div>
                      <div className="font-semibold text-xs text-botanika-text">
                        {detail.price.toLocaleString('ru-RU')} ₽
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Composition / Floral Recipe */}
            <div className="space-y-3 pt-2 border-t border-botanika-border">
              <span className="text-xs font-semibold uppercase tracking-wider text-botanika-text block">
                Флористический состав
              </span>
              <ul className="space-y-2">
                {product.composition.map((flower, idx) => (
                  <li key={idx} className="text-xs text-botanika-muted flex items-start gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-botanika-olive mt-1.5 flex-shrink-0" />
                    <span>{flower}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Care Guide */}
            <div className="space-y-2 pt-2 border-t border-botanika-border">
              <div className="flex items-center gap-2 text-botanika-olive">
                <Droplets className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-botanika-text">
                  Совет флориста по уходу
                </span>
              </div>
              <p className="text-xs text-botanika-muted leading-relaxed font-normal bg-botanika-card/60 p-3 rounded-sm border border-botanika-border/60">
                {product.careTips}
              </p>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-3 text-xs text-botanika-muted pt-2 border-t border-botanika-border">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-botanika-olive flex-shrink-0" />
                <span>Доставка по Москве от 90 мин</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-botanika-olive flex-shrink-0" />
                <span>Фото букета перед отправкой</span>
              </div>
            </div>

          </div>

          {/* Sticky Bottom Actions */}
          <div className="sticky bottom-0 bg-botanika-bg border-t border-botanika-border p-6 sm:p-8 space-y-3 shadow-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-botanika-muted">Итоговая стоимость:</span>
              <div className="text-right">
                <span className="font-serif text-2xl font-semibold text-botanika-text">
                  {currentSizeDetail.price.toLocaleString('ru-RU')} ₽
                </span>
                <span className="text-[11px] text-botanika-subtle block">
                  Размер {currentSizeDetail.label}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              disabled={isAddedFeedback}
              className={`w-full py-4 text-xs font-semibold tracking-widest uppercase rounded-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-botanika-olive ${
                isAddedFeedback
                  ? 'bg-botanika-olive text-white'
                  : 'bg-botanika-olive hover:bg-botanika-oliveDeep text-white shadow-sm'
              }`}
            >
              {isAddedFeedback ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Добавлено в корзину!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Добавить в корзину — {currentSizeDetail.price.toLocaleString('ru-RU')} ₽</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
