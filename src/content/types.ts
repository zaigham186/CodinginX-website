export type PublicationStatus = "draft" | "published" | "archived";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContentSection {
  title: string;
  paragraphs: string[];
  points?: string[];
}
