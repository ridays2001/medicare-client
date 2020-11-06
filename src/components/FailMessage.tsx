import React from 'react';
import { ErrorIcon } from '../util/icons';

type FailMessageProps = {
	show: boolean;
	fail?: string;
};

const FailMessage = ({ show, fail }: FailMessageProps) => {
	if (!show || !fail) return null;
	return (
		<div className='alert alert-danger mx-auto my-4' role='alert'>
			<h3 className='alert-heading'>
				<ErrorIcon x={2} /> &emsp; {fail}
			</h3>
			<p>Please try again later!</p>
		</div>
	);
};

export default FailMessage;
