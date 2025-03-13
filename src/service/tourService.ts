
import { GET_TOUR } from "../api";
import { useFetch } from "../Hooks/useFetch";
import TourItem from "../types/tour";
import { useActivities } from "./activitiesService";
import { useCountry } from "./countryService";
import { useTourType } from "./tourTypeService";

interface TourItemMap {
        id: string;
        name: string;
        description: string;
        countryID: string;
        countryName: string;
        duration: string;
        departureDate: string;
        maxPeople: string;
        adventureLevel: string;
        price: {
          adult: string;
          child: string;
        };
        tourTypeID: string;
        tourTypeName: string;
        activityIDs: string[];
        activityNames: string[]
        transportation: string[];
        altitude: string;
        hotelStar: string;
}

export const useTour = (quantity?: number) => {
    const { data, loading, error } = useFetch<TourItem[]>(GET_TOUR);
    const { data: countries, loading: countryLoading, error: countryError } = useCountry();
    const { data: types, loading: typesLoading, error: typesError } = useTourType();
    const { data: activities, loading: activityLoading, error: activityError } = useActivities();

    const isLoading = loading || countryLoading || typesLoading || activityLoading;
    const isError = error || countryError || typesError || activityError;


    // lấy số lượng item mong muốn
    const dataSlice = quantity ? data?.slice(0, quantity) : data;

    const tours = dataSlice?.map((item) => {
      // tìm ra tên các nước từ countryID
      const country = countries?.find((c: { id: string; }) => String(c.id) === String(item.countryID));

      //tìm ra tên loại tour từ typeID
      const type = types?.find((c: { id: string; }) => String(c.id) === String(item.type_id));

      //tìm ra tên các hoạt động từ activityID
      const activityNames = item.activityIDs.map((activityID) => {
        const found = activities?.find((a) => String(a.id) === String(activityID));
        return found ? found.name : 'unknown';
      });

  
      return {
        ...item,
        countryName: country?.name ||  'unknown',
        tourTypeName: type?.name ||  'unknown',
        activityNames: activityNames
      };
    });
    

    const dataMap : TourItemMap[] | undefined = tours?.map((item) => {
        return {
            id: item.id,
            name: item.name,
            description: item.description,
            countryID: item.countryID,
            countryName: item.countryName,
            duration: item.duration,
            departureDate: item.departure_date,
            maxPeople: item.max_people,
            adventureLevel: item.adventure_level,
            price: {
              adult: item.price.adult,
              child: item.price.child
            },
            tourTypeID: item.type_id,
            tourTypeName: item.tourTypeName,
            activityIDs: item.activityIDs || [],
            activityNames: item.activityNames || [],
            transportation: item.transportation,
            altitude: item.altitude,
            hotelStar: item.hotel_star
          };
    });

    return {
        data: dataMap, 
        loading: isLoading, 
        error: isError
    }
} 

