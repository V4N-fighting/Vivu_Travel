import { GET_TOUR } from "../api";
import { useFetch } from "../Hooks/useFetch";
import DestinationItemMap from "../types/destination";
import { useCountry } from "./countryService";
import { TourItemMap } from "./tourService";

export const useDestination = () => {
  const { countries, isLoading: countryLoading, isError: countryError } = useCountry();
  const { data: tours, loading: tourLoading, error: tourError } = useFetch<TourItemMap[]>(GET_TOUR)

  const isLoading = countryLoading || tourLoading;
  const isError = countryError || tourError;

  const filteredData = countries?.map((item) => {
    const count = tours?.filter((tour: TourItemMap) => {
        return Number(tour.countryID) === Number(item.id)

    }).length ?? 0;
    

    return {
      ...item,
      numberOfTrip: count,
    };
  });

  const dataMap: DestinationItemMap[] | undefined = filteredData?.map((item) => {
    return {
      id: item.id,
      name: item.name,
      language: item.language, 
      numberOfTrip: item.numberOfTrip ?? 0,
    };
  });

  return {
    destinations: dataMap,
    isLoading,
    isError,
  };
};
