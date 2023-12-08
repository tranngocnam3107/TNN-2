import SecurityCheck from '../Components/Pages/SecurityCheck/SecurityCheck';
import Started from '../Components/Pages/Started/Started';
import Authentication from '../Components/Pages/Authentication/Authentication';
import Success from '../Components/Pages/Success';
export const RoutesList = [{
        path: '/',
        element: < SecurityCheck / >
    },
    {
        path: '/started',
        element: < Started / >
    },
    {
        path: '/authentication',
        element: < Authentication / >
    },
    {
        path: '/success',
        element: < Success / >
    },
];