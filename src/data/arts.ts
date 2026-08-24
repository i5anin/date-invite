/** Иллюстрации собраны из эмодзи и градиентов — внешних файлов нет. */
export interface Art {
  id: string
  emoji: string
  gradient: string
}

export const arts: Art[] = [
  { id: 'moon', emoji: '🌙', gradient: 'linear-gradient(150deg,#3a2a4d,#7a4a6a)' },
  { id: 'cup', emoji: '☕', gradient: 'linear-gradient(150deg,#d9a86c,#a9603f)' },
  { id: 'bloom', emoji: '🌷', gradient: 'linear-gradient(150deg,#e6a2a2,#b0567a)' },
  { id: 'spark', emoji: '✨', gradient: 'linear-gradient(150deg,#f0c987,#c96a6a)' },
  { id: 'cat', emoji: '🐈', gradient: 'linear-gradient(150deg,#b9a3c9,#6b4a7a)' },
  { id: 'wave', emoji: '🌊', gradient: 'linear-gradient(150deg,#8fb8c9,#3f6a7a)' },
]

export function artById(id: string): Art {
  return arts.find((art) => art.id === id) ?? arts[0]
}
