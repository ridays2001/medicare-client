import React, { useEffect } from 'react';

const Error = () => {
	useEffect(() => {
		document.title = '404 | Medicare';
		return undefined;
	}, []);

	return (
		<div className='box col-11 col-md-6 mx-auto justify-content-center py-5'>
			<h2 id='title' className='text-center'>
				404: Page Not Found
			</h2>

			<h4 className='text-center mt-5'>
				The page you are looking for did not, does not, and will not exist. Please click on the medicare logo
				above to return to the home page.
			</h4>
		</div>
	);
};

export default Error;
