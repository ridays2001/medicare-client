/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, Redirect } from 'react-router-dom';

import { api, Meds as MedsType } from '../util/misc';
import { SearchIcon } from '../util/icons';

const Meds = () => {
	const [cookies] = useCookies();
	const [login, setLogin] = useState(false);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [list, setList] = useState<MedsType | undefined>(undefined);

	useEffect(() => {
		document.title = 'Medicines | Medicare';

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

		return undefined;
	}, [login, cookies]);

	return (
		<div className='box col-11 col-md-6 mx-auto justify-content-center py-5'>
			<Link to={{ pathname: '/dashboard' }}>⬅ Dashboard</Link>

			<h2 id='title' className='text-center'>
				Medicines
			</h2>

			{!loading && !login && <Redirect to={{ pathname: '/login' }}></Redirect>}
			<div className='input-group'>
				<input
					type='text'
					onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
					className='form-control'
					placeholder='Search Here...'
				/>
				<div className='input-group-append'>
					<button
						onClick={async () => {
							const data = (await fetch(`${api}/etc/meds?search=${search}`).then((res) =>
								res.json()
							)) as MedsType;
							if (data?.data) setList(data);
						}}
						className='btn btn-primary btn-sm'
					>
						<SearchIcon />
					</button>
				</div>
			</div>

			{login && list && (
				<table className='table table-hover'>
					<thead>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Brand Name</th>
							<th scope='col'>Generic Name</th>
							<th scope='col'>Manufacturer</th>
							<th scope='col'>Route</th>
						</tr>
					</thead>
					<tbody>
						{list.data?.map((meds, index) => (
							<tr key={index}>
								<th scope='row'>{index + 1}</th>
								<td>{meds.brand}</td>
								<td>{meds.generic}</td>
								<td>{meds.manufacturer}</td>
								<td>{meds.route}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}

			{!list && <h5 className='text-center mt-4'>No Meds Found...</h5>}
		</div>
	);
};

export default Meds;
