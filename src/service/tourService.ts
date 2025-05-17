
import { GET_TOUR } from "../api";
import { useFetch } from "../Hooks/useFetch";
import TourItem, { ItineraryActivity } from "../types/tour";
import { useActivities } from "./activitiesService";
import { useCountry } from "./countryService";
import { useTourType } from "./tourTypeService";

interface TourItemMap {
  id: string;
  image: string;
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
  itinerary: ItineraryActivity[]
}

export const useTour = ({
  id,
  quantity,
  typeIDs,
  destinationIDs,
  durationRange,
  priceRange,
  activityIDs
}: {
  id?: string | null,
  quantity?: number;
  typeIDs?: string[];
  destinationIDs?: string[];
  durationRange?: [number, number];
  priceRange?: [number, number];
  activityIDs?: string[];
}) => {
  const { data, loading, error } = useFetch<TourItem[]>(GET_TOUR);
  const { data: countries, loading: countryLoading, error: countryError } = useCountry();
  const { data: types, loading: typesLoading, error: typesError } = useTourType();
  const { data: activities, loading: activityLoading, error: activityError } = useActivities();

  const isLoading = loading || countryLoading || typesLoading || activityLoading;
  const isError = error || countryError || typesError || activityError;

  const normalizedData = data?.map(item => ({
    ...item,
    tourTypeID: item.type_id,
    departureDate: item.departure_date,
    maxPeople: item.max_people,
    adventureLevel: item.adventure_level,
    hotelStar: item.hotel_star
  }));

  // Lọc theo ID
  const filteredDataID = normalizedData?.filter((item) => {
    if (!id ) return true;
    const hasID = id === item.id;

    return hasID;
  });

  // Lọc theo destination
  const filteredDataDestination = filteredDataID?.filter((item) => {
    if (!destinationIDs || destinationIDs.length === 0) return true;
      const hasDestination = destinationIDs.includes(String(item.countryID))
    return hasDestination;
  });

  // Lọc theo activity
  const filteredDataActivity = filteredDataDestination?.filter((item) => {
    if (!activityIDs || activityIDs.length === 0) return true;
    const hasActivity = item.activityIDs.some((activityID) =>
      activityIDs.includes(String(activityID))
    );

    return hasActivity;
  });

 // Lọc theo type
  const filteredDataType = filteredDataActivity?.filter((item) => {
    if (!typeIDs || typeIDs.length === 0) return true;
      const hasType = typeIDs.includes(String(item.tourTypeID))
    return hasType;
  });

  // Lọc theo giá
  const filteredDataPrice = filteredDataType?.filter((item) => {
    if (!priceRange) return true; 
    const [min, max] = priceRange;

    
    const priceNumber = parseInt(item.price.adult.replace(/[^0-9]/g, ""), 10);

    if (isNaN(priceNumber)) return false; 

    return priceNumber >= min && priceNumber <= max;
  });

  // Lọc theo duration
  const filteredDataDuration = filteredDataPrice?.filter((item) => {
    if (!durationRange) return true; 
    const [min, max] = durationRange;

    
    const durationNumber = parseInt(item.duration);

    if (isNaN(durationNumber)) return false; 

    return durationNumber >= min && durationNumber <= max;
  });

  

  // lấy số lượng item mong muốn
  const dataSlice = quantity ? filteredDataDuration?.slice(0, quantity) : filteredDataDuration;

  const tours = dataSlice?.map((item) => {
    const country = countries?.find((c: { id: string }) => String(c.id) === String(item.countryID));
    const type = types?.find((c: { id: string }) => String(c.id) === String(item.tourTypeID));
    const activityNames = item.activityIDs.map((activityID) => {
      const found = activities?.find((a) => String(a.id) === String(activityID));
      return found ? found.name : 'unknown';
    });

    return {
      ...item,
      countryName: country?.name || 'unknown',
      tourTypeName: type?.name || 'unknown',
      activityNames: activityNames,
      language: country?.language || 'unknown'
    };
  });

  const dataMap: TourItemMap[] | undefined = tours?.map((item) => {
    return {
      id: item.id,
      image: item.image,
      name: item.name,
      description: item.description,
      countryID: item.countryID,
      countryName: item.countryName,
      duration: item.duration,
      departureDate: item.departureDate,
      maxPeople: item.maxPeople,
      adventureLevel: item.adventureLevel,
      price: {
        adult: item.price.adult,
        child: item.price.child
      },
      tourTypeID: item.tourTypeID ,
      tourTypeName: item.tourTypeName,
      activityIDs: item.activityIDs || [],
      activityNames: item.activityNames || [],
      transportation: item.transportation,
      altitude: item.altitude,
      hotelStar: item.hotelStar,
      itinerary: item.itinerary,
      language: item.language
    };
  });

  return {
    data: dataMap,
    loading: isLoading,
    error: isError
  };
};