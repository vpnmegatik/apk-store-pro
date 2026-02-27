export type Role = "admin" | "publisher" | "user";
export type AppStatus = "pending" | "approved" | "rejected";

export interface AppRecord {
  id: string;
  name: string;
  slug: string;
  description: string;
  apk_url: string;
  icon_url: string;
  screenshots: string[];
  downloads: number;
  status: AppStatus;
  author_id: string;
  category_id?: string;
  version_name?: string;
  version_code?: number;
  created_at: string;
}
