/**
 * Types and interfaces for the Hollow and Found app.
 */

export interface ShirtColor {
  id: string;
  name: string;
  bgClass: string; // Tailwind class for item circle
  textClass: string;
  previewColor: string; // Hex style color
  imageHueShift: string; // CSS Filter style
  caption: string;
}

export type ShirtSize = "S" | "M" | "L" | "XL" | "XXL";

export interface CartItem {
  id: string;
  colorId: string;
  colorName: string;
  size: ShirtSize;
  quantity: number;
  price: number;
}

export interface Initiative {
  id: string;
  title: string;
  tagline: string;
  iconName: "BookOpen" | "Users" | "Heart" | "Globe" | "Compass" | "Calendar";
  metric: string;
  metricLabel: string;
  badge: string;
  shortDesc: string;
  longDesc: string;
  actionLabel: string;
}

export interface PrayerRequest {
  id: string;
  name: string;
  date: string;
  verse?: string;
  text: string;
  prayersCount: number;
  hasPrayed?: boolean;
}

export interface GatheringEvent {
  id: string;
  title: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  city: string;
  state: string;
  participants: number;
  maxParticipants?: number;
  registered?: boolean;
  category: 'study' | 'fellowship' | 'service';
  desc: string;
}

export interface ScriptureResponse {
  verse: string;
  reference: string;
  reflection: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
}
