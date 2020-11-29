import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { api } from '../util/misc';

import FormField from '../components/FormField';
import SubmitButton from '../components/SubmitButton';
import FailMessage from '../components/FailMessage';
import SuccessMessage from '../components/SuccessMessage';

import { AtIcon, UserPinIcon } from '../util/icons';

const ReqReset = () => {
	useEffect(() => {
		document.title = 'Request Password Reset | Medicare';
		return undefined;
	}, []);

	const [done, setDone] = useState(false);
	const [fail, setFail] = useState<string | undefined>(undefined);
	return (
		<div className='box col-11 col-md-6 mx-auto justify-content-center py-5'>
			<h2 id='title' className='text-center'>
				Request a Password Reset
			</h2>
			{!done && (
				<Formik
					initialValues={{ username: '', email: '' }}
					validationSchema={Yup.object({
						username: Yup.string().required('Your username is required!'),
						email: Yup.string()
							.email('Please enter a valid email address!')
							.required('Your email is required!')
					})}
					onSubmit={async (values, { setSubmitting }) => {
						const res = await fetch(`${api}/auth/reset-password`, {
							method: 'POST',
							body: JSON.stringify(values),
							headers: {
								'Content-Type': 'application/json'
							}
						}).then(async (r) => ({ code: r.status, text: await r.text() }));
						if (res.code !== 200) setFail(`[${res.code}] ${res.text}`);
						setSubmitting(false);
						setDone(true);
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
								id='email'
								label='Email'
								error={errors.email}
								touched={touched.email}
								type='email'
								pre={{ text: <AtIcon /> }}
							/>

							<SubmitButton disable={isSubmitting} />
						</Form>
					)}
				</Formik>
			)}
			<SuccessMessage
				show={done && !fail}
				desc='A password reset request has been initiated! Check your email for further instructions.'
			/>
			<FailMessage show={done} fail={fail} />
		</div>
	);
};

export default ReqReset;
