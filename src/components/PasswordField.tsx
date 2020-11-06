import React from 'react';
import FormField from './FormField';
import { HideIcon, KeyIcon, ShowIcon } from '../util/icons';

type Props = {
	error: string | undefined;
	touched: boolean | undefined;
	pass: boolean;
	setPass: Function;
	id?: string;
	label?: string;
};

const PasswordField = ({ error, touched, pass, setPass, id = 'password', label = 'Password' }: Props) => (
	<FormField
		id={id}
		label={label}
		error={error}
		touched={touched}
		type={pass ? 'text' : 'password'}
		pre={{ text: <KeyIcon /> }}
		post={{
			content: (
				<button
					className={`btn btn-outline-info icon l2 btn-sm${touched ? (error ? ' out-red' : ' out-grn') : ''}`}
					type='button'
					onClick={() => setPass(!pass)}
				>
					{pass ? <HideIcon /> : <ShowIcon />}
				</button>
			)
		}}
	/>
);

export default PasswordField;
