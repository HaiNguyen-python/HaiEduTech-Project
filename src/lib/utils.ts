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

/**
 * Sanitize free-text user input before persisting or forwarding to an LLM.
 * Trims whitespace, strips control characters (except newline/tab), and enforces
 * a length cap. Returns a plain string safe for storage; further HTML rendering
 * should still go through sanitizeHtml/DOMPurify.
 */
export function sanitizeText(input: unknown, maxLen = 5000): string {
  if (typeof input !== "string") return "";
  // Strip C0 control chars except \n (0x0A) and \t (0x09), and DEL (0x7F).
  // eslint-disable-next-line no-control-regex
  const stripped = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  return stripped.trim().slice(0, maxLen);
}
