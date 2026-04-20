
import { GET_ACTIVITY } from "../api";
import { useFetch } from "../Hooks/useFetch";
import ActivityItemMap from "../types/activity";

export const useActivityFullData = (): {
    activities: ActivityItemMap[];
    isLoading: boolean;
    isError: boolean;
} => {
    const {data, loading, error} = useFetch<ActivityItemMap[]>(GET_ACTIVITY);

    const dataMap: ActivityItemMap[] = data?.map((item) => {
        return {
          id: String(item.id),
          name: item.name,
          numberOfTrip: item.numberOfTrip ?? 0,
        };
    }) ?? [];

    return {
        activities: dataMap,
        isLoading: loading,
        isError: error
    }
}

