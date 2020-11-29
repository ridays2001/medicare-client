import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { api } from '../util/misc';

import FormField from '../components/FormField';
import SuccessMessage from '../components/SuccessMessage';
import FailMessage from '../components/FailMessage';
import PasswordField from '../components/PasswordField';
import SubmitButton from '../components/SubmitButton';
import { AtIcon, UserIcon, UserPinIcon, CalendarIcon } from '../util/icons';

const Register = () => {
	useEffect(() => {
		document.title = 'Register | Medicare';
		return undefined;
	}, []);

	const [done, setDone] = useState(false);
	const [fail, setFail] = useState<string | undefined>(undefined);
	const [pass, setPass] = useState(false);

	return (
		<div className='box col-11 col-md-6 mx-auto justify-content-center py-5'>
			<h2 id='title' className='text-center'>
				Register New User
			</h2>
			{!done && (
				<Formik
					initialValues={{ name: '', username: '', dob: '', email: '', password: '' }}
					validationSchema={Yup.object({
						name: Yup.string()
							.matches(/[a-z]/i, 'You name must have at least one alphabet!')
							.required('Your name is required!'),
						username: Yup.string()
							.min(4, 'Your username must be at least 4 characters long!')
							.required('You need to set a username for your account!'),
						email: Yup.string()
							.email('Please enter a valid email address!')
							.required('Your email is required!'),
						password: Yup.string()
							.min(8, 'Your password must be at least 8 characters long!')
							.matches(/[a-z]/i, 'Your password must have at least one least one alphabet!')
							.matches(/[0-9]/, 'Your password must have at least one number!')
							.required('You must set a password for your account!'),
						dob: Yup.date().required('Your Date of Birth is required!')
					})}
					onSubmit={async (values, { setSubmitting }) => {
						const res = await fetch(`${api}/auth/register`, {
							method: 'POST',
							body: JSON.stringify(values),
							headers: {
								'Content-Type': 'application/json'
							}
						}).then(async (r) => ({ code: r.status, text: await r.text() }));
						if (res.code !== 200) setFail(`[${res.code}] ${res.text}`);
						setDone(true);
						setSubmitting(false);
					}}
				>
					{({ errors, touched, isSubmitting }) => (
						<Form className='justify-content-center' autoComplete='off'>
							<FormField
								id='name'
								label='Name'
								error={errors.name}
								touched={touched.name}
								type='text'
								pre={{ text: <UserIcon /> }}
							/>

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

							<FormField
								id='dob'
								label='Date of Birth'
								error={errors.dob}
								touched={touched.dob}
								type='date'
								pre={{ text: <CalendarIcon /> }}
							/>

							<PasswordField
								error={errors.password}
								touched={touched.password}
								pass={pass}
								setPass={setPass}
							/>

							<Link to={{ pathname: '/login' }}>Already registered? Login here</Link>

							<SubmitButton disable={isSubmitting} />
						</Form>
					)}
				</Formik>
			)}
			<SuccessMessage
				show={done && !fail}
				desc={
					<span>
						Registered successfully! Please check your email for the{' '}
						<Link to={{ pathname: '/verify' }}>verification instructions.</Link>
					</span>
				}
			/>
			<FailMessage show={done} fail={fail} />
		</div>
	);
};

export default Register;
