
import { GET_ACTIVITY, GET_TOUR } from "../api";
import { useFetch } from "../Hooks/useFetch";
import ActivityItemMap from "../types/activity";
import { TourItemMap } from "./tourService";

type ActivityItem = {
    id: string,
    name: string
}



export const useActivityFullData = (): {
    activities: ActivityItemMap[];
    isLoading: boolean;
    isError: boolean;
} => {
    const {data, loading, error} = useFetch<ActivityItem[]>(GET_ACTIVITY);
    const {data: tours, loading: toursLoading, error: toursError} = useFetch<TourItemMap[]>(GET_TOUR)

    const isLoading = loading || toursLoading;
    const isError = error || toursError;

    const filteredData = data?.map((activity) => {
        const count = tours?.filter((tour: TourItemMap) => {
            return tour.activityIDs.map(String).includes(activity.id)

        }).length ?? 0;
        
            
    
        return {
            ...activity,
            numberOfTrip: count,
        };
    });
    

    const dataMap: ActivityItemMap[] = filteredData?.map((item) => {
        return {
          id: item.id,
          name: item.name,
          numberOfTrip: item.numberOfTrip ?? 0,
        };
    }) ?? [];

    return {
        activities: dataMap,
        isLoading,
        isError
    }
}

