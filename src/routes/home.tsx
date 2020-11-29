import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { api } from '../util/misc';

const Home = () => {
	const [cookies] = useCookies();
	const [login, setLogin] = useState(false);

	useEffect(() => {
		document.title = 'Home | Medicare';

		(async () => {
			const { status } = await fetch(`${api}/auth/validate-login`, {
				method: 'POST',
				body: JSON.stringify(cookies),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (status === 200) setLogin(true);
		})();

		return undefined;
	}, [cookies]);

	return (
		<div className='box col-11 col-md-6 mx-auto justify-content-center py-5'>
			<h2 id='title' className='text-center'>
				Home
			</h2>

			{!login && (
				<div className='mt-4 nav'>
					<Link to={{ pathname: '/login' }} className='col mx-auto text-center'>
						Login
					</Link>
					<Link to={{ pathname: '/register' }} className='col mx-auto text-center'>
						Register
					</Link>
				</div>
			)}
			{login && (
				<div className='mt-4 nav'>
					<Link to={{ pathname: '/dashboard' }} className='col mx-auto text-center'>
						Dashboard
					</Link>
					<Link to={{ pathname: '/logout' }} className='col mx-auto text-center'>
						Logout
					</Link>
				</div>
			)}

			{/* cSpell: disable */}
			<div id='quotes' className='col-md-8 justify-content-around mx-auto mt-5'>
				<div className='quote'>
					“The art of medicine consists of amusing the patient while nature cures the disease.”
					<div className='d-flex justify-content-end'>― Voltaire</div>
				</div>

				<div className='quote'>
					“Vaccines are the most cost-effective health care interventions there are. A dollar spent on a
					childhood vaccination not only helps save a life, but greatly reduces spending on future
					healthcare.”
					<div className='d-flex justify-content-end'>― Ezekiel Emanuel</div>
				</div>

				<div className='quote'>
					“Like education, healthcare also needs to be given importance.”
					<div className='d-flex justify-content-end'>― Shiv Nadar</div>
				</div>

				<div className='quote'>
					“The goal of real healthcare reform must be high-quality, universal coverage in a cost-effective
					way.”
					<div className='d-flex justify-content-end'>― Bernie Sanders</div>
				</div>

				<div className='quote'>
					“Healthcare is the cornerstone of the socialist state. It is the crown jewel of the welfare state.”
					<div className='d-flex justify-content-end'>― Monica Crowley</div>
				</div>

				<div className='quote'>
					“People have to take control of their own lives. Education is key because it also raises other
					social indicators like healthcare.”
					<div className='d-flex justify-content-end'>― Azem Premji</div>
				</div>
			</div>
			{/* cSpell: enable */}
		</div>
	);
};

export default Home;
