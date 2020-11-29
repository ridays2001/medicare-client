/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, Redirect } from 'react-router-dom';

import { api, Doctor } from '../util/misc';

const Doctors = () => {
	const [cookies] = useCookies();
	const [login, setLogin] = useState(false);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [list, setList] = useState<Array<Doctor>>([]);

	useEffect(() => {
		document.title = 'Doctors | Medicare';

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
				const data = (await fetch(`${api}/etc/doctors`).then((res) => res.json())) as Array<Doctor>;
				setList(data);
			})();
		}
		return undefined;
	}, [login, cookies]);

	return (
		<div className='box col-11 col-md-6 mx-auto justify-content-center py-5'>
			<Link to={{ pathname: '/dashboard' }}>⬅ Dashboard</Link>

			<h2 id='title' className='text-center'>
				Doctors
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
								<th scope='col'>Speciality</th>
								<th scope='col'>Phone Number</th>
								<th scope='col'>Locality</th>
								<th scope='col'>Pin Code</th>
							</tr>
						</thead>
						<tbody>
							{list
								.filter((doc) =>
									[doc.locality, doc.name, doc.speciality, `${doc.pin_code}`].some((e) =>
										e.toLowerCase().includes(search)
									)
								)
								.map((doc) => (
									<tr key={doc.id}>
										<th scope='row'>{doc.id}</th>
										<td>{doc.name}</td>
										<td>{doc.speciality}</td>
										<td>{doc.phone_number}</td>
										<td>{doc.locality}</td>
										<td>{doc.pin_code}</td>
									</tr>
								))}
						</tbody>
					</table>
				</main>
			)}
		</div>
	);
};

export default Doctors;
