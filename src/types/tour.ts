export interface ItineraryActivity {
  day: number;
  title: string;
  activities: string[];
}

export default interface TourItem {
    id: any;
    image: string;
    name: string;
    description: string;
    countryID?: string;
    country_id?: number;
    duration: string;
    departure_date?: string[]; 
    departure_dates?: any[];
    maxPeople?: string | number;
    max_people?: string | number;
    adventureLevel?: string;
    adventure_level?: string;
    price?: {
      adult: string; 
      child: string;
    };
    price_adult?: number | string;
    price_child?: number | string;
    type_id?: string;
    tour_type_id?: number;
    activityIDs: any[];
    activityNames?: string[];
    transportation?: string[];
    altitude: string;
    hotelStar?: string | number;
    hotel_star?: string | number;
    itinerary?: ItineraryActivity[];
    itineraries?: any[];
  }