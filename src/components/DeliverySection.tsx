import React from 'react';
import { Truck, Clock, MapPin, PackageCheck, ShieldAlert, Award } from 'lucide-react';

export const DeliverySection: React.FC = () => {
  return (
    <section id="delivery" className="py-16 sm:py-24 bg-botanika-bg border-b border-botanika-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-botanika-olive">
              Сервис и логистика
            </span>
            <h2 className="editorial-heading text-3xl sm:text-4xl lg:text-5xl text-botanika-text mt-2 font-normal">
              Бережная доставка по Москве
            </h2>
          </div>
          <p className="text-sm text-botanika-muted max-w-md font-normal leading-relaxed">
            Мы доставляем цветы исключительно на автомобилях с климат-контролем, чтобы букеты не страдали от перепадов температуры и ветра.
          </p>
        </div>

        {/* 3 Column Grid: Zones & Tariffs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: MKAD */}
          <div className="p-8 bg-botanika-card/50 border border-botanika-border rounded-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Truck className="w-5 h-5 text-botanika-olive" />
                <span className="text-[11px] font-mono uppercase text-botanika-olive font-semibold bg-botanika-bg px-2.5 py-1 rounded-sm border border-botanika-border/60">
                  Популярный выбор
                </span>
              </div>
              <h3 className="editorial-heading text-2xl text-botanika-text font-normal mb-2">
                В пределах МКАД
              </h3>
              <p className="text-xs sm:text-sm text-botanika-muted mb-6 leading-relaxed">
                Доставка ко времени или интервал 2 часа. При заказе от 7 000 ₽ доставляем полностью за наш счет.
              </p>
            </div>
            <div className="pt-4 border-t border-botanika-border flex items-baseline justify-between">
              <span className="text-xs text-botanika-subtle">Стоимость:</span>
              <span className="font-serif text-xl font-semibold text-botanika-text">
                490 ₽ <span className="text-xs font-normal text-botanika-olive font-sans">/ 0 ₽ от 7 тыс.</span>
              </span>
            </div>
          </div>

          {/* Card 2: Express 90 min */}
          <div className="p-8 bg-botanika-card/50 border border-botanika-border rounded-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-5 h-5 text-botanika-olive" />
                <span className="text-[11px] font-mono uppercase text-botanika-terracotta font-semibold bg-botanika-bg px-2.5 py-1 rounded-sm border border-botanika-border/60">
                  Срочно
                </span>
              </div>
              <h3 className="editorial-heading text-2xl text-botanika-text font-normal mb-2">
                Экспресс за 90 минут
              </h3>
              <p className="text-xs sm:text-sm text-botanika-muted mb-6 leading-relaxed">
                Букет собирается вне очереди и сразу передается выделенному курьеру. Идеально для внезапных поводов.
              </p>
            </div>
            <div className="pt-4 border-t border-botanika-border flex items-baseline justify-between">
              <span className="text-xs text-botanika-subtle">Время:</span>
              <span className="font-serif text-xl font-semibold text-botanika-text">
                от 90 минут
              </span>
            </div>
          </div>

          {/* Card 3: Self-pickup */}
          <div className="p-8 bg-botanika-card/50 border border-botanika-border rounded-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <MapPin className="w-5 h-5 text-botanika-olive" />
                <span className="text-[11px] font-mono uppercase text-botanika-olive font-semibold bg-botanika-bg px-2.5 py-1 rounded-sm border border-botanika-border/60">
                  Скидка 10%
                </span>
              </div>
              <h3 className="editorial-heading text-2xl text-botanika-text font-normal mb-2">
                Самовывоз из студии
              </h3>
              <p className="text-xs sm:text-sm text-botanika-muted mb-6 leading-relaxed">
                Москва, ул. Малая Бронная, 18. Приезжайте в гости за кофе и готовым упакованным заказом.
              </p>
            </div>
            <div className="pt-4 border-t border-botanika-border flex items-baseline justify-between">
              <span className="text-xs text-botanika-subtle">Выгода:</span>
              <span className="font-serif text-xl font-semibold text-botanika-olive">
                -10% на букет
              </span>
            </div>
          </div>

        </div>

        {/* What's in the Box / Packaging Standards */}
        <div className="bg-botanika-card/30 border border-botanika-border rounded-sm p-8 sm:p-10">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-botanika-olive">
              Стандарты заботы
            </span>
            <h3 className="editorial-heading text-2xl sm:text-3xl text-botanika-text mt-1 mb-6 font-normal">
              Что входит в абсолютно каждый заказ:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-botanika-muted">
              <div className="flex items-start gap-3">
                <PackageCheck className="w-4 h-4 text-botanika-olive mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Аквапак с чистой водой</strong> — цветы не завянут в пути и могут стоять до 6–8 часов без вазы.
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-4 h-4 text-botanika-olive mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Подкормка Chrysal</strong> — продлевает жизнь срезанных цветов в вазе до двух раз.
                </span>
              </div>

              <div className="flex items-start gap-3">
                <ShieldAlert className="w-4 h-4 text-botanika-olive mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Крафтовый трапециевидный кофр</strong> с ручками для удобной и безопасной транспортировки.
                </span>
              </div>

              <div className="flex items-start gap-3">
                <PackageCheck className="w-4 h-4 text-botanika-olive mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Бесплатная открытка</strong> из хлопковой бумаги с вашим индивидуальным текстом.
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
