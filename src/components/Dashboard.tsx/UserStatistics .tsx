// src/components/UserStatistics.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "@/contexts/authContext";

const UserStatistics = ({ userId }) => {
  const { user, userExternal } = useContext(AuthContext);
  const [points, setPoints] = useState(0);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchUserStatistics = async () => {
      const url = `http://localhost:3001/statistics/${userId}`;
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${user?.token || userExternal?.token}`,
          },
        });
        console.log("Statistics Response", response.data);
        setPoints(response.data.totalPoints); // Asumiendo que el backend devuelve el campo `totalPoints`
        setAchievements(response.data.achievements); // Asumiendo que el backend devuelve el campo `achievements`
      } catch (error) {
        console.error("Error fetching user statistics:", error);
      }
    };

    fetchUserStatistics();
  }, [userId, user, userExternal]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Estadísticas del Usuario</h2>
      <p className="text-lg">Puntos acumulados: {points}</p>
      <h3 className="text-lg font-semibold mt-4">Logros:</h3>
      <ul>
        {achievements.map((achievement, index) => (
          <li key={index} className="text-sm text-gray-600">
            {achievement.title} - {achievement.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserStatistics;
