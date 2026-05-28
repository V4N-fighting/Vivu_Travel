import { GET_BANNER } from "../api";
import { useFetch } from "../Hooks/useFetch";
import BannerHomeItem from "../types/banner";



export const useBanner = () => {
    const { data, loading, error } = useFetch<BannerHomeItem[]>(GET_BANNER);
    return {
        banner: data, 
        isLoading: loading,
        isError: error
    }
}  

export const useBannerByLocation = (location: string) => {
    const { data, loading, error } = useFetch<BannerHomeItem[]>(`${GET_BANNER}?location=${location}`);
    return {
        banner: data,
        isLoading: loading,
        isError: error
    }
}
