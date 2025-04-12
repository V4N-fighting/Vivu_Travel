import TourItem from "../types/tour";
import { useCountry } from "./countryService";
import { useTour } from "./tourService";

type DestinationItemMap = {
  id: string;
  name: string;
  language: string[]; 
  numberOfTrip: number;
};

export const useDestination = () => {
  const { data: country, loading: countryLoading, error: countryError } = useCountry();
  const { data: tours, loading: tourLoading, error: tourError } = useTour({});

  const isLoading = countryLoading || tourLoading;
  const isError = countryError || tourError;

  const filteredData = country?.map((item) => {
    const count = tours?.filter((tour) => {
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
    data: dataMap,
    isLoading,
    isError,
  };
};
