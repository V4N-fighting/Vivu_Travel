
import { GET_TOUR_TYPE, GET_TOUR } from "../api";
import { useFetch } from "../Hooks/useFetch";
import TourTypeItemMap from "../types/tourType";
import { TourItemMap } from "./tourService";

type TourTypeItem = {
    id: string,
    name: string
}



export const useTourTypeFullData = () => {
    const {data, loading, error} = useFetch<TourTypeItem[]>(GET_TOUR_TYPE);
    const {data: tours, loading: toursLoading, error: toursError} = useFetch<TourItemMap[]>(GET_TOUR)
    

    const isLoading = loading || toursLoading;
    const isError = error || toursError;

    const filteredData = data?.map((type: TourTypeItem) => {
        const count = tours?.filter((tour: TourItemMap) => {
            
            return Number(type.id) === Number(tour.tourTypeID)

        }).length ?? 0;
        
    
        return {
            ...type,
            numberOfTrip: count,
        };
    });
    

    const dataMap: TourTypeItemMap[] | undefined = filteredData?.map((item) => {
        return {
          id: item.id,
          name: item.name,
          numberOfTrip: item.numberOfTrip ?? 0,
        };
    });

    return {
        types: dataMap,
        isLoading,
        isError,
    }
}


