import { GET_BANNER } from "../api";
import { useFetch } from "../Hooks/useFetch";
import BannerHomeItem from "../types/banner";



export const useBanner = () => {
    const { data, loading, error } = useFetch<BannerHomeItem[]>(GET_BANNER);
    return {
        data, 
        loading, 
        error
    }
}  
