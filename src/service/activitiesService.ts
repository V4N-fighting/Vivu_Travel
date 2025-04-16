
import { GET_ACTIVITY } from "../api";
import { useFetch } from "../Hooks/useFetch";
import ActivityItemMap from "../types/activity";
import { useTour } from "./tourService";

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

export const useActivityFullData = () => {
    const {data, loading, error} = useActivities();
    const {data: tours, loading: toursLoading, error: toursError} = useTour({})

    const isLoading = loading || toursLoading;
    const isError = error || toursError;

    const filteredData = data?.map((activity) => {
        const count = tours?.filter((tour) => {
            
            console.log("ID: ",typeof(activity.id) )
            console.log("listID: ", tour.activityIDs)
            return tour.activityIDs.map(String).includes(activity.id)

        }).length ?? 0;
        
            
    
        return {
            ...activity,
            numberOfTrip: count,
        };
    });
    

    const dataMap: ActivityItemMap[] | undefined = filteredData?.map((item) => {
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

