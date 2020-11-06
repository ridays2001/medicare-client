import Home from './routes/home';
import Register from './routes/register';
import Login from './routes/login';
import Error from './routes/error';

type RouteType = {
	exact?: boolean;
	path?: string;
	component: () => JSX.Element;
	key: string;
};

const routes: Array<RouteType> = [
	{
		exact: true,
		path: '/',
		component: Home,
		key: 'home'
	},
	{
		path: '/register',
		component: Register,
		key: 'register'
	},
	{
		path: '/login',
		component: Login,
		key: 'login'
	},
	{
		component: Error,
		key: 'error'
	}
];

export default routes;
