import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'bot-patrimony',
    title: 'Утро на Патриарших',
    category: 'author',
    categoryLabel: 'Авторский букет',
    description: 'Ароматный воздушный букет в холодно-сливочной гамме с нотами мадагаскарской ванили от роз О’Хара. Отражает неспешный ритм утренних переулков Патриарших прудов.',
    composition: [
      'Французские розы White O’Hara (ароматные)',
      'Маттиола лавандовая',
      'Эвкалипт цинерея',
      'Озотамнус австралийский',
      'Сортовая винтажная гвоздика'
    ],
    careTips: 'Подрежьте стебли под углом 45° острым ножом и поставьте в холодную воду со смесью Chrysal. Меняйте воду раз в два дня.',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=900&q=80',
    basePrice: 4800,
    badge: 'Выбор шеф-флориста',
    sizes: {
      S: { size: 'S', label: 'Компактный S', diameter: '24–27 см', stemCount: '15 стеблей', price: 4800 },
      M: { size: 'M', label: 'Классический M', diameter: '34–38 см', stemCount: '25 стеблей', price: 6900 },
      L: { size: 'L', label: 'Парадный L', diameter: '44–48 см', stemCount: '37 стеблей', price: 9800 }
    }
  },
  {
    id: 'bot-north-whisper',
    title: 'Шёпот Севера',
    category: 'mono',
    categoryLabel: 'Монобукет',
    description: 'Сдержанная северная чистота. Фарфоровые лепестки итальянских ранункулюсов раскрываются медленно, сохраняя идеальную форму до двух недель.',
    composition: [
      'Итальянские ранункулюсы сорта Клуни',
      'Ветви фисташки писташ',
      'Плотная крафтовая бумага шёлкового плетения'
    ],
    careTips: 'Любит прохладу и немного воды в вазе (не более 5 см). Беречь от прямых солнечных лучей и батарей.',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=80',
    basePrice: 5200,
    badge: 'Стойкость 14 дней',
    sizes: {
      S: { size: 'S', label: 'Компактный S', diameter: '22–25 см', stemCount: '11 ранункулюсов', price: 5200 },
      M: { size: 'M', label: 'Классический M', diameter: '32–35 см', stemCount: '19 ранункулюсов', price: 7800 },
      L: { size: 'L', label: 'Парадный L', diameter: '42–46 см', stemCount: '29 ранункулюсов', price: 11200 }
    }
  },
  {
    id: 'bot-olive-grove',
    title: 'Оливковая роща',
    category: 'author',
    categoryLabel: 'Авторский букет',
    description: 'Средиземноморское настроение с серебристо-зеленой листвой и персиковыми бутонами роз Джульетта. Натуральная природная фактура без лишней декоративности.',
    composition: [
      'Пионовидные розы David Austin Juliet',
      'Свежие ветви тосканской оливы',
      'Белая махровая скабиоза',
      'Вероника сизая',
      'Леукодендрон'
    ],
    careTips: 'Ежедневно опрыскивайте зелень оливы прохладной водой, держите вдали от фруктовой вазы.',
    image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=900&q=80',
    basePrice: 4500,
    sizes: {
      S: { size: 'S', label: 'Компактный S', diameter: '25–28 см', stemCount: '17 стеблей', price: 4500 },
      M: { size: 'M', label: 'Классический M', diameter: '35–38 см', stemCount: '27 стеблей', price: 6400 },
      L: { size: 'L', label: 'Парадный L', diameter: '45–50 см', stemCount: '39 стеблей', price: 8900 }
    }
  },
  {
    id: 'bot-flemish-still',
    title: 'Фламандский натюрморт',
    category: 'author',
    categoryLabel: 'Авторский букет',
    description: 'Глубокая драматичная палитра, вдохновленная полотнами голландских и фламандских мастеров XVII века. Для тех, кто ценит силу характера и контраст.',
    composition: [
      'Темно-бордовые каллы Шварцвальдер',
      'Махровые пионовидные тюльпаны Блэк Хиро',
      'Гвоздика винтажного винного оттенка',
      'Ягоды гиперикума',
      'Эвкалипт пополо'
    ],
    careTips: 'Каллы требуют чистой прохладной воды и минимального подрезания стебля (прямой срез).',
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=900&q=80',
    basePrice: 5600,
    badge: 'Редкая срезка',
    sizes: {
      S: { size: 'S', label: 'Компактный S', diameter: '25–28 см', stemCount: '15 стеблей', price: 5600 },
      M: { size: 'M', label: 'Классический M', diameter: '36–40 см', stemCount: '25 стеблей', price: 7900 },
      L: { size: 'L', label: 'Парадный L', diameter: '48–52 см', stemCount: '37 стеблей', price: 11500 }
    }
  },
  {
    id: 'bot-provence-herbs',
    title: 'Прованские травы',
    category: 'dried',
    categoryLabel: 'Сухоцветы',
    description: 'Стойкий букет из натуральных сухоцветов, не требующий воды. Наполняет интерьер тонким природным ароматом лавандового масла на долгие месяцы.',
    composition: [
      'Французская горная лаванда с плато Валенсоль',
      'Молочный лагурус («зайцехвост»)',
      'Коробочки хлопка',
      'Гелихризум бессмертник',
      'Сизый фаларис'
    ],
    careTips: 'Вода категорически не нужна. Достаточно раз в месяц сдувать пыль холодным феном на минимальной скорости.',
    image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=900&q=80',
    basePrice: 3200,
    sizes: {
      S: { size: 'S', label: 'Компактный S', diameter: '20–22 см', stemCount: 'Более 35 трав', price: 3200 },
      M: { size: 'M', label: 'Классический M', diameter: '28–32 см', stemCount: 'Более 60 трав', price: 4500 },
      L: { size: 'L', label: 'Парадный L', diameter: '38–42 см', stemCount: 'Более 90 трав', price: 6200 }
    }
  },
  {
    id: 'bot-pure-cotton',
    title: 'Чистый хлопок',
    category: 'dried',
    categoryLabel: 'Сухоцветы',
    description: 'Мягкая природная архитектура для интерьеров в стиле сканди или джапанди. Радует глаз более двух лет без увядания и потери формы.',
    composition: [
      'Натуральные коробочки белого хлопка',
      'Пампасная трава кортадерия',
      'Стабилизированный эвкалипт беби-блю',
      'Колоски полевого льна'
    ],
    careTips: 'Не требует ухода и полива. Не ставьте во влажные помещения.',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=900&q=80',
    basePrice: 3600,
    sizes: {
      S: { size: 'S', label: 'Компактный S', diameter: '22–25 см', stemCount: 'Композиция S', price: 3600 },
      M: { size: 'M', label: 'Классический M', diameter: '32–36 см', stemCount: 'Композиция M', price: 4900 },
      L: { size: 'L', label: 'Парадный L', diameter: '42–46 см', stemCount: 'Композиция L', price: 6800 }
    }
  },
  {
    id: 'bot-peach-mousse',
    title: 'Персиковый мусс',
    category: 'mono',
    categoryLabel: 'Монобукет',
    description: 'Бескомпромиссная нежность с богатым сливочно-персиковым ароматом. Каждый бутон раскрывается в пышную многолепестковую чашу английской розы.',
    composition: [
      'Садовые парковые розы David Austin',
      'Шелковые ленты оттенка терракота',
      'Крафтовая транспортировочная коробка'
    ],
    careTips: 'Розы пьют много воды. Наполняйте вазу наполовину и подрезайте стебли каждые 24–48 часов.',
    image: 'https://images.unsplash.com/photo-1589244159943-460088ed5c92?auto=format&fit=crop&w=900&q=80',
    basePrice: 6100,
    badge: 'Английские розы',
    sizes: {
      S: { size: 'S', label: 'Компактный S', diameter: '24–27 см', stemCount: '9 роз Остина', price: 6100 },
      M: { size: 'M', label: 'Классический M', diameter: '34–37 см', stemCount: '15 роз Остина', price: 8700 },
      L: { size: 'L', label: 'Парадный L', diameter: '44–48 см', stemCount: '21 роза Остина', price: 11400 }
    }
  },
  {
    id: 'bot-meadow-fresh',
    title: 'Луговая свежесть',
    category: 'mono',
    categoryLabel: 'Монобукет',
    description: 'Ощущение свежесрезанных утренних цветов с подмосковных садов. Нежные лепестки кремовой эустомы напоминают японский шёлк.',
    composition: [
      'Махровая эустома (лизиантус) оттенка крем-брюле',
      'Веточки белого лимониума',
      'Декоративные зонтичные травы'
    ],
    careTips: 'Один из самых стойких цветков: радует свежестью от 12 до 16 дней при регулярной смене воды.',
    image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=900&q=80',
    basePrice: 3900,
    sizes: {
      S: { size: 'S', label: 'Компактный S', diameter: '25–28 см', stemCount: '9 ветвей эустомы', price: 3900 },
      M: { size: 'M', label: 'Классический M', diameter: '35–38 см', stemCount: '15 ветвей эустомы', price: 5400 },
      L: { size: 'L', label: 'Парадный L', diameter: '45–48 см', stemCount: '23 ветви эустомы', price: 7600 }
    }
  }
];
