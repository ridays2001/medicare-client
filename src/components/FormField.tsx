import React from 'react';
import { Field, ErrorMessage } from 'formik';

type PropTypes = {
	id: string;
	label: string;
	type: string;
	pre?: { text?: JSX.Element; content?: JSX.Element };
	post?: { text?: JSX.Element; content?: JSX.Element };
	touched: boolean | undefined;
	error: string | undefined;
};

const FormField = ({ id, label, type, pre, post, touched, error }: PropTypes) => (
	<div className='form-group'>
		<label htmlFor={id}>{label}</label>
		{window.matchMedia('screen and (min-width:768px)').matches && (
			<ErrorMessage name={id} component='span' className='text-danger errMsg' />
		)}
		<div className='input-group'>
			{pre && (
				<div className='input-group-prepend'>
					{pre.content ?? (
						<div className={`input-group-text icon${touched ? (error ? ' out-red' : ' out-grn') : ''}`}>
							{pre.text}
						</div>
					)}
				</div>
			)}
			<Field
				name={id}
				type={type}
				className={`form-control l2${touched ? (error ? ' is-invalid' : ' is-valid') : ''}`}
			/>
			{post && (
				<div className='input-group-append'>
					{post.content ?? (
						<div className={`input-group-text icon${touched ? (error ? ' out-red' : ' out-grn') : ''}`}>
							{post.text}
						</div>
					)}
				</div>
			)}
		</div>
		{!window.matchMedia('screen and (min-width:768px)').matches && (
			<ErrorMessage name={id} component='span' className='text-danger errMsg' />
		)}
	</div>
);

export default FormField;
