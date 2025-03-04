
export default interface TourItem {
    id: number;
    name: string;
    description: string;
    location: string;
    duration: string;
    departure_date: string; 
    max_people: number;
    adventure_level: string;
    price: {
      adult: string; 
      child: string;
    };
    tour_type: string;
    activities: string[];
    languages: string[];
    transportation: string[];
    altitude: string;
    hotel_star: number;
    itinerary: Record<string, string>; // Định dạng { "Day X": "Nội dung" }
    map_embed: string; // HTML iframe embed
  }