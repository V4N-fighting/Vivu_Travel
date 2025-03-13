
import { GET_TOUR_TYPE } from "../api";
import { useFetch } from "../Hooks/useFetch";

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

