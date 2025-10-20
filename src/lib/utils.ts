
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string) {
  return text
    .toString()
    .normalize('NFD') // Normalizácia na odstránenie diakritiky
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Nahradenie medzier pomlčkami
    .replace(/[^\w-]+/g, '') // Odstránenie všetkých ne-slovných znakov
    .replace(/--+/g, '-'); // Nahradenie viacnásobných pomlčiek jednou
}
