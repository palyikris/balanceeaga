import api from "../api";

export const fetchCategoryRadar = async (): Promise<
  {
    category: string;
    value: number;
    type: string;
  }[]
> => {
  const response = await api.get(`/dashboard/categories-summary`);
  return response.data;
};

export type CategoryRadarData = Awaited<ReturnType<typeof fetchCategoryRadar>>;
