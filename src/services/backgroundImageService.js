import axios from "axios";
import { getItem, setItem } from "./localStorageService";

const baseUrl = "http://localhost:8000/";

export const getImageFromBing = async () => {
  const storage = getItem("background");
  
  if (storage) {
    const today = new Date();
    const cachedBackground = JSON.parse(storage);
    const cachedEndDate = new Date(
      cachedBackground.endDate.substr(0, 4),
      cachedBackground.endDate.substr(4, 2),
      cachedBackground.endDate.substr(6, 2)
      );

      if (today.getTime() < cachedEndDate.getTime()) {
        return cachedBackground.url;
      }
    }
    
    const endpoint = "bing-image";
    const response = await axios.get(`${baseUrl}${endpoint}`, {
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        },
    });

    setItem("background", JSON.stringify(response.data));

    return await response.data.url;
};
