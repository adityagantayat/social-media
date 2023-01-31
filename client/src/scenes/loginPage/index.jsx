import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import { useEffect } from 'react';

const LoginPage = () => {
	const token = useSelector((state) => state.token);
	const navigate = useNavigate();

	//! if there is an active session then redirect the logged in user to the home page
	useEffect(() => {
		if (token) navigate('/home');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//! only if there is no logged in user then show the form
	const theme = useTheme();
	const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

	return (
		<Box>
			<Box width='100%' backgroundColor={theme.palette.background.alt} p='1rem 6%' textAlign='center'>
				<Typography fontWeight='bold' fontSize='32px' color='primary'>
					Diaries
				</Typography>
			</Box>
			<Box width={isNonMobileScreens ? '50%' : '93%'} p='2rem' m='2rem auto' borderRadius='1.5rem' backgroundColor={theme.palette.background.alt}>
				<Typography fontWeight='500' variant='h5' sx={{ mb: '1.5rem' }}>
					Welcome to Diaries! Please login to continue... :-)
				</Typography>
				<Form />
			</Box>
		</Box>
	);
};

export default LoginPage;
