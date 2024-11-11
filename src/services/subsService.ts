import axios from "axios";

export const createSubscription = async (userId: string) => {
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const response = await axios.post(`${url}/subscriptions/${userId}`, {
    userId: userId,
    typeSubscription: "MENSUAL",
  });

  return response.data;
};

export const createRelationUserToCourse = async (
  userId: string,
  courseId: string
) => {
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const response = await axios.post(`${url}/courses/link-user`, {
    userId,
    courseId,
  });
  return response.status;
};

export const fetchSubscriptionTypes = async () => {
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const response = await axios.get(`${url}/typeSubs/${"MENSUAL"}`);
  return response.data;
};
