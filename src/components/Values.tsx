import React from 'react';
import { Droplet, Sun, CheckCircle2, HeartHandshake } from 'lucide-react';

export const Values: React.FC = () => {
  const principles = [
    {
      num: '01',
      title: 'Утренний аукцион',
      icon: Sun,
      description: 'Каждое утро в 07:00 мы принимаем свежие поставки напрямую с нидерландских аукционов и локальных подмосковных оранжерей. Цветы не стоят на складах неделями.'
    },
    {
      num: '02',
      title: 'Честный состав',
      icon: CheckCircle2,
      description: 'Никаких химических красителей, блесток или пластикового декора. Только природная фактура живых лепестков, диких трав, веток оливы и благородного льна.'
    },
    {
      num: '03',
      title: 'Аквапак и забота',
      icon: Droplet,
      description: 'Все букеты доставляются во временных вазах с питательным раствором (аквапаках). К каждому заказу прилагаем порционный кризал и памятку по стойкости.'
    },
    {
      num: '04',
      title: 'Фото перед вручением',
      icon: HeartHandshake,
      description: 'Флорист фотографирует собранный букет при естественном дневном свете и отправляет вам в удобный мессенджер до передачи курьеру.'
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-botanika-bg border-b border-botanika-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-botanika-olive">
              Философия студии
            </span>
            <h2 className="editorial-heading text-3xl sm:text-4xl text-botanika-text mt-2 font-normal">
              Четыре правила нашей мастерской
            </h2>
          </div>
          <p className="text-sm text-botanika-muted max-w-md font-normal leading-relaxed">
            Мы открыли «БОТАНИКУ» на Малой Бронной как противоядие однотипным киоскам. Здесь каждый стебель подбирается с вниманием к форме, запаху и времени цветения.
          </p>
        </div>

        {/* 4-Column Grid with Hairline Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-botanika-border">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.num}
                className="p-8 border-r border-b border-botanika-border bg-botanika-card/30 hover:bg-botanika-card/70 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-botanika-subtle font-medium">
                      {p.num}
                    </span>
                    <Icon className="w-5 h-5 text-botanika-olive stroke-[1.5]" />
                  </div>
                  <h3 className="editorial-heading text-xl text-botanika-text font-normal mb-3">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-botanika-muted leading-relaxed font-normal">
                    {p.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
