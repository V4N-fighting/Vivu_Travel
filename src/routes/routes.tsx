import config from '../config';

import Home from '../pages/Home';
import Profile from '../pages/Profile';

interface Route {
    path: string;
    component: React.ComponentType;
}

// Public routes
const publicRoutes: Route[] = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
];

const privateRoutes: Route[] = [];

export { publicRoutes, privateRoutes };
