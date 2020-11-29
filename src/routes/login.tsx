import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link, Redirect } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { api } from '../util/misc';
import FormField from '../components/FormField';
import SuccessMessage from '../components/SuccessMessage';
import FailMessage from '../components/FailMessage';
import PasswordField from '../components/PasswordField';
import SubmitButton from '../components/SubmitButton';
import { UserPinIcon } from '../util/icons';

const Login = () => {
	const [done, setDone] = useState(false);
	const [fail, setFail] = useState<string | undefined>(undefined);
	const [pass, setPass] = useState(false);
	const [login, setLogin] = useState(false);
	const [cookies, setCookie] = useCookies();

	useEffect(() => {
		document.title = 'Login | Medicare';

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
				Login
			</h2>
			{login && <Redirect to={{ pathname: '/dashboard' }}></Redirect>}
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

							<div className='d-flex justify-content-end d-md-none'>
								<Link to={{ pathname: '/request-pwd-reset' }}>Forgot password?</Link>
							</div>

							<div className='d-none d-md-flex justify-content-between'>
								<Link to={{ pathname: '/register' }}>New user? Register here</Link>
								<Link to={{ pathname: '/request-pwd-reset' }}>Forgot password? Reset it here</Link>
							</div>

							<SubmitButton disable={isSubmitting} />

							<div className='d-block d-md-none text-center'>
								<br />
								<Link to={{ pathname: '/register' }}>Create new user?</Link>
							</div>
						</Form>
					)}
				</Formik>
			)}
			<SuccessMessage
				show={done && !fail}
				desc={
					<span>
						Logged In Successfully! Please proceed to{' '}
						<Link to={{ pathname: '/dashboard' }}>dashboard.</Link>
					</span>
				}
			/>
			<FailMessage show={done} fail={fail} />
		</div>
	);
};

export default Login;
