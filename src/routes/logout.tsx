import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';

const Logout = () => {
	useEffect(() => {
		document.title = 'Logout | Medicare';
		return undefined;
	}, []);

	const [_ls, _set, rmCookie] = useCookies();
	rmCookie('username');
	rmCookie('token');
	return <Redirect to={{ pathname: '/' }}></Redirect>;
};

export default Logout;
