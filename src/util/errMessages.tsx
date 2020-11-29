import React from 'react';
import { Link } from 'react-router-dom';

export const err500 = <p>Please try again. If the problem persists, then contact Riday.</p>;

export const err501 = (
	<p>Please make sure to fill all the required fields. If the problem persists, then contact Riday.</p>
);

export const err502 = (
	<p>
		The email that you've used is already registered! Did you mean to{' '}
		<Link to={{ pathname: '/login' }}>login?</Link>
	</p>
);

export const err503 = (
	<p>
		That username is already taken by someone. If that's you, <Link to={{ pathname: '/login' }}>login</Link>{' '}
		instead. Or, choose another one.
	</p>
);

export const err504 = (
	<p>
		That username doesn't exist. Did you make a typo? Or, did you mean to{' '}
		<Link to={{ pathname: '/register' }}>register?</Link>
	</p>
);

export const err505 = (
	<p>
		The password you entered is incorrect. Please try again. Or, you can{' '}
		<Link to={{ pathname: '/reset-password' }}>request a password reset.</Link>
	</p>
);

export const err506 = (
	<p>
		You are already verified. Please continue to <Link to={{ pathname: '/login' }}>login.</Link>
	</p>
);

export const err507 = (
	<p>
		The verification code you entered is incorrect. Please copy paste the code exactly as it appears in your email.
		Or, you can try clicking on the verification link too.
	</p>
);

export const err508 = (
	<p>
		The email that you entered does not match with the one you registered with. Please use the same email address.
	</p>
);

export const err509 = (
	<p>
		The password reset code you provided is incorrect. Please be sure to click the same link that you've been
		emailed.
	</p>
);
