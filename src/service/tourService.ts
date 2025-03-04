
import { GET_TOUR } from "../api";
import { useFetch } from "../Hooks/useFetch";
import TourItem from "../types/tour";


export const useTour = () => {
    const { data, loading, error } = useFetch<TourItem[]>(GET_TOUR);
    return {
        data, 
        loading, 
        error
    }
} 

