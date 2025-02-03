import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

<<<<<<< HEAD
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
=======
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
>>>>>>> temp
