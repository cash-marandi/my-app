export interface TeamMember {
  _id?: string; // MongoDB's default ID
  id?: string; // Frontend's ID (mapped from _id)
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface Event {
  _id?: string; // MongoDB's default ID
  id?: string; // Frontend's ID (mapped from _id)
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
}

export interface NewsPost {
  _id?: string; // MongoDB's default ID
  id?: string; // Frontend's ID (mapped from _id)
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
  category: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface User {
  username: string;
  role: 'admin';
  token?: string;
}