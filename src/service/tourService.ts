
import { GET_IMAGE_URL, GET_TOUR } from "../api";
import { useFetch } from "../Hooks/useFetch";
import TourItem, { ItineraryActivity } from "../types/tour";
import { useActivityFullData } from "./activitiesService";
import { useCountry } from "./countryService";
import { useTourTypeFullData } from "./tourTypeService";

const toImageUrl = (path?: string) => {
  if (!path) return "";
  const trimmed = String(path).trim();
  if (!trimmed) return "";
  if (/^(https?:)?\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("data:")) return trimmed;
  if (trimmed.startsWith("/uploads")) return `http://localhost:3000${trimmed}`;
  const normalized = trimmed.replace(/^\/+/, "");
  const finalPath = normalized.includes('/') ? normalized : `tours/${normalized}`;
  return `${GET_IMAGE_URL}/${finalPath}`;
};

export interface TourItemMap {
  id: string;
  image: string;
  name: string;
  description: string;
  countryID: string;
  countryName: string;
  duration: string;
  departureDate: string[];
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
  id?: string | null;
  quantity?: number;
  typeIDs?: string[];
  destinationIDs?: string[];
  durationRange?: [number, number];
  priceRange?: [number, number];
  activityIDs?: string[];
}): { tours: TourItemMap[] | undefined; isLoading: boolean; isError: boolean } => {
  // Nếu có ID, gọi API chi tiết /api/tours/:id
  const { data, loading, error } = useFetch<TourItem[] | TourItem>(id ? `${GET_TOUR}/${id}` : GET_TOUR);
  const { countries, isLoading: countryLoading, isError: countryError } = useCountry();
  const { types, isLoading: typesLoading, isError: typesError } = useTourTypeFullData();
  const { activities, isLoading: activitiesLoading, isError: activitiesError } = useActivityFullData();

  const isLoading = loading || countryLoading || typesLoading || activitiesLoading;
  const isError = error || countryError || typesError || activitiesError;

  // Xử lý data trả về: luôn đưa về dạng mảng để .map an toàn
  const rawData = data ? (Array.isArray(data) ? data : [data]) : [];

  const normalizedData = rawData.map(item => ({
    ...item,
    image: toImageUrl(item.image),
    tourTypeID: item.type_id || item.tour_type_id,
    departureDate: item.departure_dates?.map((d: any) => d.departure_date) || item.departure_date || [],
    maxPeople: item.max_people || item.maxPeople,
    adventureLevel: item.adventure_level || item.adventureLevel,
    hotelStar: item.hotel_star || item.hotelStar,
    price: {
        adult: String(item.price_adult || (item.price && item.price.adult) || "0"),
        child: String(item.price_child || (item.price && item.price.child) || "0")
    },
    activityIDs: item.activityIDs || []
  }));

  // Lọc theo ID
  const filteredDataID = normalizedData?.filter((item) => {
    if (!id ) return true;
    return String(item.id) === String(id);
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

  const dataMap: TourItemMap[] = (tours?? []).map((item: any) => {
    const country = countries?.find(c => String(c.id) === String(item.countryID));
    return {
      id: String(item.id || ""),
      image: item.image,
      name: item.name,
      description: item.description,
      countryID: String(item.countryID || ""),
      countryName: country?.name || "",
      duration: item.duration,
      departureDate: item.departureDate,
      maxPeople: String(item.maxPeople || ""),
      adventureLevel: item.adventureLevel,
      price: {
        adult: String(item.price.adult),
        child: String(item.price.child)
      },
      tourTypeID: String(item.tourTypeID || ""),
      tourTypeName: item.tourTypeName,
      activityIDs: item.activityIDs || [],
      activityNames: item.activityNames || [],
      transportation: item.transportation,
      altitude: item.altitude,
      hotelStar: String(item.hotelStar || ""),
      itinerary: item.itinerary || item.itineraries || [],
      language: country?.language || 'unknown'
    };
  });

  return {
    tours: dataMap,
    isLoading: isLoading,
    isError: isError
  };
};