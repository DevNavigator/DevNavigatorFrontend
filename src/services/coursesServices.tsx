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
  const url = `${process.env.API_URL}/courses/${id}`; // Construir la URL aquí
  const response = await fetch(url, { next: { revalidate: 0 } });

  const data = await response.json();
  /* console.log(data); */ // Verificar la respuesta completa del servidor

  if (!response.ok) {
    throw new Error(`Course with id ${id} not found: ${response.statusText}`);
  }

  return data as ICourse;
};
