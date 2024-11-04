import axios from "axios";

export const createSubscription = async (userId: string) => {
  const response = await axios.post(
    `http://localhost:3001/subscriptions/${userId}`,
    { userId: userId, typeSubscription: "MENSUAL" }
  );

  return response.data;
};

export const createRelationUserToCourse = async (
  userId: string,
  courseId: string
) => {
  const response = await axios.post("http://localhost:3001/courses/link-user", {
    userId,
    courseId,
  });
  return response.status;
};

export const fetchSubscriptionTypes = async () => {
  const response = await axios.get(
    `http://localhost:3001/typeSubs/${"MENSUAL"}`
  );
  return response.data;
};
