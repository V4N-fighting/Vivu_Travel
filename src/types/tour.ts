

export default interface TourItem {
    id: string;
    name: string;
    description: string;
    countryID: string;
    duration: string;
    departure_date: string; 
    max_people: string;
    adventure_level: string;
    price: {
      adult: string; 
      child: string;
    };
    type_id: string;
    activityIDs: string[];
    activityNames: string[];
    transportation: string[];
    altitude: string;
    hotel_star: string;
  }