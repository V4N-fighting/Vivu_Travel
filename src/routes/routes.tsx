import config from '../config';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import About from '../pages/About';
import Blog from '../pages/Blog';
import Contact from '../pages/Contact';

interface Route {
    path: string;
    component: React.ComponentType;
}

// Public routes
const publicRoutes: Route[] = [
    { path: '/', component: Home },
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.about, component: About },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.contact, component: Contact },
];

const privateRoutes: Route[] = [];

export { publicRoutes, privateRoutes };
