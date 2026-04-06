/**
 * @file utils.ts
 * @description Utility functions for HaiEduTech Platform.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 * @license Private / Proprietary - No unauthorized copying or distribution.
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import DOMPurify from "dompurify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sanitize HTML string to prevent XSS attacks.
 * Returns an object suitable for React's dangerouslySetInnerHTML.
 */
export function sanitizeHtml(html: string): { __html: string } {
  return { __html: DOMPurify.sanitize(html) };
}

/**
 * Bold-highlight markdown **text** and sanitize for safe HTML rendering.
 */
export function boldAndSanitize(text: string): { __html: string } {
  const bolded = text.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-primary">$1</span>');
  return sanitizeHtml(bolded);
}
