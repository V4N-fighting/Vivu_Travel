
import { GET_TOUR_TYPE } from "../api";
import { useFetch } from "../Hooks/useFetch";
import TourTypeItemMap from "../types/tourType";

export const useTourTypeFullData = () => {
    const {data, loading, error} = useFetch<TourTypeItemMap[]>(GET_TOUR_TYPE);

    const dataMap: TourTypeItemMap[] | undefined = data?.map((item: any) => {
        return {
          id: String(item.id),
          name: item.name,
          numberOfTrip: item.numberOfTrip ?? item.tour_count ?? 0,
          image: item.image,
        };
    });

    return {
        types: dataMap,
        isLoading: loading,
        isError: error,
    }
}

