import Home from "../pages/Home";
import Destination from "../pages/Destination";
import ProfilePage from "../pages/Profile";
import Tours from "../pages/Tour";
import TourDetail from "../pages/TourDetail";
import Checkout from "../pages/Checkout";
import SuccessPage from "../pages/Success";
import Activity from "../pages/Activity";

const config = {
    routes: {
        home: '/home',
        profile: '/profile',
        about: '/about',
        blog: '/blog',
        contact: '/contact',
        register: "/register",
        login: "/login",
        destination: '/destinations',
        activity: '/activity',
        tour: '/tour_type',
        trip: '/trips',
        blog_detail: '/blog_detail',
        tour_detail: '/tour_detail',
        check_out: '/check_out',
        booking: '/booking',
        booking_success: '/booking_success',
    },
};

export const publicRoutes: { path: string, component: React.FC<any> }[] = [
    { path: config.routes.home, component: Home },
    { path: config.routes.destination, component: Destination },
    { path: config.routes.activity, component: Activity },
    { path: config.routes.profile, component: ProfilePage },
    { path: config.routes.tour, component: Tours },
    { path: config.routes.tour_detail, component: TourDetail },
    { path: config.routes.booking, component: Checkout },
    { path: config.routes.booking_success, component: SuccessPage },
]

export default config;