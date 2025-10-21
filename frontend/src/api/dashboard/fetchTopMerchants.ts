import api from "../api";

export const fetchTopMerchants = async (): Promise<
  {
    name: string;
    amount: number;
  }[]
> => {
  const response = await api.get(`/dashboard/top-merchants`);
  return response.data;
};

export type TopMerchantsData = Awaited<ReturnType<typeof fetchTopMerchants>>;
