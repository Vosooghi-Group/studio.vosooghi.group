import { Role } from "@prisma/client";

export interface BlogType {
  title: string;
  slug: { current: string };
  publishedAt: string;
  author: any;
  excerpt: string;
  image: any;
  body: any;
  _id: string;
}

export interface User {
  id: string;
  name?: string | null;
  email: string;
  password?: string | null;
  role: Role;
  image?: string | null;
  emailVerified?: Date | null;
  accounts: Account[];
  resumes: Resume[];
  Notification: Notification[];
}

export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
}

export interface Resume {
  id: string;
  userId: string;
  jobId: string;
  age: number;
  gender: string;
  showcases: string[];
  user: User;
  job: Job;
}

export interface Job {
  id: string;
  title: string;
  description: string;
}

export interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: Date;
  userId: string;
  user: User;
}


export interface ShowcaseType {
  _id: string;
  title: string;
  description: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  images: { asset: { _ref: string }; alt: string }[];
  features: { name: string; icon: string }[];
  englishName: string;
  categories: string[];
  instagram?: string;
  website?: string;
}