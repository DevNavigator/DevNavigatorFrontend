import { ICourse } from "@/interfaces/Icourse";

export const getCourse = async (url: string): Promise<ICourse[]> => {
  const response = await fetch(url, { next: { revalidate: 0 } });
  if (!response.ok) {
    throw new Error(`Error fetching courses: ${response.statusText}`);
  }
  const courses: ICourse[] = await response.json();
  return courses;
};

export const getCourseById = async (id: string): Promise<ICourse> => {
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const response = await fetch(`${url}/courses/${id}`, {
    next: { revalidate: 0 },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Course with id ${id} not found: ${response.statusText}`);
  }

  return data as ICourse;
};
