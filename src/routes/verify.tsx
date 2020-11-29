import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import qs from 'querystring';

import { api } from '../util/misc';
import FormField from '../components/FormField';
import SubmitButton from '../components/SubmitButton';
import SuccessMessage from '../components/SuccessMessage';
import FailMessage from '../components/FailMessage';

import { KeyIcon, UserPinIcon } from '../util/icons';

type FormValues = {
	username: string;
	code: string;
};

const VerifyMail = () => {
	const [done, setDone] = useState(false);
	const [fail, setFail] = useState<string | undefined>(undefined);

	const { username = '', code = '' } = qs.parse(window.location.search.replace('?', '')) as FormValues;

	const verify = (values: FormValues) =>
		fetch(`${api}/auth/verify`, {
			method: 'POST',
			body: JSON.stringify(values),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(async (res) => ({ code: res.status, text: await res.text() }));

	useEffect(() => {
		if (!username || !code) return undefined;

		(async () => {
			const res = await verify({ username, code });
			if (res.code !== 200) setFail(`[${res.code}] ${res.text}`);
			setDone(true);
		})();

		return undefined;
	}, [username, code]);

	return (
		<div className='box col-md-6 mx-auto justify-content-center'>
			<h2 id='title' className='text-center em'>
				Verify Your Email
			</h2>
			{!done && (
				<Formik
					initialValues={{ username, code }}
					validationSchema={Yup.object({
						username: Yup.string().required('Your username is required!'),
						code: Yup.string().required('The verification code is required!')
					})}
					onSubmit={async (values, { setSubmitting }) => {
						const res = await verify(values);
						if (res.code !== 200) setFail(`[${res.code}] ${res.text}`);
						setDone(true);
						setSubmitting(false);
					}}
				>
					{({ errors, touched, isSubmitting }) => (
						<Form className='justify-content-center' autoComplete='off'>
							<FormField
								id='username'
								label='Username'
								error={errors.username}
								touched={touched.username}
								type='text'
								pre={{ text: <UserPinIcon /> }}
							/>

							<FormField
								id='code'
								label='Code'
								error={errors.code}
								touched={touched.code}
								type='text'
								pre={{ text: <KeyIcon /> }}
							/>

							<SubmitButton disable={isSubmitting} />
						</Form>
					)}
				</Formik>
			)}
			<SuccessMessage
				show={done && !fail}
				desc={
					<span>
						Your account has been verified! Please proceed to <Link to={{ pathname: '/login' }}>Login</Link>
					</span>
				}
			/>
			<FailMessage show={done} fail={fail} />
		</div>
	);
};

export default VerifyMail;
