import Home from './routes/home';
import Register from './routes/register';
import Login from './routes/login';
import Verify from './routes/verify';
import ReqReset from './routes/reqReset';
import ResetPassword from './routes/resetPassword';
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
		component: Error,
		key: 'error'
	}
];

export default routes;
