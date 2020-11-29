import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { api } from '../util/misc';
import FormField from '../components/FormField';
import SuccessMessage from '../components/SuccessMessage';
import FailMessage from '../components/FailMessage';
import PasswordField from '../components/PasswordField';
import SubmitButton from '../components/SubmitButton';
import { UserPinIcon } from '../util/icons';
import { Link } from 'react-router-dom';

const Login = () => {
	useEffect(() => {
		document.title = 'Login | Medicare';
		return undefined;
	}, []);

	const [done, setDone] = useState(false);
	const [fail, setFail] = useState<string | undefined>(undefined);
	const [pass, setPass] = useState(false);
	const [_, setCookie] = useCookies();

	return (
		<div className='box col-11 col-md-6 mx-auto justify-content-center py-5'>
			<h2 id='title' className='text-center'>
				Login
			</h2>
			{!done && (
				<Formik
					initialValues={{ username: '', password: '' }}
					validationSchema={Yup.object({
						username: Yup.string().required('Your username is required!'),
						password: Yup.string().required('Your password is required!')
					})}
					onSubmit={async (values, { setSubmitting }) => {
						const res = await fetch(`${api}/auth/login`, {
							method: 'POST',
							body: JSON.stringify(values),
							headers: {
								'Content-Type': 'application/json'
							}
						}).then(async (r) => ({ code: r.status, text: await r.text() }));
						if (res.code !== 200) setFail(`[${res.code}] ${res.text}`);
						else {
							setCookie('username', values.username, {
								path: '/',
								maxAge: 6048e2,
								sameSite: 'lax'
							});
							setCookie('token', res.text, {
								path: '/',
								maxAge: 6048e2,
								sameSite: 'lax'
							});
						}
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

							<PasswordField
								error={errors.password}
								touched={touched.password}
								pass={pass}
								setPass={setPass}
							/>

							<Link to={{ pathname: '/register' }}>New user? Register here</Link>

							<SubmitButton disable={isSubmitting} />
						</Form>
					)}
				</Formik>
			)}
			<SuccessMessage show={done && !fail} desc='Logged in successfully!' />
			<FailMessage show={done} fail={fail} />
		</div>
	);
};

export default Login;
