
import { GET_ACTIVITY } from "../api";
import { useFetch } from "../Hooks/useFetch";
import { useTour } from "./tourService";

type ActivityItem = {
    id: string,
    name: string
}

interface ActivityItemMap {
    id: string,
    name: string,
    numberOfTrip: number,
}

export const useActivities = () => {
    const { data, loading, error } = useFetch<ActivityItem[]>(GET_ACTIVITY);

    

    return {
        data, 
        loading, 
        error
    }
} 

