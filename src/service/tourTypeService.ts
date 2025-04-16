
import { GET_TOUR_TYPE } from "../api";
import { useFetch } from "../Hooks/useFetch";
import TourTypeItemMap from "../types/tourType";
import { useTour } from "./tourService";

type TourTypeItem = {
    id: string,
    name: string
}



export const useTourType = () => {
    const { data, loading, error } = useFetch<TourTypeItem[]>(GET_TOUR_TYPE);
    return {
        data, 
        loading, 
        error
    }
} 

export const useTourTypeFullData = () => {
    const {data, loading, error} = useTourType();
    const {data: tours, loading: toursLoading, error: toursError} = useTour({})
    

    const isLoading = loading || toursLoading;
    const isError = error || toursError;

    const filteredData = data?.map((type) => {
        const count = tours?.filter((tour) => {
            
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
        data: dataMap,
        isLoading,
        isError,
    }
}


