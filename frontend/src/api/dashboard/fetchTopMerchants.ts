import axios from "axios";

export const fetchTopMerchants = async (): Promise<{
  name: string;
  amount: number;
}[]> => {
  const apiBase = import.meta.env.VITE_API_BASE;
  const response = await axios.get(`${apiBase}/dashboard/top-merchants`);
  return response.data;
}


export type TopMerchantsData = Awaited<ReturnType<typeof fetchTopMerchants>>;