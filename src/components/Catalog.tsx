import React, { useState, useMemo } from 'react';
import { Product, Category, ProductSize } from '../types';
import { SlidersHorizontal, Plus, ArrowUpRight, Check } from 'lucide-react';

interface CatalogProps {
  products: Product[];
  onSelectProduct: (product: Product, defaultSize?: ProductSize) => void;
  onQuickAddToCart: (product: Product, size: ProductSize) => void;
}

export const Catalog: React.FC<CatalogProps> = ({
  products,
  onSelectProduct,
  onQuickAddToCart
}) => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [addedItemKey, setAddedItemKey] = useState<string | null>(null);

  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: 'Все букеты' },
    { key: 'author', label: 'Авторские' },
    { key: 'mono', label: 'Монобукеты' },
    { key: 'dried', label: 'Сухоцветы' }
  ];

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.basePrice - a.basePrice);
    }

    return result;
  }, [products, activeCategory, sortBy]);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onQuickAddToCart(product, 'M');
    setAddedItemKey(product.id);
    setTimeout(() => setAddedItemKey(null), 1600);
  };

  return (
    <section id="catalog" className="py-16 sm:py-24 bg-botanika-bg border-b border-botanika-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-botanika-olive">
              Каталог студии
            </span>
            <h2 className="editorial-heading text-3xl sm:text-4xl lg:text-5xl text-botanika-text mt-2 font-normal">
              Сезонная витрина цветов
            </h2>
          </div>
          <p className="text-sm text-botanika-muted max-w-sm font-normal">
            Каждый букет собирается индивидуально в день заказа. Доступны размеры S, M и L с динамическим расчетом стоимости.
          </p>
        </div>

        {/* Filter Bar & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-8 mb-10 border-b border-botanika-border">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const count = cat.key === 'all' 
                ? products.length 
                : products.filter(p => p.category === cat.key).length;
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all whitespace-nowrap flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-botanika-olive ${
                    isActive
                      ? 'bg-botanika-olive text-white shadow-sm'
                      : 'bg-botanika-card/70 hover:bg-botanika-card text-botanika-muted hover:text-botanika-text border border-botanika-border/60'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-botanika-border/60 text-botanika-subtle'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <SlidersHorizontal className="w-4 h-4 text-botanika-subtle" />
            <label htmlFor="sort-select" className="text-xs text-botanika-muted sr-only">
              Сортировка
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-botanika-card/80 border border-botanika-border text-xs text-botanika-text font-medium rounded-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-botanika-olive cursor-pointer"
            >
              <option value="featured">По умолчанию</option>
              <option value="price-asc">Сначала доступные (по возрастанию)</option>
              <option value="price-desc">Сначала премиальные (по убыванию)</option>
            </select>
          </div>

        </div>

        {/* Catalog Grid: 8 Bouquets */}
        {filteredProducts.length === 0 ? (
          /* Empty State (Craftsmanship Rule) */
          <div className="text-center py-20 bg-botanika-card/40 rounded-sm border border-botanika-border">
            <p className="editorial-heading text-2xl text-botanika-text mb-2">
              В этой категории сейчас нет букетов
            </p>
            <p className="text-sm text-botanika-muted mb-6">
              Попробуйте выбрать другой раздел витрины или сбросьте фильтры.
            </p>
            <button
              onClick={() => setActiveCategory('all')}
              className="px-6 py-2.5 bg-botanika-olive text-white text-xs uppercase tracking-wider rounded-sm font-semibold hover:bg-botanika-oliveDeep transition-colors"
            >
              Смотреть все букеты
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {filteredProducts.map((product) => {
              const isJustAdded = addedItemKey === product.id;

              return (
                <article
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Image with subtle zoom & tag */}
                    <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-botanika-card border border-botanika-border mb-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover object-center filter saturate-[0.93] transition-transform duration-500 ease-out group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Badge if present */}
                      {product.badge && (
                        <div className="absolute top-3 left-3 bg-botanika-bg/95 backdrop-blur-sm px-2.5 py-1 rounded-sm text-[10px] font-semibold tracking-wider uppercase text-botanika-olive border border-botanika-border/60">
                          {product.badge}
                        </div>
                      )}

                      {/* Hover action overlay button */}
                      <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(e, product)}
                          className={`w-full py-2.5 px-3 text-xs font-semibold tracking-wider uppercase rounded-sm flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                            isJustAdded
                              ? 'bg-botanika-olive text-white'
                              : 'bg-white/95 text-botanika-text hover:bg-white border border-botanika-border'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Добавлено (M)</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5 text-botanika-olive" />
                              <span>Быстро в корзину (размер M)</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-[11px] text-botanika-subtle uppercase tracking-wider mb-1">
                      <span>{product.categoryLabel}</span>
                      <span>S • M • L</span>
                    </div>

                    {/* Title */}
                    <h3 className="editorial-heading text-xl text-botanika-text font-normal group-hover:text-botanika-olive transition-colors flex items-center justify-between">
                      <span>{product.title}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-botanika-olive" />
                    </h3>

                    {/* Key composition summary */}
                    <p className="text-xs text-botanika-muted line-clamp-2 mt-1.5 mb-3 leading-relaxed">
                      {product.composition.slice(0, 3).join(', ')}
                    </p>
                  </div>

                  {/* Price & Choose size link */}
                  <div className="pt-3 border-t border-botanika-border/80 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-botanika-subtle block font-normal">от</span>
                      <span className="text-base font-semibold text-botanika-text tracking-tight">
                        {product.basePrice.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="text-xs font-medium text-botanika-olive group-hover:underline underline-offset-4 decoration-botanika-olive/40"
                    >
                      Выбрать размер →
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
