
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

export const useTour = (
  quantity?: number,
  durationRange?: [number, number], // Tham số lọc theo khoảng duration (số ngày)
  priceRange?: [number, number]
) => {
  const { data, loading, error } = useFetch<TourItem[]>(GET_TOUR);
  const { data: countries, loading: countryLoading, error: countryError } = useCountry();
  const { data: types, loading: typesLoading, error: typesError } = useTourType();
  const { data: activities, loading: activityLoading, error: activityError } = useActivities();

  const isLoading = loading || countryLoading || typesLoading || activityLoading;
  const isError = error || countryError || typesError || activityError;


  

  // Lọc theo duration
  const filteredDataDuration = data?.filter((item) => {
    if (!durationRange) return true; // không lọc nếu không có tham số
    const [min, max] = durationRange;

    // Parse duration thành số (giả sử duration là '5 days' hoặc '7 ngày')
    const durationNumber = parseInt(item.duration);

    if (isNaN(durationNumber)) return false; // không parse được thì loại bỏ

    return durationNumber >= min && durationNumber <= max;
  });

  // lấy số lượng item mong muốn
  const dataSlice = quantity ? filteredDataDuration?.slice(0, quantity) : filteredDataDuration;

  const tours = dataSlice?.map((item) => {
    const country = countries?.find((c: { id: string }) => String(c.id) === String(item.countryID));
    const type = types?.find((c: { id: string }) => String(c.id) === String(item.type_id));
    const activityNames = item.activityIDs.map((activityID) => {
      const found = activities?.find((a) => String(a.id) === String(activityID));
      return found ? found.name : 'unknown';
    });

    return {
      ...item,
      countryName: country?.name || 'unknown',
      tourTypeName: type?.name || 'unknown',
      activityNames: activityNames
    };
  });

  const dataMap: TourItemMap[] | undefined = tours?.map((item) => {
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
  };
};

