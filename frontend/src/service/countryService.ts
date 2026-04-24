
import { GET_COUNTRY } from "../api";
import { useFetch } from "../Hooks/useFetch";

type CountryItem = {
    id: string,
    name: string,
    language: string[],
    numberOfTrip?: number,
}

export const useCountry = () => {
    const { data, loading, error } = useFetch<CountryItem[]>(GET_COUNTRY);

    const countries = data?.map((item) => ({
        ...item,
        id: String(item.id),
    })) ?? null;

    return {
        countries, 
        isLoading: loading, 
        isError: error
    }
} 

