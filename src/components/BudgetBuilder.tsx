import React, { useState } from 'react';
import { Sparkles, Sliders, CheckCircle2 } from 'lucide-react';
import { Product, ProductSize } from '../types';

interface BudgetBuilderProps {
  onAddCustomBouquet: (product: Product, size: ProductSize, customPrice: number, customNote: string) => void;
}

export const BudgetBuilder: React.FC<BudgetBuilderProps> = ({ onAddCustomBouquet }) => {
  const [budget, setBudget] = useState<number>(6500);
  const [mood, setMood] = useState<string>('Нежная пастель');
  const [occasion, setOccasion] = useState<string>('День рождения');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const presets = [4000, 6500, 9000, 15000];
  const moods = [
    { id: 'Нежная пастель', label: 'Нежная пастель', desc: 'Сливочные, персиковые и белые тона' },
    { id: 'Оливковый сад', label: 'Оливковый сад', desc: 'Белые садовые цветы и много пряной зелени' },
    { id: 'Глубокий винный', label: 'Глубокий винный', desc: 'Бордовые каллы, темные розы, натюрморт' },
    { id: 'Дикое поле', label: 'Дикое поле', desc: 'Текстурные травы, эустома, садовые формы' },
  ];

  const occasions = ['День рождения', 'Признание в чувствах', 'Благодарность', 'В интерьер дома', 'Без повода'];

  const handleBuild = () => {
    // Generate custom bespoke product
    const customProduct: Product = {
      id: `bot-custom-${Date.now()}`,
      title: `Авторский букет по бюджету (${mood})`,
      category: 'author',
      categoryLabel: 'Индивидуальная сборка',
      description: `Букет собран шеф-флористом под ваш бюджет ${budget.toLocaleString('ru-RU')} ₽. Палитра: ${mood}. Повод: ${occasion}. Перед доставкой пришлем фото согласования в мессенджер.`,
      composition: [
        'Сезонная срезка утренней поставки',
        `Колористика: ${mood}`,
        'Аквапак с водой и фирменный крафтовый кофр',
        'Подкормка Chrysal и авторская открытка'
      ],
      careTips: 'Подрежьте стебли и поставьте в прохладную воду. Меняйте воду через день.',
      image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=900&q=80',
      basePrice: budget,
      badge: 'Индивидуальная сборка',
      sizes: {
        S: { size: 'S', label: 'S', diameter: '24–28 см', stemCount: 'По бюджету', price: budget },
        M: { size: 'M', label: 'M (Индивидуальный)', diameter: '35–40 см', stemCount: 'По бюджету', price: budget },
        L: { size: 'L', label: 'L', diameter: '45–50 см', stemCount: 'По бюджету', price: budget },
      }
    };

    onAddCustomBouquet(customProduct, 'M', budget, `Палитра: ${mood}, повод: ${occasion}`);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 2500);
  };

  return (
    <section id="budget" className="py-16 sm:py-24 bg-botanika-card/50 border-b border-botanika-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-botanika-olive">
              Персональный флорист
            </span>
            <h2 className="editorial-heading text-3xl sm:text-4xl lg:text-5xl text-botanika-text mt-2 mb-4 font-normal">
              Сборка букета под ваш бюджет
            </h2>
            <p className="text-sm text-botanika-muted max-w-xl mx-auto font-normal leading-relaxed">
              Не нашли идеальный букет в каталоге? Укажите комфортную сумму и настроение — наш шеф-флорист отберет лучшие цветы утренней поставки именно для вас.
            </p>
          </div>

          {/* Interactive Card */}
          <div className="bg-botanika-bg border border-botanika-border rounded-sm p-6 sm:p-10 shadow-subtle space-y-8">
            
            {/* Step 1: Budget Slider & Presets */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-botanika-text flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-botanika-olive" />
                  1. Сумма заказа:
                </span>
                <span className="font-serif text-3xl font-semibold text-botanika-olive">
                  {budget.toLocaleString('ru-RU')} ₽
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="3500"
                max="25000"
                step="500"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-1.5 bg-botanika-border rounded-lg appearance-none cursor-pointer accent-botanika-olive mb-4"
              />

              {/* Preset buttons */}
              <div className="flex flex-wrap gap-2">
                {presets.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setBudget(val)}
                    className={`px-3 py-1.5 text-xs rounded-sm border transition-all ${
                      budget === val
                        ? 'border-botanika-olive bg-botanika-olive text-white'
                        : 'border-botanika-border bg-botanika-card/40 text-botanika-muted hover:text-botanika-text'
                    }`}
                  >
                    {val.toLocaleString('ru-RU')} ₽
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Color Mood */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-botanika-text block mb-3">
                2. Цветовая гамма и настроение:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {moods.map((m) => {
                  const isSelected = mood === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMood(m.id)}
                      className={`p-3.5 text-left rounded-sm border transition-all ${
                        isSelected
                          ? 'border-botanika-olive bg-botanika-card/70 ring-1 ring-botanika-olive'
                          : 'border-botanika-border bg-botanika-bg hover:bg-botanika-card/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-botanika-text">{m.label}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-botanika-olive"></span>}
                      </div>
                      <p className="text-[11px] text-botanika-subtle leading-tight">{m.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Occasion */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-botanika-text block mb-3">
                3. Повод или получатель:
              </span>
              <div className="flex flex-wrap gap-2">
                {occasions.map((occ) => {
                  const isSelected = occasion === occ;
                  return (
                    <button
                      key={occ}
                      type="button"
                      onClick={() => setOccasion(occ)}
                      className={`px-3 py-1.5 text-xs rounded-sm border transition-all ${
                        isSelected
                          ? 'border-botanika-olive bg-botanika-olive text-white'
                          : 'border-botanika-border bg-botanika-card/30 text-botanika-muted hover:text-botanika-text'
                      }`}
                    >
                      {occ}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-botanika-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-botanika-muted text-center sm:text-left">
                <span>Включено: аквапак, кризал, открытка и фотоконтроль</span>
              </div>

              <button
                type="button"
                onClick={handleBuild}
                disabled={isSuccess}
                className={`w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 ${
                  isSuccess
                    ? 'bg-botanika-olive text-white'
                    : 'bg-botanika-olive hover:bg-botanika-oliveDeep text-white shadow-sm'
                }`}
              >
                {isSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Добавлено в корзину!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Собрать за {budget.toLocaleString('ru-RU')} ₽</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
