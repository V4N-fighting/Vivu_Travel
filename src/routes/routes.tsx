import config from '../config';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import About from '../pages/About';
import Blog from '../pages/Blog';
import BlogDetail from '../pages/BlogDetail';
import Contact from '../pages/Contact';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Destination from '../pages/Destination';
import Activity from '../pages/Activity';
import Tour from '../pages/Tour';
import Trip from '../pages/Trip';
import Checkout from '../pages/Checkout';
import TourDetail from '../pages/TourDetail';

interface Route {
    path: string;
    component: React.ComponentType<any>;
    layout: string;
}

// Public routes
const publicRoutes: Route[] = [
    { path: config.routes.register, component: Register, layout: '' },
    { path: config.routes.login, component: Login, layout: '' },
    { path: '/', component: Home, layout: 'default' },
    { path: config.routes.home, component: Home, layout: 'default' },
    { path: config.routes.profile, component: Profile, layout: 'default' },
    { path: config.routes.about, component: About, layout: 'default' },
    { path: config.routes.blog, component: Blog, layout: 'default' },
    { path: config.routes.contact, component: Contact, layout: 'default' },
    { path: config.routes.destination, component: Destination, layout: 'default' },
    { path: config.routes.activity, component: Activity, layout: 'default' },
    { path: config.routes.tour, component: Tour, layout: 'default' },
    { path: config.routes.trip, component: Trip, layout: 'default' },
    { path: config.routes.blog_detail, component: BlogDetail, layout: 'default' },
    { path: config.routes.tour_detail, component: TourDetail, layout: 'default' },
    { path: config.routes.check_out, component: Checkout, layout: 'default' },
];

const privateRoutes: Route[] = [];

export { publicRoutes, privateRoutes };
