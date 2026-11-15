import React from 'react';
import { ArrowDownRight, Camera, Sparkles, Clock } from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenBudget: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onOpenBudget }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-botanika-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asymmetrical Editorial Grid: 60% Image / 40% Content on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* 60% Column: Atmospheric Bouquet Photo */}
          <div className="lg:col-span-7 order-2 lg:order-1 relative">
            <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/3] rounded-sm overflow-hidden bg-botanika-card border border-botanika-border group">
              <img
                src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1400&q=85"
                alt="Авторский букет цветочной студии БОТАНИКА в Москве"
                className="w-full h-full object-cover object-center filter saturate-[0.92] contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-105"
                loading="eager"
              />
              
              {/* Subtle aesthetic watermark/tag */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-botanika-bg/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-botanika-border/80 text-[11px] font-medium tracking-wider uppercase text-botanika-muted">
                Сезонная коллекция • Весна 2026
              </div>

              {/* Bottom photo caption */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 text-white flex items-end justify-between">
                <div>
                  <p className="font-serif text-lg tracking-wide text-white/95 italic">
                    «Утренняя срезка садовых пионов и ветви эвкалипта»
                  </p>
                  <p className="text-xs text-white/75 font-sans mt-0.5">
                    Собрано вручную на Малой Бронной
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-white/90 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Фотоконтроль</span>
                </div>
              </div>
            </div>

            {/* Decorative minimalist caption below image */}
            <div className="mt-3 flex items-center justify-between text-xs text-botanika-subtle px-1">
              <span>Студия на Патриарших прудах</span>
              <span className="font-mono text-[11px]">55.7621° N, 37.5938° E</span>
            </div>
          </div>

          {/* 40% Column: Typography & Offer */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-center">
            
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-6 bg-botanika-olive"></span>
              <span className="text-xs font-semibold uppercase tracking-widest text-botanika-olive">
                Авторская флористика • Москва
              </span>
            </div>

            {/* Serif Heading */}
            <h1 className="editorial-heading text-4xl sm:text-5xl xl:text-6xl text-botanika-text font-normal leading-[1.08] mb-6">
              Цветы с чистой <br />
              <span className="italic font-light">эстетикой</span> и тихим характером.
            </h1>

            {/* Honest human copy without corporate clichés */}
            <p className="text-base sm:text-lg text-botanika-muted leading-relaxed mb-8 max-w-xl font-normal">
              Мы не упаковываем цветы в метры целлофана и не продаем крашеные розы. 
              Только честная сезонная срезка, садовые формы и дикие фактуры. 
              Доставляем по Москве за <strong className="text-botanika-text font-semibold">90 минут</strong> в аквапаках с водой и присылаем вам фото букета перед выездом курьера.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <button
                type="button"
                onClick={onExploreCatalog}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-botanika-olive hover:bg-botanika-oliveDeep text-white text-sm font-semibold tracking-wider uppercase rounded-sm transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-botanika-olive focus-visible:ring-offset-2"
              >
                <span>Выбрать букет</span>
                <ArrowDownRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenBudget}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent hover:bg-botanika-card border border-botanika-border hover:border-botanika-olive text-botanika-text text-sm font-medium tracking-wide rounded-sm transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-botanika-olive"
              >
                <span>Сборка по бюджету</span>
              </button>
            </div>

            {/* Editorial Feature Strip */}
            <div className="pt-6 border-t border-botanika-border grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-botanika-olive">
                  <Clock className="w-4 h-4 stroke-[1.75]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-botanika-text">90 минут</span>
                </div>
                <p className="text-xs text-botanika-muted leading-snug">
                  Экспресс-доставка по Москве на авто
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-botanika-olive">
                  <Camera className="w-4 h-4 stroke-[1.75]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-botanika-text">Фотоконтроль</span>
                </div>
                <p className="text-xs text-botanika-muted leading-snug">
                  Снимок готового букета в Telegram/WhatsApp
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-botanika-olive">
                  <Sparkles className="w-4 h-4 stroke-[1.75]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-botanika-text">от 7 дней</span>
                </div>
                <p className="text-xs text-botanika-muted leading-snug">
                  Стойкость и кризал в каждом заказе
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
