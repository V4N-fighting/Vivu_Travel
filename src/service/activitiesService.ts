
import { GET_ACTIVITY } from "../api";
import { useFetch } from "../Hooks/useFetch";

type ActivityItem = {
    id: string,
    name: string
}

export const useActivities = () => {
    const { data, loading, error } = useFetch<ActivityItem[]>(GET_ACTIVITY);
    return {
        data, 
        loading, 
        error
    }
} 

