
import { GET_COUNTRY } from "../api";
import { useFetch } from "../Hooks/useFetch";

type CountryItem = {
    id: string,
    name: string,
    language: string[]
}

export const useCountry = () => {
    const { data, loading, error } = useFetch<CountryItem[]>(GET_COUNTRY);
    return {
        countries: data, 
        isLoading: loading, 
        isError: error
    }
} 

