import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';

const App = () => {
	return (
		<main>
			<Switch>
				{routes.map((route) => (
					<Route {...route} />
				))}
			</Switch>
		</main>
	);
};

export default App;
