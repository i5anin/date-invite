export interface CatalogItem {
  id: string
  label: string
  emoji: string
}

export interface CatalogGroup {
  id: string
  label: string
  emoji: string
  items: CatalogItem[]
}

export const catalog: CatalogGroup[] = [
  {
    id: 'food',
    label: 'Еда',
    emoji: '🍽',
    items: [
      { id: 'sushi', label: 'Суши', emoji: '🍣' },
      { id: 'pizza', label: 'Пицца', emoji: '🍕' },
      { id: 'burger', label: 'Бургеры', emoji: '🍔' },
      { id: 'ramen', label: 'Рамен', emoji: '🍜' },
      { id: 'grill', label: 'Шашлык', emoji: '🍖' },
      { id: 'dessert', label: 'Десерты', emoji: '🍰' },
    ],
  },
  {
    id: 'city',
    label: 'Город',
    emoji: '🏙',
    items: [
      { id: 'cinema', label: 'Кино', emoji: '🎬' },
      { id: 'museum', label: 'Музей', emoji: '🏛' },
      { id: 'concert', label: 'Концерт', emoji: '🎸' },
      { id: 'karaoke', label: 'Караоке', emoji: '🎤' },
      { id: 'quest', label: 'Квест', emoji: '🗝' },
      { id: 'market', label: 'Рынок', emoji: '🧺' },
    ],
  },
  {
    id: 'outdoor',
    label: 'На улице',
    emoji: '🌳',
    items: [
      { id: 'park', label: 'Прогулка в парке', emoji: '🌳' },
      { id: 'embankment', label: 'Набережная', emoji: '🌉' },
      { id: 'picnic', label: 'Пикник', emoji: '🧺' },
      { id: 'bike', label: 'Велосипеды', emoji: '🚲' },
      { id: 'sunset', label: 'Закат', emoji: '🌇' },
      { id: 'stars', label: 'Смотреть на звёзды', emoji: '🌌' },
    ],
  },
  {
    id: 'home',
    label: 'Дома',
    emoji: '🏠',
    items: [
      { id: 'series', label: 'Сериал под пледом', emoji: '🛋' },
      { id: 'cook', label: 'Готовить вместе', emoji: '🍳' },
      { id: 'boardgame', label: 'Настолки', emoji: '🎲' },
      { id: 'vinyl', label: 'Слушать музыку', emoji: '🎧' },
      { id: 'bake', label: 'Печь что-нибудь', emoji: '🧁' },
      { id: 'photos', label: 'Разбирать фото', emoji: '🖼' },
    ],
  },
  {
    id: 'active',
    label: 'Актив',
    emoji: '⚡',
    items: [
      { id: 'skate', label: 'Катаемся', emoji: '⛸' },
      { id: 'bowling', label: 'Боулинг', emoji: '🎳' },
      { id: 'climb', label: 'Скалодром', emoji: '🧗' },
      { id: 'pool', label: 'Бассейн', emoji: '🏊' },
      { id: 'tennis', label: 'Теннис', emoji: '🎾' },
      { id: 'dance', label: 'Танцы', emoji: '💃' },
    ],
  },
]

export const catalogIndex: Record<string, CatalogItem> = Object.fromEntries(
  catalog.flatMap((group) => group.items).map((item) => [item.id, item]),
)
