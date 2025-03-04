import { GET_BANNER } from "../api";
import { useFetch } from "../Hooks/useFetch";


interface BannerItem {
    id: number;
    textContent: string;
    firstImage: string;
    secondImage: string;
}


export const getBanner = (country?: string) => {
    const { data, loading, error } = useFetch<BannerItem[]>(GET_BANNER);
    // const dataMap =  data?.filter(item =>  item.country === country)
    return {
        data, 
        loading, 
        error
    }
}  
