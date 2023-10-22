import { Timestamp } from "firebase/firestore";

export interface Response {
  items: Item[];
}

export interface Item {
  id: string;
  snippet: Snippet;
}

export interface Snippet {
  title: string;
  description: string;
}

export type VideoCreateDto = {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  email: string;
  userId: string;
  createdAt: Timestamp;
};
