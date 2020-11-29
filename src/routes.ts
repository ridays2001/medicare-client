import Home from './routes/home';
import Register from './routes/register';
import Login from './routes/login';
import Verify from './routes/verify';
import ReqReset from './routes/reqReset';
import ResetPassword from './routes/resetPassword';
import Dashboard from './routes/dashboard';
import Doctors from './routes/doctors';
import Stores from './routes/stores';
import Meds from './routes/meds';
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
		path: '/verify',
		component: Verify,
		key: 'verify'
	},
	{
		path: '/request-pwd-reset',
		component: ReqReset,
		key: 'request-password-reset'
	},
	{
		path: '/reset-pwd',
		component: ResetPassword,
		key: 'reset-password'
	},
	{
		path: '/dashboard',
		component: Dashboard,
		key: 'dashboard'
	},
	{
		path: '/doctors',
		component: Doctors,
		key: 'doctors'
	},
	{
		path: '/stores',
		component: Stores,
		key: 'stores'
	},
	{
		path: '/medicines',
		component: Meds,
		key: 'medicines'
	},
	{
		component: Error,
		key: 'error'
	}
];

export default routes;
