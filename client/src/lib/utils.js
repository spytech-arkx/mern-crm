import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.DateTimeFormat('en-GB', {
  year: '2-digit',
  day: '2-digit',
  month: 'short',
  weekday: 'short',
});

export const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: "currency",
  currency: "USD",
})

export const parser = new DOMParser();