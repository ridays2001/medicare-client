import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import qs from 'querystring';

import { api } from '../util/misc';
import PasswordField from '../components/PasswordField';
import SubmitButton from '../components/SubmitButton';
import FailMessage from '../components/FailMessage';
import SuccessMessage from '../components/SuccessMessage';
import FormField from '../components/FormField';

import { AtIcon } from '../util/icons';

type FormValues = {
	username: string | undefined;
	code: string | undefined;
};

const ResetPassword = () => {
	const { username = '', code = '' } = qs.parse(window.location.search.replace('?', '')) as FormValues;

	const [done, setDone] = useState(false);
	const [fail, setFail] = useState<string | undefined>(undefined);
	const [pass, setPass] = useState(false);

	return (
		<div className='box col-md-6 mx-auto justify-content-center'>
			<h2 id='title' className='text-center em'>
				Reset Password
			</h2>
			{!done && (
				<Formik
					initialValues={{ password: '', email: '', username, code }}
					validationSchema={Yup.object({
						email: Yup.string().required('Your email is required for verification!'),
						password: Yup.string()
							.min(8, 'Your password must be at least 8 characters long!')
							.matches(/[a-z]/i, 'Your password must have at least one least one alphabet!')
							.matches(/[0-9]/, 'Your password must have at least one number!')
							.required('You must set a password for your account!')
					})}
					onSubmit={async (values, { setSubmitting }) => {
						const res = await fetch(`${api}/auth/reset-pwd`, {
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
								id='email'
								label='Email'
								error={errors.email}
								touched={touched.email}
								type='email'
								pre={{ text: <AtIcon /> }}
							/>
							<PasswordField
								error={errors.password}
								touched={touched.password}
								pass={pass}
								setPass={setPass}
								id='password'
								label='New Password'
							/>
							<SubmitButton disable={isSubmitting} />
						</Form>
					)}
				</Formik>
			)}
			<SuccessMessage
				show={done && !fail}
				desc={
					<p>
						Your password has been reset successfully! Please head over to{' '}
						<Link to={{ pathname: '/login' }}>login</Link> to continue into your account.
					</p>
				}
			/>
			<FailMessage show={done} fail={fail} />
		</div>
	);
};

export default ResetPassword;
