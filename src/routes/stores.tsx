/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, Redirect } from 'react-router-dom';

import { api, Store } from '../util/misc';

const Stores = () => {
	const [cookies] = useCookies();
	const [login, setLogin] = useState(false);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [list, setList] = useState<Array<Store>>([]);

	useEffect(() => {
		document.title = 'Stores | Medicare';

		if (!login) {
			(async () => {
				const { status } = await fetch(`${api}/auth/validate-login`, {
					method: 'POST',
					body: JSON.stringify(cookies),
					headers: {
						'Content-Type': 'application/json'
					}
				});
				if (status === 200) setLogin(true);
				setLoading(false);
			})();
		}

		if (!list.length) {
			(async () => {
				const data = (await fetch(`${api}/etc/stores`).then((res) => res.json())) as Array<Store>;
				setList(data);
			})();
		}
		return undefined;
	}, [login, cookies]);

	return (
		<div className='box col-11 col-md-6 mx-auto justify-content-center py-5'>
			<Link to={{ pathname: '/dashboard' }}>⬅ Dashboard</Link>

			<h2 id='title' className='text-center'>
				Medical Stores
			</h2>

			{!loading && !login && <Redirect to={{ pathname: '/login' }}></Redirect>}

			{login && list.length > 0 && (
				<main>
					<input
						type='text'
						onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
						className='form-control'
						placeholder='Search Here...'
					/>
					<table className='table table-hover'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Name</th>
								<th scope='col'>Phone Number</th>
								<th scope='col'>Website</th>
								<th scope='col'>Locality</th>
								<th scope='col'>Pin Code</th>
							</tr>
						</thead>
						<tbody>
							{list
								.filter((store) =>
									[store.locality, store.name, store.website, `${store.pin_code}`].some((e) =>
										e.toLowerCase().includes(search)
									)
								)
								.map((store) => (
									<tr key={store.id}>
										<th scope='row'>{store.id}</th>
										<td>{store.name}</td>
										<td>{store.phone_number}</td>
										<td>{store.website}</td>
										<td>{store.locality}</td>
										<td>{store.pin_code}</td>
									</tr>
								))}
						</tbody>
					</table>
				</main>
			)}
		</div>
	);
};

export default Stores;
