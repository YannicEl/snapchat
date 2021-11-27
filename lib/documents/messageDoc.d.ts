import { BaseDoc } from "./baseDoc";

export interface MessageDoc extends BaseDoc {
  sender: {
    id: string;
    name: string
  }
  formats: {
    png: boolean;
    avif: boolean;
    webp: boolean;
  };
}