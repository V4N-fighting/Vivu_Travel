import { GET_COUNTRY } from "../api";
import { useFetch } from "../Hooks/useFetch";
import DestinationItemMap from "../types/destination";

interface CountryWithTrips {
  id: string;
  name: string;
  language: string[];
  numberOfTrip: number;
  image: string;
}

export const useDestination = () => {
  const { data, loading, error } = useFetch<CountryWithTrips[]>(GET_COUNTRY);

  const dataMap: DestinationItemMap[] | undefined = data?.map((item: any) => ({
    id: String(item.id),
    name: item.name,
    language: item.language,
    numberOfTrip: item.numberOfTrip ?? item.tour_count ?? 0,
    image: item.image,
  }));

  return {
    destinations: dataMap,
    isLoading: loading,
    isError: error,
  };
};
