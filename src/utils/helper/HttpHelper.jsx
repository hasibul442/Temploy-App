import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Environment } from "../constants/Environment";

export async function getData(endpoint, params, isAuthorized) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    };
    
    if (isAuthorized) {
      const token = await AsyncStorage.getItem("authToken");
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    
    // Add query params if provided
    if (params && Object.keys(params).length > 0) {
      config.params = params;
    }
    
    const response = await axios.get(Environment.API_URL+endpoint, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
