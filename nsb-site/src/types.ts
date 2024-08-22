import { Timestamp } from "firebase/firestore";

export interface Concert {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  date: Timestamp;
  time?: string;
  location: string;
  locationLink?: string;
  ticketLink?: string;
  description?: string;
  spotify?: string;
  youtube?: string;
  next?: boolean;
}
