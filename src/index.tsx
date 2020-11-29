import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import App from './App';

import { Logo } from './util/icons';

import './styles/bootstrap.css';
import './styles/index.css';

ReactDOM.render(
	<CookiesProvider>
		<BrowserRouter>
			<React.StrictMode>
				<Link to={{ pathname: '/' }}>
					<Logo />
				</Link>
				<App />
			</React.StrictMode>
		</BrowserRouter>
	</CookiesProvider>,
	document.getElementById('root')
);
