import axios from "axios";

export const fetchCategoryRadar = async (): Promise<
  {
    category: string;
    value: number;
    type: string;
  }[]
> => {
  const apiBase = import.meta.env.VITE_API_BASE;
  const response = await axios.get(`${apiBase}/dashboard/categories-summary`);
  return response.data;
};


export type CategoryRadarData = Awaited<ReturnType<typeof fetchCategoryRadar>>;