import React from 'react';

type Props = {
	disable: boolean;
};

const SubmitButton = ({ disable }: Props) => (
	<div className='form-group col-6 col-md-4 mx-auto mt-5'>
		<button type='submit' className={`col btn btn-primary btn-lg ${disable ? 'disabled' : ''}`}>
			<strong>Submit</strong>
		</button>
	</div>
);

export default SubmitButton;
