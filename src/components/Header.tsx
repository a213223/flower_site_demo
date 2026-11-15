import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigateAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onNavigateAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-botanika-card border-b border-botanika-border text-botanika-muted text-xs tracking-wider py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-botanika-olive animate-pulse"></span>
            <span className="font-medium text-botanika-text">Москва, ул. Малая Бронная, 18</span>
            <span className="hidden sm:inline text-botanika-subtle">• 09:00 — 22:00</span>
          </div>
          <div className="flex items-center gap-4 text-botanika-subtle">
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-botanika-olive" />
              Доставка от 90 минут
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-botanika-olive" />
              Фото перед отправкой
            </span>
            <a
              href="tel:+74958221904"
              className="text-botanika-text hover:text-botanika-olive transition-colors font-medium ml-2"
            >
              +7 (495) 822-19-04
            </a>
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header className="sticky top-0 z-40 bg-botanika-bg/95 backdrop-blur-md border-b border-botanika-border transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Mobile hamburger button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-botanika-text hover:text-botanika-olive transition-colors rounded-lg focus-visible:ring-2 focus-visible:ring-botanika-olive"
              aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Nav links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-botanika-muted">
            <button
              onClick={() => scrollTo('catalog')}
              className="hover:text-botanika-text transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-botanika-olive hover:after:w-full after:transition-all"
            >
              Каталог букетов
            </button>
            <button
              onClick={() => scrollTo('budget')}
              className="hover:text-botanika-text transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-botanika-olive hover:after:w-full after:transition-all"
            >
              Сборка по бюджету
            </button>
            <button
              onClick={() => scrollTo('delivery')}
              className="hover:text-botanika-text transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-botanika-olive hover:after:w-full after:transition-all"
            >
              Доставка и забота
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="hover:text-botanika-text transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-botanika-olive hover:after:w-full after:transition-all"
            >
              О студии
            </button>
          </nav>

          {/* Brand Logo (Center on desktop) */}
          <div className="text-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group inline-flex flex-col items-center"
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.22em] text-botanika-text font-semibold uppercase group-hover:text-botanika-olive transition-colors">
                БОТАНИКА
              </span>
              <span className="text-[10px] tracking-[0.25em] text-botanika-subtle uppercase -mt-0.5">
                авторская флористика • москва
              </span>
            </a>
          </div>

          {/* Right actions: Cart */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-botanika-border hover:border-botanika-olive bg-botanika-card/60 hover:bg-botanika-card text-botanika-text transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-botanika-olive"
              aria-label={`Корзина, ${cartCount} товаров`}
            >
              <ShoppingBag className="w-4 h-4 text-botanika-olive" />
              <span className="text-xs font-semibold tracking-wider uppercase hidden sm:inline">
                Корзина
              </span>
              {cartCount > 0 ? (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-botanika-terracotta rounded-full -mr-1">
                  {cartCount}
                </span>
              ) : (
                <span className="text-xs text-botanika-subtle font-normal">0</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-botanika-border bg-botanika-bg px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-3 text-base font-medium text-botanika-text">
              <button
                onClick={() => scrollTo('catalog')}
                className="flex items-center justify-between py-2 text-left border-b border-botanika-border/60"
              >
                <span>Каталог букетов</span>
                <ArrowRight className="w-4 h-4 text-botanika-subtle" />
              </button>
              <button
                onClick={() => scrollTo('budget')}
                className="flex items-center justify-between py-2 text-left border-b border-botanika-border/60"
              >
                <span>Сборка по бюджету</span>
                <ArrowRight className="w-4 h-4 text-botanika-subtle" />
              </button>
              <button
                onClick={() => scrollTo('delivery')}
                className="flex items-center justify-between py-2 text-left border-b border-botanika-border/60"
              >
                <span>Доставка и оплата</span>
                <ArrowRight className="w-4 h-4 text-botanika-subtle" />
              </button>
              <button
                onClick={() => scrollTo('about')}
                className="flex items-center justify-between py-2 text-left border-b border-botanika-border/60"
              >
                <span>О студии на Малой Бронной</span>
                <ArrowRight className="w-4 h-4 text-botanika-subtle" />
              </button>
            </nav>

            <div className="pt-4 border-t border-botanika-border flex flex-col gap-2 text-xs text-botanika-muted">
              <div>Москва, ул. Малая Бронная, 18</div>
              <div>Ежедневно с 09:00 до 22:00</div>
              <a href="tel:+74958221904" className="text-botanika-olive font-semibold text-sm pt-1">
                +7 (495) 822-19-04
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateAdmin();
                }}
                className="text-xs text-botanika-subtle hover:text-botanika-text underline decoration-botanika-border"
              >
                Вход для флориста
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
