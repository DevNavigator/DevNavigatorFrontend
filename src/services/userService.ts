import axios from "axios";

export const fetchUserData = async (
  userId: string | undefined,
  token: string
) => {
  if (userId && token) {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const response = await axios.get(`${url}/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      return null;
    }
  }
};
