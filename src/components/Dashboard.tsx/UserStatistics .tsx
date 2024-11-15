// src/components/UserStatistics.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "@/contexts/authContext";

interface IAchievements {
  id: string;
  title: string;
  date: Date;
}

const UserStatistics = () => {
  const { user, userExternal } = useContext(AuthContext);
  const [points, setPoints] = useState(0);
  const [achievements, setAchievements] = useState<IAchievements[]>([]);

  const token = user?.token || userExternal?.token;
  const userId = user?.user?.id || userExternal?.user?.id;
  useEffect(() => {
    const fetchUserStatistics = async () => {
      if (!userId) return;
      const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      // const url = `http://localhost:3001/statistics/${userId}`;
      try {
        const response = await axios.get(`${url}/statistics/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Statistics Response", response.data);
        setPoints(response.data.totalPoints);
        // setAchievements(response.data.achievements);
        setAchievements(
          Array.isArray(response.data.achievements)
            ? response.data.achievements
            : []
        );
      } catch (error) {
        console.error("Error fetching user statistics:", error);
      }
    };

    fetchUserStatistics();
  }, [token, userId]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Estadísticas del Usuario</h2>
      <p className="text-lg">Puntos acumulados: {points}</p>
      <h3 className="text-lg font-semibold mt-4">Logros:</h3>
      <ul>
        {achievements.map((achievement, index) => (
          <li key={index} className="text-sm text-gray-600">
            {achievement.title} -{" "}
            {new Date(achievement.date).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserStatistics;
