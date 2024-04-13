import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://recommendation-service-4c8015e58c18.herokuapp.com",
});

export const getRecommendations = async (history: Item[]) => {
  const songHistory = history.map((item) => item.title).join(", ");

  const response = await axiosClient.post("/api/recommend/youtube", {
    songHistory,
  });

  return response.data.result as string[];
};
