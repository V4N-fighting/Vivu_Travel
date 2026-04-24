import axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from '../api';

const getAuthConfig = (): AxiosRequestConfig => {
  const token = localStorage.getItem('token');
  return {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  };
};

const ADMIN_URL = `${API_URL}/admin`;

export const adminService = {
  getStats: async () => {
    const res = await axios.get(`${ADMIN_URL}/stats`, getAuthConfig());
    // Map backend response fields to frontend component expectations if necessary
    return {
      toursCount: res.data.tours,
      bookingsCount: res.data.bookings,
      usersCount: res.data.users,
      totalRevenue: res.data.revenue,
      recentBookings: res.data.recentBookings,
    };
  },

  getTours: async () => {
    const res = await axios.get(`${ADMIN_URL}/tours`, getAuthConfig());
    return res.data;
  },
  createTour: async (payload: any) => {
    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      if (key === 'image' && payload[key] instanceof File) {
        formData.append('file', payload[key]);
      } else if (key === 'activity_ids' && Array.isArray(payload[key])) {
        formData.append(key, JSON.stringify(payload[key]));
      } else if (payload[key] !== undefined && payload[key] !== null) {
        formData.append(key, payload[key]);
      }
    });

    const res = await axios.post(`${ADMIN_URL}/tours`, formData, {
      ...getAuthConfig(),
      headers: {
        ...getAuthConfig().headers,
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
  updateTour: async (id: string | number, payload: any) => {
    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      if (key === 'image' && payload[key] instanceof File) {
        formData.append('file', payload[key]);
      } else if (key === 'activity_ids' && Array.isArray(payload[key])) {
        formData.append(key, JSON.stringify(payload[key]));
      } else if (payload[key] !== undefined && payload[key] !== null) {
        formData.append(key, payload[key]);
      }
    });

    const res = await axios.put(`${ADMIN_URL}/tours/${id}`, formData, {
      ...getAuthConfig(),
      headers: {
        ...getAuthConfig().headers,
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
  deleteTour: async (id: string | number) => {
    const res = await axios.delete(`${ADMIN_URL}/tours/${id}`, getAuthConfig());
    return res.data;
  },

  getTourDepartures: async (tourId: string | number) => {
    const res = await axios.get(`${ADMIN_URL}/tours/${tourId}/departures`, getAuthConfig());
    return res.data;
  },
  getTourActivities: async (tourId: string | number) => {
    const res = await axios.get(`${ADMIN_URL}/tours/${tourId}/activities`, getAuthConfig());
    return res.data;
  },
  addTourDeparture: async (tourId: string | number, payload: any) => {
    const res = await axios.post(`${ADMIN_URL}/tours/${tourId}/departures`, payload, getAuthConfig());
    return res.data;
  },
  deleteTourDeparture: async (id: string | number) => {
    const res = await axios.delete(`${ADMIN_URL}/tours/departures/${id}`, getAuthConfig());
    return res.data;
  },

  getTourImages: async (tourId: string | number) => {
    const res = await axios.get(`${ADMIN_URL}/tours/${tourId}/images`, getAuthConfig());
    return res.data;
  },
  addTourImage: async (tourId: string | number, formData: FormData) => {
    const res = await axios.post(`${ADMIN_URL}/tours/${tourId}/images`, formData, {
      ...getAuthConfig(),
      headers: {
        ...getAuthConfig().headers,
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
  deleteTourImage: async (id: string | number) => {
    const res = await axios.delete(`${ADMIN_URL}/tours/images/${id}`, getAuthConfig());
    return res.data;
  },

  // Tour Types
  getTourTypes: async () => {
    const res = await axios.get(`${ADMIN_URL}/tour-types`, getAuthConfig());
    return res.data;
  },
  createTourType: async (payload: any) => {
    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      if (key === 'image' && payload[key] instanceof File) {
        formData.append('file', payload[key]);
      } else if (payload[key] !== undefined && payload[key] !== null) {
        formData.append(key, payload[key]);
      }
    });

    const res = await axios.post(`${ADMIN_URL}/tour-types`, formData, {
      ...getAuthConfig(),
      headers: {
        ...getAuthConfig().headers,
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
  updateTourType: async (id: string | number, payload: any) => {
    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      if (key === 'image' && payload[key] instanceof File) {
        formData.append('file', payload[key]);
      } else if (payload[key] !== undefined && payload[key] !== null) {
        formData.append(key, payload[key]);
      }
    });

    const res = await axios.put(`${ADMIN_URL}/tour-types/${id}`, formData, {
      ...getAuthConfig(),
      headers: {
        ...getAuthConfig().headers,
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
  deleteTourType: async (id: string | number) => {
    const res = await axios.delete(`${ADMIN_URL}/tour-types/${id}`, getAuthConfig());
    return res.data;
  },

  getBookings: async () => {
    const res = await axios.get(`${ADMIN_URL}/bookings`, getAuthConfig());
    return res.data;
  },
  updateBookingStatus: async (id: string | number, payload: any) => {
    const res = await axios.put(`${ADMIN_URL}/bookings/${id}/status`, payload, getAuthConfig());
    return res.data;
  },

  getUsers: async () => {
    const res = await axios.get(`${ADMIN_URL}/users`, getAuthConfig());
    return res.data;
  },
  toggleUserStatus: async (id: string | number, isActive: boolean) => {
    const res = await axios.put(`${ADMIN_URL}/users/${id}/status`, { is_active: isActive }, getAuthConfig());
    return res.data;
  },

  getCoupons: async () => {
    const res = await axios.get(`${ADMIN_URL}/coupons`, getAuthConfig());
    return res.data;
  },
  createCoupon: async (payload: any) => {
    const res = await axios.post(`${ADMIN_URL}/coupons`, payload, getAuthConfig());
    return res.data;
  },
  updateCoupon: async (id: string | number, payload: any) => {
    const res = await axios.put(`${ADMIN_URL}/coupons/${id}`, payload, getAuthConfig());
    return res.data;
  },

  getReviews: async () => {
    const res = await axios.get(`${ADMIN_URL}/reviews`, getAuthConfig());
    return res.data;
  },
  replyReview: async (id: string | number, payload: any) => {
    const res = await axios.put(`${ADMIN_URL}/reviews/${id}/reply`, payload, getAuthConfig());
    return res.data;
  },

  getCountries: async () => {
    const res = await axios.get(`${ADMIN_URL}/countries`, getAuthConfig());
    return res.data;
  },
  createCountry: async (payload: any) => {
    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      if (key === 'image' && payload[key] instanceof File) {
        formData.append('file', payload[key]);
      } else if (payload[key] !== undefined && payload[key] !== null) {
        formData.append(key, payload[key]);
      }
    });

    const res = await axios.post(`${ADMIN_URL}/countries`, formData, {
      ...getAuthConfig(),
      headers: {
        ...getAuthConfig().headers,
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
  updateCountry: async (id: string | number, payload: any) => {
    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      if (key === 'image' && payload[key] instanceof File) {
        formData.append('file', payload[key]);
      } else if (payload[key] !== undefined && payload[key] !== null) {
        formData.append(key, payload[key]);
      }
    });

    const res = await axios.put(`${ADMIN_URL}/countries/${id}`, formData, {
      ...getAuthConfig(),
      headers: {
        ...getAuthConfig().headers,
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
  deleteCountry: async (id: string | number) => {
    const res = await axios.delete(`${ADMIN_URL}/countries/${id}`, getAuthConfig());
    return res.data;
  },

  // Blogs
  getBlogs: async () => {
    const res = await axios.get(`${ADMIN_URL}/blogs`, getAuthConfig());
    return res.data;
  },
  createBlog: async (payload: any) => {
    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      if (key === 'thumbnail' && payload[key] instanceof File) {
        formData.append('file', payload[key]);
      } else if (payload[key] !== undefined && payload[key] !== null) {
        formData.append(key, payload[key]);
      }
    });
    const res = await axios.post(`${ADMIN_URL}/blogs`, formData, {
      ...getAuthConfig(),
      headers: { ...getAuthConfig().headers, 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
  updateBlog: async (id: string | number, payload: any) => {
    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      if (key === 'thumbnail' && payload[key] instanceof File) {
        formData.append('file', payload[key]);
      } else if (payload[key] !== undefined && payload[key] !== null) {
        formData.append(key, payload[key]);
      }
    });
    const res = await axios.put(`${ADMIN_URL}/blogs/${id}`, formData, {
      ...getAuthConfig(),
      headers: { ...getAuthConfig().headers, 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
  deleteBlog: async (id: string | number) => {
    const res = await axios.delete(`${ADMIN_URL}/blogs/${id}`, getAuthConfig());
    return res.data;
  },

  // Banners
  getBanners: async () => {
    const res = await axios.get(`${ADMIN_URL}/banners`, getAuthConfig());
    return res.data;
  },
  createBanner: async (payload: FormData) => {
    const res = await axios.post(`${ADMIN_URL}/banners`, payload, {
      ...getAuthConfig(),
      headers: { 
        ...getAuthConfig().headers, 
        'Content-Type': 'multipart/form-data' 
      },
    });
    return res.data;
  },
  updateBanner: async (id: string | number, payload: FormData) => {
    const res = await axios.put(`${ADMIN_URL}/banners/${id}`, payload, {
      ...getAuthConfig(),
      headers: { 
        ...getAuthConfig().headers, 
        'Content-Type': 'multipart/form-data' 
      },
    });
    return res.data;
  },
  deleteBanner: async (id: string | number) => {
    const res = await axios.delete(`${ADMIN_URL}/banners/${id}`, getAuthConfig());
    return res.data;
  },

  getActivities: async () => {
    const res = await axios.get(`${ADMIN_URL}/activities`, getAuthConfig());
    return res.data;
  },
  createActivity: async (payload: any) => {
    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      if (key === 'icon' && payload[key] instanceof File) {
        formData.append('file', payload[key]);
      } else if (payload[key] !== undefined && payload[key] !== null) {
        formData.append(key, payload[key]);
      }
    });
    const res = await axios.post(`${ADMIN_URL}/activities`, formData, {
      ...getAuthConfig(),
      headers: { ...getAuthConfig().headers, 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
  updateActivity: async (id: string | number, payload: any) => {
    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      if (key === 'icon' && payload[key] instanceof File) {
        formData.append('file', payload[key]);
      } else if (payload[key] !== undefined && payload[key] !== null) {
        formData.append(key, payload[key]);
      }
    });
    const res = await axios.put(`${ADMIN_URL}/activities/${id}`, formData, {
      ...getAuthConfig(),
      headers: { ...getAuthConfig().headers, 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
  deleteActivity: async (id: string | number) => {
    const res = await axios.delete(`${ADMIN_URL}/activities/${id}`, getAuthConfig());
    return res.data;
  },

  getContacts: async () => {
    const res = await axios.get(`${ADMIN_URL}/contacts`, getAuthConfig());
    return res.data;
  },
  markContactAsRead: async (id: string | number, isRead: boolean) => {
    const res = await axios.put(`${ADMIN_URL}/contacts/${id}/read`, { is_read: isRead }, getAuthConfig());
    return res.data;
  },

  deleteContact: async (id: string | number) => {
    const res = await axios.delete(`${ADMIN_URL}/contacts/${id}`, getAuthConfig());
    return res.data;
  },
  replyContact: async (id: string | number, message: string) => {
    const res = await axios.post(`${API_URL}/contacts/${id}/reply`, { message }, getAuthConfig());
    return res.data;
  },

  exportTravelers: async (bookingId: string | number) => {
    const res = await axios.get(`${ADMIN_URL}/export/travelers/${bookingId}`, {
      ...getAuthConfig(),
      responseType: 'blob',
    });
    return res.data;
  },

  // Itineraries
  getTourItineraries: async (tourId: string | number) => {
    const res = await axios.get(`${ADMIN_URL}/tours/${tourId}/itineraries`, getAuthConfig());
    return res.data;
  },
  addTourItinerary: async (tourId: string | number, payload: any) => {
    const res = await axios.post(`${ADMIN_URL}/tours/${tourId}/itineraries`, payload, getAuthConfig());
    return res.data;
  },
  deleteTourItinerary: async (id: string | number) => {
    const res = await axios.delete(`${ADMIN_URL}/tours/itineraries/${id}`, getAuthConfig());
    return res.data;
  },
};
