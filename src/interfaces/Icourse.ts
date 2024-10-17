export interface ICourse {
  id: string;
  title: string;
  type?: string;
  description?: string;
  image_url: string;
  difficulty?: string;
  duration?: number;
  instructor?: string;
  is_free?: boolean;
  created_at?: string;
  updated_at?: string;
  status_courses?: boolean;
}
