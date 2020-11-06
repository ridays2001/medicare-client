import React from 'react';
import { UserSuccessIcon } from '../util/icons';

type SuccessMessageProps = {
	show: boolean;
	desc: string | JSX.Element;
};

const SuccessMessage = ({ show, desc }: SuccessMessageProps) => {
	if (!show) return null;
	return (
		<div className='alert alert-success mx-auto my-4' role='alert'>
			<h3 className='alert-heading'>
				<UserSuccessIcon x={2} /> &emsp; Success!
			</h3>
			{typeof desc === 'string' ? <p>{desc}</p> : desc}
		</div>
	);
};

export default SuccessMessage;
