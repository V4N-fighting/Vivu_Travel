import { useMemo } from "react";
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

const removeAccents = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

const parsePrice = (priceStr: string): number => {
  if (!priceStr) return 0;
  const dotCount = (priceStr.match(/\./g) || []).length;
  if (dotCount > 1) {
    return parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
  }
  if (dotCount === 1) {
    const clean = priceStr.replace(/[^0-9.]/g, "");
    return Math.round(parseFloat(clean));
  }
  return parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
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
  activityNames: string[];
  transportation: string[];
  altitude: string;
  hotelStar: string;
  itinerary: ItineraryActivity[];
  departure_dates?: any[];
  language?: any;
}

export const useTour = ({
  id,
  quantity,
  typeIDs,
  destinationIDs,
  durationRange,
  priceRange,
  activityIDs,
  searchText
}: {
  id?: string | null;
  quantity?: number;
  typeIDs?: string[];
  destinationIDs?: string[];
  durationRange?: [number | undefined, number | undefined];
  priceRange?: [number | undefined, number | undefined];
  activityIDs?: string[];
  searchText?: string;
}): { tours: TourItemMap[] | undefined; isLoading: boolean; isError: boolean } => {
  // Nếu có ID, gọi API chi tiết /api/tours/:id
  const { data, loading, error } = useFetch<TourItem[] | TourItem>(id ? `${GET_TOUR}/${id}` : GET_TOUR);
  const { countries, isLoading: countryLoading, isError: countryError } = useCountry();
  const { types, isLoading: typesLoading, isError: typesError } = useTourTypeFullData();
  const { activities, isLoading: activitiesLoading, isError: activitiesError } = useActivityFullData();

  const isLoading = loading || countryLoading || typesLoading || activitiesLoading;
  const isError = error || countryError || typesError || activitiesError;

  // Bọc toàn bộ logic lọc và mapping trong useMemo để tránh vòng lặp render vô hạn.
  // useMemo chỉ tính lại khi một trong các dependencies thực sự thay đổi.
  const dataMap = useMemo((): TourItemMap[] => {
    // Xử lý data trả về: luôn đưa về dạng mảng để .map an toàn
    const rawData = data ? (Array.isArray(data) ? data : [data]) : [];

    const normalizedData = rawData.map((item: any) => {
      // Ưu tiên lấy departure_dates từ item gốc nếu có
      const departureDates = item.departure_dates || item.departure_date || [];
      return {
        ...item,
        image: toImageUrl(item.image),
        tourTypeID: item.type_id || item.tour_type_id,
        departure_dates: departureDates, // Giữ nguyên mảng object để Modal xử lý
        departureDate: Array.isArray(departureDates) ? departureDates.map((d: any) => d.departure_date) : [],
        maxPeople: item.max_people || item.maxPeople,
        adventureLevel: item.adventure_level || item.adventureLevel,
        hotelStar: item.hotel_star || item.hotelStar,
        price: {
          adult: String(item.price_adult || (item.price && item.price.adult) || "0"),
          child: String(item.price_child || (item.price && item.price.child) || "0")
        },
        activityIDs: item.activityIDs || []
      };
    });

    // Lọc theo ID
    const filteredDataID = normalizedData.filter((item) => {
      if (!id) return true;
      return String(item.id) === String(id);
    });

    // Lọc theo destination
    const filteredDataDestination = filteredDataID.filter((item) => {
      if (!destinationIDs || destinationIDs.length === 0) return true;
      const targetIDs = destinationIDs.map((idOrName) => {
        if (countries?.some((c) => String(c.id) === String(idOrName))) {
          return String(idOrName);
        }
        const found = countries?.find((c) =>
          c.name.toLowerCase().trim() === idOrName.toLowerCase().trim()
        );
        return found ? String(found.id) : idOrName;
      });
      return targetIDs.includes(String(item.countryID));
    });

    // Lọc theo activity
    const filteredDataActivity = filteredDataDestination.filter((item) => {
      if (!activityIDs || activityIDs.length === 0) return true;
      return item.activityIDs.some((activityID: any) =>
        activityIDs.includes(String(activityID))
      );
    });

    // Lọc theo type
    const filteredDataType = filteredDataActivity.filter((item) => {
      if (!typeIDs || typeIDs.length === 0) return true;
      return typeIDs.includes(String(item.tourTypeID));
    });

    // Lọc theo giá
    const filteredDataPrice = filteredDataType.filter((item) => {
      if (!priceRange) return true;
      const [min, max] = priceRange;
      const priceNumber = parsePrice(item.price.adult);
      if (isNaN(priceNumber)) return false;
      if (min !== undefined && max !== undefined) {
        return priceNumber >= min && priceNumber <= max;
      } else if (min !== undefined) {
        return priceNumber >= min;
      } else if (max !== undefined) {
        return priceNumber <= max;
      }
      return true;
    });

    // Lọc theo duration
    const filteredDataDuration = filteredDataPrice.filter((item) => {
      if (!durationRange) return true;
      const [min, max] = durationRange;
      const durationNumber = parseInt(item.duration);
      if (isNaN(durationNumber)) return false;
      if (min !== undefined && max !== undefined) {
        return durationNumber >= min && durationNumber <= max;
      } else if (min !== undefined) {
        return durationNumber >= min;
      } else if (max !== undefined) {
        return durationNumber <= max;
      }
      return true;
    });

    // Lọc theo từ khóa tìm kiếm
    const filteredDataSearch = filteredDataDuration.filter((item) => {
      if (!searchText || !searchText.trim()) return true;
      const cleanSearch = removeAccents(searchText.toLowerCase().trim());
      // Chỉ tìm kiếm theo tên tour (name)
      const matchName = item.name
        ? removeAccents(String(item.name).toLowerCase()).includes(cleanSearch)
        : false;
      // Hoặc theo tên điểm đến (country name)
      const country = countries?.find((c) => String(c.id) === String(item.countryID));
      const matchCountry =
        country && country.name
          ? removeAccents(String(country.name).toLowerCase()).includes(cleanSearch)
          : false;
      return matchName || matchCountry;
    });

    // Lấy số lượng item mong muốn
    const dataSlice = quantity ? filteredDataSearch.slice(0, quantity) : filteredDataSearch;

    // Gán tên hiển thị (countryName, tourTypeName, activityNames)
    const tours = dataSlice.map((item) => {
      const country = countries?.find((c: { id: string }) => String(c.id) === String(item.countryID));
      const type = types?.find((c: { id: string }) => String(c.id) === String(item.tourTypeID));
      const activityNames = item.activityIDs.map((activityID: any) => {
        const found = activities?.find((a) => String(a.id) === String(activityID));
        return found ? found.name : "unknown";
      });
      return {
        ...item,
        countryName: country?.name || "unknown",
        tourTypeName: type?.name || "unknown",
        activityNames,
        language: country?.language || "unknown"
      };
    });

    // Map sang TourItemMap
    return tours.map((item: any): TourItemMap => {
      const country = countries?.find((c) => String(c.id) === String(item.countryID));
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
        language: country?.language || "unknown",
        departure_dates: item.departure_dates
      };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, countries, types, activities, id, quantity, typeIDs, destinationIDs, durationRange, priceRange, activityIDs, searchText]);

  return {
    tours: dataMap,
    isLoading,
    isError
  };
};
