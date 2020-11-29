import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Redirect, Link } from 'react-router-dom';

import { User, api } from '../util/misc';

const Dashboard = () => {
	const [cookies] = useCookies();
	const [user, setUser] = useState<User | undefined>(undefined);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		(async () => {
			const res = await fetch(`${api}/auth/validate-login`, {
				method: 'POST',
				body: JSON.stringify(cookies),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(async (r) => ({ code: r.status, json: await r.json().catch(() => undefined) }));
			if (res.code === 200) {
				setUser(res.json as User);
			}
			setLoading(false);
		})();
	}, [cookies]);

	return (
		<div className='box col-11 col-md-6 mx-auto justify-content-center py-5'>
			<h2 id='title' className='text-center'>
				Dashboard
			</h2>

			{!loading && !user && <Redirect to={{ pathname: '/login' }}></Redirect>}

			<div className='row'>
				<div className='col-md-6'>
					{user && (
						<ul>
							<li>ID: {user.id}</li>
							<li>Name: {user.name}</li>
							<li>Username: {user.username}</li>
							<li>Email: {user.email}</li>
							<li>
								DOB: {new Date(user.dob).getDate()} - {new Date(user.dob).getMonth() + 1} -{' '}
								{new Date(user.dob).getFullYear()}
							</li>
						</ul>
					)}
				</div>
				<div className='col-md-6'>
					<ul>
						<li>
							<Link to={{ pathname: '/doctors' }}>Doctors</Link>
						</li>
						<li>
							<Link to={{ pathname: '/stores' }}>Medical Stores</Link>
						</li>
						<li>
							<Link to={{ pathname: '/medicines' }}>Medicines</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
