import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const priceFormatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

export const formatPrice = (price: number | null | undefined): string => {
  if (!price) return '$0';
  const priceInDollars = price / 100;
  return priceFormatter.format(priceInDollars);
};
