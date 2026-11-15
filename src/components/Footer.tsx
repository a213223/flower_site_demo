import React from 'react';
import { Lock, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigateAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-botanika-card/60 border-t border-botanika-border pt-16 pb-12 text-botanika-muted text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-botanika-border">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <span className="font-serif text-2xl tracking-[0.2em] text-botanika-text uppercase font-semibold block">
              БОТАНИКА
            </span>
            <p className="text-botanika-subtle leading-relaxed">
              Локальная авторская флористическая студия на Патриарших прудах. Москва, 2026.
            </p>
            <div className="pt-2 text-[11px] text-botanika-subtle">
              ИНН 7703891240 • ОГРНИП 319774600214
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-botanika-text block">
              Навигация
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollTo('catalog')}
                  className="hover:text-botanika-text transition-colors"
                >
                  Каталог букетов
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('budget')}
                  className="hover:text-botanika-text transition-colors"
                >
                  Сборка по бюджету
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('delivery')}
                  className="hover:text-botanika-text transition-colors"
                >
                  Условия доставки
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-botanika-text transition-colors"
                >
                  Философия мастерской
                </button>
              </li>
            </ul>
          </div>

          {/* Address & Hours */}
          <div className="space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-botanika-text block">
              Студия в Москве
            </span>
            <p className="leading-relaxed">
              ул. Малая Бронная, 18 <br />
              м. Маяковская / Тверская
            </p>
            <p className="text-botanika-subtle">
              Ежедневно с 09:00 до 22:00 <br />
              Прием онлайн-заказов круглосуточно
            </p>
          </div>

          {/* Direct Contact */}
          <div className="space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-botanika-text block">
              Связь с флористом
            </span>
            <p>
              <a
                href="tel:+74958221904"
                className="text-botanika-text font-semibold hover:text-botanika-olive transition-colors text-sm"
              >
                +7 (495) 822-19-04
              </a>
            </p>
            <p className="text-botanika-subtle">
              WhatsApp & Telegram: <br />
              <a
                href="https://t.me/"
                target="_blank"
                rel="noreferrer"
                className="text-botanika-olive hover:underline"
              >
                @botanika_patrik
              </a>
            </p>
            <div className="pt-1">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-[11px] text-botanika-muted hover:text-botanika-text transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Наверх</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Staff Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-botanika-subtle">
          <div>
            © 2026 Студия «БОТАНИКА». Все права защищены.
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden sm:inline">Эстетика Kinfolk & Aesop</span>
            <button
              type="button"
              onClick={onNavigateAdmin}
              className="inline-flex items-center gap-1.5 text-botanika-subtle hover:text-botanika-text transition-colors underline decoration-botanika-border underline-offset-4"
            >
              <Lock className="w-3 h-3" />
              <span>Вход для флориста</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
